
const express = require("express");
const router = express.Router()
const {signout , signup, signin, isSignedIn} = require("../controllers/auth")
const { body, validationResult } = require('express-validator');

//signup route with validation
router.post("/signup" , body("name" , "name should be atleast 3 character").isLength({min: 3}),
                        body("email" , "email is required").isEmail(),
                        body("password" , "password is required").isLength({min: 5}) , signup),


//signin route with validation
router.post("/signin" , body("email" , "email is required").isEmail(),
                        body("password" , "password is required").isLength({min: 5}) , signin),

//signout route
router.get("/signout" , signout),

//Protected routes
router.get("/test" , isSignedIn , (req, res) => {
    res.json(req.auth),
    res.send("A procted route");
}),


//export
module.exports=router;

