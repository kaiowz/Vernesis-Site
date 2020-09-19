const router = require("express").Router()
const CategoryController = require("../controllers/CategoryController.js")

router.get("/", (req, res) => {
    res.render("pt-br/index")
})

router.post("/category", )

module.exports = router