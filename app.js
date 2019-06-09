const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
//const bodyParser = require('body-parser');
require('dotenv/config');

// Middleware
app.use(cors());
//app.use(bodyParser.json());
//body parser is built into express now, you just do:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

// Routes
app.get('/', (req, res) => {
  res.send('We are on home');
});

// Connect to DB
mongoose.connect(process.env.DB, { useNewUrlParser: true }, () => {
  console.log('Connected to DB!');
});

// Listening to the server;
app.listen(3000);
