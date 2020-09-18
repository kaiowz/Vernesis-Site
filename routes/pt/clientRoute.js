const router = require("express").Router()

router.get("/pt", (req, res) => {
    res.render("pt/index")
})

router.get("/pt/sobre", (req, res) => {
    res.render("pt/sobre")
})

module.exports = router