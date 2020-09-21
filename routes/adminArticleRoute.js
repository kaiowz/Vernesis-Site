const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")
const ArticleController = require("../controllers/ArticleController.js")

router.get("/new-article", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/newarticle", {categories: categories})
})

router.post("/article/new", ArticleController.create)


module.exports = router