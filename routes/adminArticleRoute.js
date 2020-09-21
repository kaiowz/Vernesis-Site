const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")
const ArticleController = require("../controllers/ArticleController.js")
const adminAuth = require("../config/permission")

//NOVO ARTIGO
router.get("/new-article", adminAuth, async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/newarticle", {categories: categories})
})

router.post("/article/new", adminAuth, ArticleController.create)

//LISTAR TODOS ARTIGOS
router.get("/articles", adminAuth, ArticleController.findAllArticles)

//DELETAR ARTIGO
router.post("/article/delete", adminAuth, ArticleController.delete)

//EDITAR ARTIGO
router.get("/article/:id", adminAuth, async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    var article = await ArticleController.findByID(req.params.id)
    res.render("admin/editarticle", {categories: categories, article: article})
})

router.post("/article/update", adminAuth, ArticleController.update)

module.exports = router