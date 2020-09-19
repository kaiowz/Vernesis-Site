const app = require("./config/config")

app.get("/", (req, res) => {
   res.redirect("/pt")
})

port = 3000
app.listen(port, ()=>{
    console.log("RODANDO " + port)
})