const express = require('express')
const Product = require('../models/Product')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/products', requireJWT, (req, res) => {
  Product.find().then((products) => {
    res.send(products)
  })
  .catch((error) => {
    res.status(500).send({ error: error.message })
  })
})

router.post('/products/new', requireJWT, (req, res) => {
  Product.create({
    brandName: req.body.brandName,
    name: req.body.name
  }).then((product) => {
    res.send(product)
  })
    .catch((error) => {
      res.status(500).send({ error: error.message })
  })
})

module.exports = router
