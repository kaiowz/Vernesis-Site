const router = require("express").Router()
const Category = require("../../controllers/CategoryController")
const Article = require("../../controllers/ArticleController")
const User = require("../../controllers/UserController")

router.get("/", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/index", {categories: categories})
})

router.get("/sobre", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/sobre", {categories: categories})
})

router.get("/mundo", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/mundo", {categories: categories})
})

router.get("/uria", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/uria", {categories: categories})
})

router.get("/nidheim", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/nidheim", {categories: categories})
})

router.get("/kaus", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/kaus", {categories: categories})
})

router.get("/noh", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/noh", {categories: categories})
})

router.get("/silverwater", async (req, res) => {
    var categories = await Category.findCategories("pt")
    res.render("pt/silverwater", {categories: categories})
})

router.get("/:category/:num", Article.findPtArticles)

router.get("/:article", Article.getPtArticle)

module.exports = router