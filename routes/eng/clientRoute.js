const router = require("express").Router() 
const Category = require("../../controllers/CategoryController")
const Article = require("../../controllers/ArticleController")
const User = require("../../controllers/UserController")

router.get("/", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/index", {categories: categories})
})

router.get("/about", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/about", {categories: categories})
})

router.get("/world", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/world", {categories: categories})
})

router.get("/uria", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/uria", {categories: categories})
})

router.get("/nidheim", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/nidheim", {categories: categories})
})

router.get("/kaus", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/kaus", {categories: categories})
})

router.get("/noh", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/noh", {categories: categories})
})

router.get("/silverwater", async (req, res) => {
    var categories = await Category.findCategories("en")
    res.render("eng/silverwater", {categories: categories})
})


router.get("/:category/:num", Article.findEnArticles)

router.get("/:article", Article.getEnArticle)

module.exports = router