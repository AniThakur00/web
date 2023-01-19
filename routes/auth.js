
const express = require("express");
const Router = express()
const {signout , signup} = require("../controllers/auth")


Router.post("/signup" , signup),
Router.get("/signout" , signout),

module.exports=Router;

