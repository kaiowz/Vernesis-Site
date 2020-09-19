const router = require("express").Router()
const Category = require("../../controllers/CategoryController")

router.get("/", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/index", {categories: categories})
})

router.get("/sobre", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/sobre", {categories: categories})
})

router.get("/mundo", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/mundo", {categories: categories})
})

router.get("/uria", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/uria", {categories: categories})
})

router.get("/nidheim", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/nidheim", {categories: categories})
})

router.get("/kaus", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/kaus", {categories: categories})
})

router.get("/noh", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/noh", {categories: categories})
})

router.get("/silverwater", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/silverwater", {categories: categories})
})

router.get("/:category", async (req, res) => {
    categories = await Category.findCategories("pt")
    res.render("pt/blog", {categories: categories})
})

module.exports = router