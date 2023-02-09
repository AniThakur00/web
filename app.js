require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//importing router
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")


//DB connection
mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED...")
}).catch(() => {
    console.log("DB NOT CONNECTED...")
});

//Middleware 
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Route
app.use("/api", authRoutes);
app.use("/api", userRoutes);


//PORT
const port = process.env.PORT;

//Server
app.listen(port, () => {
    console.log(`SERVERS IS UP AND RUNNING at ${port}`)
});




