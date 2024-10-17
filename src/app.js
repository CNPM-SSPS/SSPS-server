const express = require('express');
const passport = require('passport');
const cors = require('cors');
const httpStatus = require('http-status');
const config = require('./config/config');
const { jwtStrategy } = require('./config/passport');
const routes = require('./routes/v1');

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use('/v1', routes);



module.exports = app;