const router = require("express").Router() 
const Category = require("../../controllers/CategoryController")
const Article = require("../../controllers/ArticleController")

router.get("/", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/index", {categories: categories})
})

router.get("/about", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/about", {categories: categories})
})

router.get("/world", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/world", {categories: categories})
})

router.get("/uria", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/uria", {categories: categories})
})

router.get("/nidheim", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/nidheim", {categories: categories})
})

router.get("/kaus", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/kaus", {categories: categories})
})

router.get("/noh", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/noh", {categories: categories})
})

router.get("/silverwater", async (req, res) => {
    var categories = await Category.findCategories("eng")
    res.render("eng/silverwater", {categories: categories})
})

router.get("/:category", async (req, res) => {
    var categories = await Category.findCategories("pt")
    var articles = await Article.findEnArticles(req.params.category)
    var category = await Category.getEnCategoryName(req.params.category)
    res.render("en/blog", {categories: categories, articles: articles, category: category})
})

module.exports = router