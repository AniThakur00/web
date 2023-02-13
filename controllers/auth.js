const { json } = require("body-parser");
const User = require("../models/user")
const { body, validationResult } = require('express-validator');
const { isEmpty } = require("lodash");
const user = require("../models/user");
var Jwt = require('jsonwebtoken');
var { expressjwt: expressjwt } = require("express-jwt");




//controller for singup
exports.signup = (req, res) => {

    //error handling for validation (Throwing error on screen)
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errorParam: errors.array()[0].param,
            errorMsg: errors.array()[0].msg
        });
    }

    //inserting data to database along with callback method
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save in DB"
            });
        }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id
            });

    });


};

exports.signin = (req, res) => {

    //error handling for validation (Throwing error on screen)
    const errors = validationResult(req);

    const {email, password} = req.body

    if (!errors.isEmpty()) {
        return res.status(422).json({
            errorParam: errors.array()[0].param,
            errorMsg: errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "Email does not exist"
            })
        }
        

        if(!user.authenticate(password)){
           return res.status(401).json({
                error: "password does not exist"
            })


        }
        //Creating token
        //const token = expressjwt({_id : user._id, secret: process.env.SECRET, algorithms: ["HS256"] });
        var token = Jwt.sign({ _id : user._id }, secret= process.env.SECRET);
        //put token in cookie
        res.cookie("token", token, {expire: new Date() + 9999});
        //sending response to frontend
        const {_id, name, email, role} = user;
        return res.json({token, user: {_id, name, email, role}});

    });

}

//controller for signout
exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signed out"
    });
};



//Protected route
exports.isSignedIn = expressjwt({
    secret: process.env.SECRET,
    userProperty: "auth",
    algorithms: ["HS256"]
}); 

//Middleware for procted routes
exports.isAuthenticated = (req , res, next) => {
    var checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker){
        res.status(403).json({
            error: "ACCESS DENIED"
        });
    }
    next();
};


exports.isAdmin = (req , res, next) => {
    if (req.profile.role === 0){
        res.status(403).json({
            error: "YOUR ARE NOT ADMIN, ACCESS DENIED"
        });
    }
    next();
};