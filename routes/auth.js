
const express = require("express");
const Router = express()
const {signout , signup, signin, isSignedIn} = require("../controllers/auth")
const { body, validationResult } = require('express-validator');

//signup route with validation
Router.post("/signup" , body("name" , "name should be atleast 3 character").isLength({min: 3}),
                        body("email" , "email is required").isEmail(),
                        body("password" , "password is required").isLength({min: 5}) , signup),


//signin route with validation
Router.post("/signin" , body("email" , "email is required").isEmail(),
                        body("password" , "password is required").isLength({min: 5}) , signin),

//signout route
Router.get("/signout" , signout),

//Protected routes
Router.get("/test" , isSignedIn , (req, res) => {
    res.json(req.auth),
    res.send("A procted route");
}),


//export
module.exports=Router;

