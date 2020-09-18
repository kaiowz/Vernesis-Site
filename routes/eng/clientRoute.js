const router = require("express").Router()

router.get("/eng", (req, res) => {
    res.render("eng/index")
})

router.get("/eng/about", (req, res) => {
    res.render("eng/about")
})

router.get("/eng/world", (req, res) => {
    res.render("eng/world")
})

router.get("/eng/uria", (req, res) => {
    res.render("eng/uria")
})

module.exports = router