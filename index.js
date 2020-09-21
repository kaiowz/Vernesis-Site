const app = require("./config/config")
const ptClient = require("./routes/pt/clientRoute")
const engClient = require("./routes/eng/clientRoute")
const adminCategory = require("./routes/adminCategoryRoute")
const adminArticle = require("./routes/adminArticleRoute")
const adminUser = require("./routes/adminUserRoute")

app.get("/", (req, res) => {
   res.redirect("/pt")
})

app.use("/pt", ptClient)
app.use("/en", engClient)
app.use("/admin", adminCategory)
app.use("/admin", adminArticle)
app.use("/admin", adminUser)

port = 3000
app.listen(port, ()=>{
    console.log("RODANDO " + port)
})