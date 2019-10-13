const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Productcontroller = require(".././controllers/product")

//get all product data from DB

router.get('/', Productcontroller.get_all_product);

// Post a new product into DB
router.post('/', Productcontroller.create_product);

//Get Specific Product by ID From DB
router.get('/:productId', Productcontroller.get_product_by_id);

// Update Existing Product Data In DB
router.patch('/:productId', Productcontroller.update_product);

//Delete Existing Product Data In Db
router.delete('/:productId', Productcontroller.delete_product);


module.exports = router;
