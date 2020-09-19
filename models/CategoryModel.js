const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title_pt:{
        type: String,
        required: true
    },
    title_eng:{
        type: String,
        required: true
    },
    slug_pt:{
        type: String,
        required: true
    },
    slug_eng:{
        type: String,
        required: true
    }
})

mongoose.model("categories", categorySchema)