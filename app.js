const express = require('express');
const path = require('path');
const productRouterV4 = require('./app/product_v4/routes');
const logger = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v4', productRouterV4);
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: 'failed',
    message: 'Resource ' + req.originalUrl + ' Not Found',
  });
});

module.exports = app;
