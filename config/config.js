const express = require("express")
const bodyParser =  require("body-parser")
const server = express()
const ptClient = require("../routes/pt/clientRoute")
const engClient = require("../routes/eng/clientRoute")
const admin = require("../routes/adminRoute")
const db = require("./database")

//Body Parser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//EJS
server.set("view engine", "ejs")

server.use("/pt", ptClient)
server.use("/eng", engClient)
server.use("/admin", admin)

server.use((req, res, next) => {
    /*res.locals.msgSuccess = req.flash("msgSuccess")
    res.locals.msgError = req.flash("msgError")
    res.locals.error = req.flash("error")*/
    res.locals.session = req.session
    res.locals.lang = null
    next()
})

//Static
server.use(express.static("public"))

module.exports = server