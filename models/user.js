const { string } = require("i/lib/util");
const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require('uuid');


var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        trim: true
    },

    lastname: {
        type: String,
        maxlength: 30,
        trim: true 
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },

    userinfo: {
        type: String,
        trim: true
    },

    encry_password: {
        type: String,
        required: true
    },

    salt: String,

    role: {
        type: String,
        default: 0
    },

    purchases: {
        type: Array,
        default: []
    },


});

userSchema.virtual("password")
    .set(function(password){
        this._password  = password
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password);
    })
    .get(function(){
        return this._password;
    })

userSchema.methods = {

    authenticate: function(plaintext) {
        return this.securePassword(plaintext) === this.encry_password;
    },

    securePassword: function(plaintext){
        if (!plaintext) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plaintext)
            .digest('hex');
        } catch (err) {
            return "";
        }

    }

};


module.exports = mongoose.model("User" , userSchema)
