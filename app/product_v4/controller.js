const Product = require('./model');
const fs = require('fs');
const path = require('path');

const index = (req, res) => {
  let { q = '' } = req.query;
  let exec = {};
  if (q.length) {
    exec = {
      ...exec,
      name: { $regex: `${q}`, $options: 'i' },
    };
  }
  Product.find(exec)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const view = (req, res) => {
  const { id } = req.params;
  Product.findById(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.create({ name, price, stock, status })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const update = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    Product.findByIdAndUpdate(id, { $set: { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` } }, { upsert: false })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  } else {
    Product.findByIdAndUpdate(id, { $set: { name, price, stock, status } }, { upsert: false })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

const destroy = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
