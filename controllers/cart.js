const Cart = require('.././models/cart');
const mongoose = require("mongoose");


exports.cart_get_all = (req, res, next) => {
    Cart.find()
        .populate('product', 'title price')
        .exec()
        .then(docs => {
            res.status(200).json({
                message: "Your cart",
                User_Cart: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
};


exports.cart_create = (req, res, next) => {
    const cart = new Cart({
        userid: req.body.userid,
        quantity: req.body.quantity,
        product: req.body.productid,
    })
    cart.save()
        .then(docs => {
            res.status(201).json({
                message: "Added to cart",
                User_Cart: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })

};


exports.getcart_by_id = (req, res, next) => {
    Cart.findById(req.params.cartid)
        .exec()
        .then(cart => {
            if (!cart) {
                res.status(404).json({
                    message: "Item Not Found"
                })
            }
            res.status(200).json({
                message: "Item Found",
                User_cart: cart
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.edit_by_id = (req, res, next) => {
    const id = req.params.cartid
    Cart.update({ _id: id }, req.body)
        .populate('product', 'title price productimage')
        .exec()
        .then(() => {
            Cart.findById({ _id: id })
                .then(cart => {
                    res.status(200).json({
                        message: "Item Updated in cart",
                        Updated_Order: cart
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};

exports.delete_by_id = (req, res, next) => {
    Cart.remove(req.params.cartid).exec()
        .then(cart => {
            res.status(200).json({
                message: "item Deleted from Cart",
                Delted: cart
            })
        })
        .catch(err => {
            req.status(500).json({
                error: err
            })
        })
};