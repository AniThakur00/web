const mongoose = require("mongoose");

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

module.export=mongoose.model("Category", categorySchema)