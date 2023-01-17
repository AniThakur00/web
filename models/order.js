const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema;

const productCartSchema = new Mongoose.Schema({
    Product: {
        type: ObjectId,
        ref: "Product"
    },
    name: {
        type: String
    },
    count: {
        type: Number
    },
    price: {
        type: Number
    }



});

const ProductCart = new Mongoose.model("ProductCart" , productCartSchema)

const orderSchema = new Mongoose.Schema({
    Product: [productCartSchema],
    transaction_id: {},
    amount: {
        type: Number
    },
    address: {
        type: String
    },
    updated: {
        type: Date
    },
    user: {
        type: ObjectId,
        ref: "User"
    }



},{timestamps: true});

const order = new Mongoose.model("Order" , orderSchema)

module.exports = {order , ProductCart}
