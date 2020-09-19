const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")

router.get("/", async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/index", {categories: categories})
})

//NOVA CATEGORIA
router.get("/new-category", async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/newcategory", {categories: categories})
})

router.post("/category/new", CategoryController.create)

//LISTAR CATEGORIAS
router.get("/categories", async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/manage-categories", {categories: categories})
})

//DELETAR CATEGORIA
router.post("/category/delete", CategoryController.delete)

//EDITAR CATEGORIA
router.get("/category/:id", async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    var category = await CategoryController.findByInd(req.params.id)
    res.render("admin/editcategory", {categories: categories, category: category})
})

router.post("/category/update", CategoryController.update)

module.exports = router