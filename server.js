const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/database');

// load env w/ path to it
dotenv.config({ path: './config/config.env' });

// connect to mongoDB
connectDB();

// express instance & use default json parser
const app = express();
app.use(express.json());

// configure logging
process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

// set port to 8000
const PORT = process.env.PORT || 8000;

// start server with db connection on port 8000
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// so the server doesn't hang on exception errors
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

// http://expressjs.com/en/starter/faq.html#how-do-i-handle-404-responses
app.use(function (req, res, next) {
  res.status(404).json('404 Page not found!');
});
