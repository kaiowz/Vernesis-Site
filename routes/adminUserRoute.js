const router = require("express").Router()
const UserController = require("../controllers/UserController.js")
const CategoryController = require("../controllers/CategoryController.js")

router.get("/register", async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/signup", {categories: categories})
})

router.post("/register", UserController.create)

router.post("/auth", UserController.login)

router.get("/logout", UserController.logout)

module.exports = router