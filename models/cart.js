const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create cart schema 

const cartSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userid : { type:mongoose.Schema.Types.ObjectId, ref:"User" ,},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Cart', cartSchema);
