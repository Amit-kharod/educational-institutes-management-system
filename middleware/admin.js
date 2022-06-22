const config = require('config');

module.exports = function (req, res, next) {
  // Get ip address from header
  const ipAddress = req.header('ip-address');
  try {
    const isAdmin = config.get('adminIP').includes(ipAddress);
    if (isAdmin) {
      req.admin = true;
      next();
    } else {
      return res.send(false);
    }
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
