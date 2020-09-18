const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("pt/index")
})

router.get("/sobre", (req, res) => {
    res.render("pt/sobre")
})

router.get("/mundo", (req, res) => {
    res.render("pt/mundo")
})

router.get("/uria", (req, res) => {
    res.render("pt/uria")
})

router.get("/nidheim", (req, res) => {
    res.render("pt/nidheim")
})

router.get("/kaus", (req, res) => {
    res.render("pt/kaus")
})

module.exports = router