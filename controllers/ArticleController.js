const slugify = require("slugify")
const database = require("../config/database")
const validator = require("../config/validator")
const CategoryController = require("../controllers/CategoryController.js")

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
                    link_img: req.body.link_img,
                    lang: "pt",
                    body: req.body.body_pt,
                    category_id: req.body.category_id
                }
        
                var enSlug = slugify(req.body.title_en)
                enSlug = enSlug.toLowerCase()
        
                var enArticle = {
                    title: req.body.title_en,
                    slug: enSlug,
                    link_img: req.body.link_img,
                    lang: "en",
                    body: req.body.body_en,
                    category_id: req.body.category_id
                }

                await database.Article.create(ptArticle).then(() =>{
                    req.flash("msgSuccess", {text: "Artigo português salvo com sucesso!"})
                }).catch((err) =>{
                    req.flash("msgError", {text:"Houve uma falha ao salvar o artigo português"})
                })
                await database.Article.create(enArticle).then(() =>{
                    req.flash("msgSuccess", {text: "Artigo inglês salvo com sucesso!"})
                }).catch((err) =>{
                    req.flash("msgError", {text: "Houve uma falha ao salvar o artigo inglês"})
                })

                res.redirect("/admin")
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async findByID(id){
        return database.Article.findById(id)
    }

    async findAllArticles(req, res){
        try{
            var articles = await database.Article.find().populate("category_id").sort({_id: -1})
            var categories = await CategoryController.findCategories()
            res.render("admin/manage-articles.ejs", {articles: articles, categories: categories})
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async findPtArticles(category){
        var articles = await database.Article.find({lang: "pt"}).populate("category_id").sort({_id: -1})
        var filterArticles = []
        articles.forEach(article => {
            if (article.category_id.slug_pt == category){
                filterArticles.push(article)
            }
        })
        return filterArticles
    }

    async findEnArticles(category){
        var articles = await database.Article.find({lang: "en"}).populate("category_id").sort({_id: -1})
        var filterArticles = []
        articles.forEach(article => {
            if (article.category_id.slug_pt == category){
                filterArticles.push(article)
            }
        })
        return filterArticles
    }

    async delete(req, res){
        try{
            var id = req.body.id
            if (id != undefined){
                database.Article.findByIdAndDelete(id).then(() =>{
                    req.flash("msgSuccess", {text: "Artigo deletado com sucesso!"})
                    res.redirect("/admin/articles")
                })
            }else{
                req.flash("msgSuccess", {text: "Falha ao deletar artigo!"})
                res.redirect("/admin/articles")
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin/articles")
        }
    }

    async update(req, res){
        try{
            var isClear = await validator.edit_input(req.body)
            if (isClear){
                req.flash("msgError", "Tipo de entrada de dados não permitido!")
                res.redirect("/admin/article/new")
            }else{
                var slug = slugify(req.body.title)
                slug = slug.toLowerCase()
        
                var article = {
                    title: req.body.title,
                    slug: slug,
                    link_img: req.body.link_img,
                    lang: req.body.lang,
                    body: req.body.body,
                    category_id: req.body.category_id
                }
                
                await database.Article.findByIdAndUpdate(req.body.id, article).then(() =>{
                    req.flash("msgSuccess", {text: "Artigo atualizado com sucesso!"})
                    res.redirect("/admin")
                }).catch((err) =>{
                    req.flash("msgError", {text: "Falha ao atualizar o artigo!"  + err})
                    res.redirect("/admin")
                })
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }
}

module.exports = new ArticleController()