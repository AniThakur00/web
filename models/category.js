const mongoose = require("mongoose");


//category schema
const categorySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        unique: true,
        maxlength: 30,
        required: true

    }


},
    {timestamps: true}
);


//export
module.export=mongoose.model("Category", categorySchema)