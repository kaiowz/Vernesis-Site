const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        //default: "Admin"
    }
})

mongoose.model("users", userSchema)