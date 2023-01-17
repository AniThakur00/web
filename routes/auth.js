
const express = require("express");
const Router = express()
const {signout} = require("../controllers/auth")

Router.get("/signout" , signout),

module.exports=Router;

