const express = require('express');
const connectDB = require('./config/mongodb');

const app = express();

// Connecting MongoDB
connectDB();

// Define Routes
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/attendence', require('./routes/api/attendence'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/poll', require('./routes/api/poll'));
app.use('/api/student-profile', require('./routes/api/student-profile'));
app.use('/api/students', require('./routes/api/students'));
app.use('/api/syllabus', require('./routes/api/syllabus'));
app.use('/api/teacher', require('./routes/api/teacher'));


const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('Main Route');
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
