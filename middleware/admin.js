const config = require('config');

module.exports = function (req, res, next) {
  // Get ip address from header
  const ipAddress = req.header('ip-address');

  try {
    const isAdmin = ipAddress == config.get('adminIP');
    if (isAdmin) {
      req.admin = true;
      next();
    } else {
      return res.json({ msg: 'no access' });
    }
  } catch (err) {
    res.status(401).josn({ msg: 'Token is not valid' });
  }
};
