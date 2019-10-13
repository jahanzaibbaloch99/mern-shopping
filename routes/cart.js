const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Cart = require(".././models/cart");
const Cartcontroller = require(".././controllers/cart")
const checkAuth = require("../middleware/check-auth")

router.get('/',  Cartcontroller.cart_get_all);

router.post('/', Cartcontroller.cart_create);


router.get('/:cartid', Cartcontroller.getcart_by_id);

router.patch('/:cartid', Cartcontroller.edit_by_id);

router.delete('/cartid', Cartcontroller.delete_by_id);


module.exports = router;