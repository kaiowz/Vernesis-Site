const mongoose = require("mongoose")
require("dotenv/config")

//Models
require("../models/CategoryModel")
const Category = mongoose.model("categories")
require("../models/ArticleModel")
const Article = mongoose.model("articles")

mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_PATH,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
    }).then(() => {
        console.log("Conectado ao bdd com sucesso!")
    }).catch((err) => {
        console.log("Houve um erro ao se conectar com o mongodb: " + err)
    })

module.exports = {
    mongoose,
    Category,
    Article
}