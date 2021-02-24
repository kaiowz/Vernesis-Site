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

    async findPtArticles(req, res){
        try{
            var {num} = req.params
        
            var offset
            if (isNaN(num) || num == 1){
                offset = 0
            }else{
                offset = (parseInt(num) -1) * 9
            }

            await database.Article.find({lang: "pt"}).populate("category_id")
            .sort({_id: -1})
            .then(async (articles)  => {
                var next

                var filterArticles = []
                var showArticles = []

                await articles.map((article, index) => {
                    if (article.category_id.slug_pt == req.params.category){
                        filterArticles.push(article);
                        if (index >= offset && showArticles.length <= 9)
                            showArticles.push(article)
                    }
                })

                if (offset + 9 >= filterArticles.length){
                    next = false
                }else{
                    next = true
                }

                var result = {
                    next: next,
                    articles: showArticles,
                    page: num
                }

                var categories = await CategoryController.findCategories("pt")
                var category = await CategoryController.getPtCategoryName(req.params.category)

                res.render("pt/blog", {categories: categories, result: result, category: category})
            }).catch((err) =>{
                console.log(err)
                req.flash("msgError", {text: "Houve um erro ao carregar os artigos"})
                res.redirect("/pt")
            })

        }catch(e){
            console.log(e)
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/pt")
        }
    }

    async findEnArticles(req, res){
        try{
            var {num} = req.params
        
            var offset
            if (isNaN(num) || num == 1){
                offset = 0
            }else{
                offset = (parseInt(num) - 1) * 9
            }
    
            await database.Article.find({lang: "en"}).populate("category_id")
            .sort({_id: -1})
            .then(async (articles)  => {
                var next

                var filterArticles = []
                var showArticles = []

                await articles.map((article, index) => {
                    if (article.category_id.slug_en == req.params.category){
                        filterArticles.push(article);
                        if (index >= offset && showArticles.length <= 9)
                            showArticles.push(article)
                    }
                })

                if (offset + 9 >= filterArticles.length){
                    next = false
                }else{
                    next = true
                }

                var result = {
                    next: next,
                    articles: showArticles,
                    page: num
                }

                var categories = await CategoryController.findCategories("en")
                var category = await CategoryController.getEnCategoryName(req.params.category)

                res.render("eng/blog", {categories: categories, category: category, result: result})
            }).catch((err) =>{
                req.flash("msgError", {text: "There was an error loading the articles"})
                res.redirect("/en")
            })

        }catch(e){
            req.flash("msgError", {text: "There was an internal error, please try again!"})
            res.redirect("/en")
        }
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

    async getPtArticle(req, res){
        var categories = await CategoryController.findCategories("pt")
        var article = await database.Article.findOne({slug: req.params.article})
        .populate("category_id")
        if (article){
            res.render("pt/article", {article: article, categories: categories})
        }else{
            res.redirect("/pt")
        }
    }

    async getEnArticle(req, res){
        var categories = await CategoryController.findCategories("en")
        var article = await database.Article.findOne({slug: req.params.article})
        .populate("category_id")
        if (article){
            res.render("eng/article", {article: article, categories: categories})
        }else{
            res.redirect("/en")
        }
    }

    async getNewsArticle(lang){
        return await database.Article.find({lang: lang})
        .populate("category_id")
        .sort({_id: -1})
        .limit(3)
    }
}

module.exports = new ArticleController()