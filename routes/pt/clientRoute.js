const router = require("express").Router()

router.get("/pt", (req, res) => {
    res.render("pt/index")
})

router.get("/pt/sobre", (req, res) => {
    res.render("pt/sobre")
})

router.get("/pt/mundo", (req, res) => {
    res.render("pt/mundo")
})

router.get("/pt/uria", (req, res) => {
    res.render("pt/uria")
})

module.exports = router