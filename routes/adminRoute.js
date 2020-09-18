const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("pt-br/index")
})

module.exports = router