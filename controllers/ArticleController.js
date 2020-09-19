const slugify = require("slugify")
const database = require("../config/database")
const validator = require("../config/validator")

class ArticleController{
    async create_pt(req, res){
        var slug = slugify(req.body.title)
        slug = slug.toLowerCase()

        var Article = {
            title: req.body.title,
            slug,
            lang: "pt",
            body: req.body.body,
            category_id: req.body.category_id
        }

        console.log(Article)
    }

    async create_en(req, res){
        var slug = slugify(req.body.title)
        slug = slug.toLowerCase()

        var Article = {
            title: req.body.title,
            slug,
            lang: "en",
            body: req.body.body,
            category_id: req.body.category_id
        }

        console.log(Article)
    }
}

module.exports = new ArticleController()