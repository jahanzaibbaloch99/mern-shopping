const mongoose = require("mongoose");
const Product = require(".././models/product");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
});

const upload = multer({ storage: storage });


exports.get_all_product = (req, res, next) => {
    Product.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
};

exports.create_product = upload.single("productImage"), (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
    });
    product.save()
        .then(result => {
            res.status(201).json({
                message: "Product Created",
                createdProduct: result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

};


exports.get_product_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.update_product = (req, res, next) => {
    const id = req.params.productId
    Product.update({ _id: id }, req.body)
        .exec()
        .then(() => {
            Product.findById({ _id: id })
                .then(result => {
                    res.status(200).json(result)
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
}
exports.delete_product = (req, res, next) => {
    const id = req.params.productId
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
};