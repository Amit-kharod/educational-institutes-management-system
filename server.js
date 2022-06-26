const express = require('express');
const connectDB = require('./config/mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

// Connecting MongoDB
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/attendence', require('./routes/api/attendence'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/poll', require('./routes/api/poll'));
app.use('/api/studentProfile', require('./routes/api/studentProfile'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/syllabus', require('./routes/api/syllabus'));
app.use('/api/teacher', require('./routes/api/teacher'));
app.use('/api/assignment', require('./routes/api/assignment'));
app.use('/api/test', require('./routes/api/test'));
app.use('/api/class', require('./routes/api/class'));
app.use('/api/department', require('./routes/api/department'));
app.use('/api/lecture', require('./routes/api/lecture'));
app.use('/api/programme', require('./routes/api/programme'));
app.use('/api/subject', require('./routes/api/subject'));
app.use('/api/data', require('./routes/api/data'));

// Serve static assets in production

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
