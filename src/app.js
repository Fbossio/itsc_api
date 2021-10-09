const express = require('express');
const json = require('express');
const morgan = require('morgan');

// Initialization
const app = express();

// middleware
app.use(morgan("dev"));
app.use(json());

module.exports = app;