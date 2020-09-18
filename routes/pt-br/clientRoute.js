const router = require("express").Router()

router.get("/pt-br", (req, res) => {
    res.render("pt-br/index")
})

module.exports = router