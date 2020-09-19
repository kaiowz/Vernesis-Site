const app = require("./config/config")
const ptClient = require("./routes/pt/clientRoute")
const engClient = require("./routes/eng/clientRoute")
const admin = require("./routes/adminRoute")

app.get("/", (req, res) => {
   res.redirect("/pt")
})

app.use("/pt", ptClient)
app.use("/eng", engClient)
app.use("/admin", admin)

port = 3000
app.listen(port, ()=>{
    console.log("RODANDO " + port)
})