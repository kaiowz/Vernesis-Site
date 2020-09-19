const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")

router.get("/", (req, res) =>{
    res.render("admin/index")
})

router.get("/new-category", (req, res) => {
    res.render("admin/newcategory")
})

router.post("/category", CategoryController.create)

module.exports = router