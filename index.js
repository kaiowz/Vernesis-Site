const app = require("./utils/config")

app.get("/", (req, res) => {
   res.render("selectlang")
})

app.post("/set-lang", (req, res) => {
    res.locals.lang = req.body.lang
    res.redirect(`${res.locals.lang}/`)
 })

port = 3000
app.listen(port, ()=>{
    console.log("RODANDO " + port)
})