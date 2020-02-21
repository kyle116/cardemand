const
  express = require('express'),
  app = express(),
  dotenv = require('dotenv').config(),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),
  PORT = process.env.PORT || 3001,
  token = process.env.TOKEN,
  mongoUrl = (process.env.MONGO_URL || 'mongodb://localhost/cardemand'),
  reddit = require('./routes/reddit')

// MongoDB Connection
mongoose.connect(mongoUrl, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
}, (err) => {
  console.log(err || 'connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/reddit', reddit);

// Port
app.listen(PORT, () => {
  console.log(`server is litening on port ${PORT}`);
})