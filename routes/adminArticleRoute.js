const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")
const ArticleController = require("../controllers/ArticleController.js")

router.get("/new-article", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/ennewarticle", {categories: categories})
})

router.get("/novo-article", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/ptnewarticle", {categories: categories})
})

router.post("/article/novo", ArticleController.create_pt)
router.post("/article/new", ArticleController.create_en)


module.exports = router