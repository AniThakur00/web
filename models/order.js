const Mongoose = require("mongoose");
const { ObjectId } = Mongoose.Schema;


//product cart schema
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

//preparing product cart schema for export
const ProductCart = new Mongoose.model("ProductCart" , productCartSchema)


//order schema
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


//preparing order schema for export
const order = new Mongoose.model("Order" , orderSchema)


//exporting product cart and order schema
module.exports = {order , ProductCart}
