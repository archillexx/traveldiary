const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
var fs = require('fs');
var morgan = require('morgan');
var path = require('path');
const rateLimit = require('express-rate-limit');

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))



// Basic rate limiters
const authenticatedLimiter = rateLimit({
    windowMs: 1000,
    max: 10,
    message: 'Too many requests, please try again later.',
  });
  const nonAuthenticatedLimiter = rateLimit({
    windowMs: 1000,
    max: 5,
    message: 'Too many requests, please try again later.',
  });
  
  app.use((req, res, next) => {
    if (req.user) {
      authenticatedLimiter(req, res, next); // Apply authenticated rate limit
    } else {
      nonAuthenticatedLimiter(req, res, next); // Apply non-authenticated rate limit
    }
  });

  app.use((req, res, next) => {
    console.log(`Received request for route: ${req.originalUrl}`);
    next()
  });


app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/destinations', require('./src/routes/destinationRoutes'));  
app.use('/api/categories', require('./src/routes/categoryRoutes'));


 connectDB();
// If the file is run directly, start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 
 module.exports = app


