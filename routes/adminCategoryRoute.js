const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")
const adminAuth = require("../config/permission")

router.get("/", adminAuth, async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/index", {categories: categories})
})

//NOVA CATEGORIA
router.get("/new-category", adminAuth, async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/newcategory", {categories: categories})
})

router.post("/category/new", adminAuth, CategoryController.create)

//LISTAR CATEGORIAS
router.get("/categories", adminAuth, async (req, res) => {
    var categories = await CategoryController.findCategories()
    res.render("admin/manage-categories", {categories: categories})
})

//DELETAR CATEGORIA
router.post("/category/delete", adminAuth, CategoryController.delete)

//EDITAR CATEGORIA
router.get("/category/:id", adminAuth, async (req, res) => {
    var categories = await CategoryController.findCategories("pt")
    var category = await CategoryController.findByID(req.params.id)
    res.render("admin/editcategory", {categories: categories, category: category})
})

router.post("/category/update", adminAuth, CategoryController.update)

module.exports = router