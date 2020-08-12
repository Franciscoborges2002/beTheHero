const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');//Get route.js file

const app = express();

app.use(cors());
app.use(express.json());//Use JSON to comunicate through server and client
app.use(routes);//Get the routes at routes.js file
app.use(errors());

module.exports = app;