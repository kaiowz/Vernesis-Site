const mongoose = require("mongoose")
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    category_id:{
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }
})

mongoose.model("articles", articleSchema)