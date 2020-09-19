const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")

router.get("/", async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/index", {categories: categories})
})

router.get("/new-category", async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/newcategory", {categories: categories})
})

router.post("/category", CategoryController.create)

router.get("/categories", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/manage-categories", {categories: categories})
})

router.post("/category/delete", CategoryController.Delete)

module.exports = router