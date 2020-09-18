const router = require("express").Router()

router.get("/eng", (req, res) => {
    res.render("eng/index")
})

module.exports = router