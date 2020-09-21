const slugify = require("slugify")
const database = require("../config/database")
const validator = require("../config/validator")

class ArticleController{
    async create(req, res){
        try{
            var isClear = await validator.input(req.body)
            if (isClear){
                req.flash("msgError", "Tipo de entrada de dados não permitido!")
                res.redirect("/admin/article/new")
            }else{
                var ptSlug = slugify(req.body.title_pt)
                ptSlug = ptSlug.toLowerCase()
        
                var ptArticle = {
                    title: req.body.title_pt,
                    slug: ptSlug,
                    lang: "pt",
                    body: req.body.body_pt,
                    category_id: req.body.category_id
                }
        
                var enSlug = slugify(req.body.title_en)
                enSlug = enSlug.toLowerCase()
        
                var enArticle = {
                    title: req.body.title_en,
                    slug: enSlug,
                    lang: "en",
                    body: req.body.body_en,
                    category_id: req.body.category_id
                }
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }
}

module.exports = new ArticleController()