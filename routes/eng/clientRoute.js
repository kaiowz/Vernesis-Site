const router = require("express").Router()

router.get("/eng", (req, res) => {
    res.render("eng/index")
})

router.get("/eng/about", (req, res) => {
    res.render("eng/about")
})

module.exports = router