const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); // pretty console output
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// security
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// accessing API from another domain
const cors = require('cors');

// route files
const generateRoute = require('./routes/generate');
const websiteRoute = require('./routes/website');
const mailRoute = require('./routes/mails');

// load env vars
dotenv.config();

const app = express();

app.use(express.json()); // we only accept json type bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// set security headers
app.use(helmet()); // adds extra security header items for requests
app.use(xss()); // sanitizes request data
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100,
});
app.use(limiter); // limit requests per IP
app.use(hpp()); // prevent request pollution

app.use(cors());

app.use(fileupload());
app.use(express.static(path.join(__dirname, 'public')));

// mount routers
app.use('/api/create/', generateRoute);
app.use('/api/website/', websiteRoute);
app.use('/api/mail/', mailRoute);

app.use(errorHandler); // ! keep this after mounting the routers

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
