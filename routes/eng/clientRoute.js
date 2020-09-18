const router = require("express").Router()

router.get("/", (req, res) => {
    res.render("eng/index")
})

router.get("/about", (req, res) => {
    res.render("eng/about")
})

router.get("/world", (req, res) => {
    res.render("eng/world")
})

router.get("/uria", (req, res) => {
    res.render("eng/uria")
})

router.get("/nidheim", (req, res) => {
    res.render("eng/nidheim")
})

router.get("/kaus", (req, res) => {
    res.render("eng/kaus")
})

router.get("/noh", (req, res) => {
    res.render("eng/noh")
})

module.exports = router