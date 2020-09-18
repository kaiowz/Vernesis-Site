const router = require("express").Router()

router.get("/pt", (req, res) => {
    res.render("pt/index")
})

module.exports = router