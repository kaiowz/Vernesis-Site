const router = require("express").Router()
const UserController = require("../controllers/UserController.js")
const CategoryController = require("../controllers/CategoryController.js")
const adminAuth = require("../config/permission")

router.get("/register", adminAuth, async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    res.render("admin/signup", {categories: categories})
})

router.post("/register", adminAuth, UserController.create)

router.post("/auth", UserController.login)

router.get("/signin", (req, res) => {
    res.render("admin/signin")
})

router.get("/logout", adminAuth, UserController.logout)

router.get("/users", adminAuth, async (req, res) =>{
    var categories = await CategoryController.findCategories("pt")
    var users = await UserController.findAll()
    res.render("admin/manage-users", {categories: categories, users: users})
})

module.exports = router