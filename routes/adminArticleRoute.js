const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")
const ArticleController = require("../controllers/ArticleController.js")

//NOVO ARTIGO
router.get("/new-article", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/newarticle", {categories: categories})
})

router.post("/article/new", ArticleController.create)

//LISTAR TODOS ARTIGOS
router.get("/articles", ArticleController.findAllArticles)

//DELETAR ARTIGO
router.post("/article/delete", ArticleController.delete)

//EDITAR ARTIGO
router.get("/article/:id", async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    var article = await ArticleController.findByID(req.params.id)
    res.render("admin/editarticle", {categories: categories, article: article})
})

router.post("/article/update", ArticleController.update)

module.exports = router