const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;


//product schema
const productSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },

    description: {
        type: String,
        trim: true,
        maxlength: 1500,
        required: true
    },

    price: {
        type: Number,
        trim: true,
        maxlength: 30,
        required: true
    },
    
    category:
    {
        type: ObjectId,
        ref: Category,
        required: true
    },

    stock:
    {
        type: Number,
    },

    sold:
    {
        type: Number,
        default: 0
    },

    photo:
    {
        type: Buffer,
        contentType: String
    }



}, {timestamps: true});


//exporting product schema
module.exports = mongoose.model("Product" , productSchema);