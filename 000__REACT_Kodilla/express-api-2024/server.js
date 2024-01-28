const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db.js');

// import routes
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const testimonialsRoutes = require('./routes/testimonials.routes.js');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', concertsRoutes); // add post routes to server
app.use('/api', seatsRoutes); // add user routes to server
app.use('/api', testimonialsRoutes); // add user routes to server

app.use((req, res) => {
  res.status(404).json('404.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});