const express = require("express")
const bodyParser =  require("body-parser")
const server = express()
const db = require("./database")
const flash = require("connect-flash")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const database = require("./database")
const mongoStore = require ("connect-mongo")(session)

//Body Parser
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

//EJS
server.set("view engine", "ejs")

//Cookie parser, Session & Flash
server.use(cookieParser())
server.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({
        mongooseConnection: database.mongoose.connection
    }),
    cookie: {
        maxAge: 180 * 60 * 1000 //3 horas * hora em minutos * milisegundos
    }
}))
server.use(flash())

server.use((req, res, next) => {
    res.locals.msgSuccess = req.flash("msgSuccess")
    res.locals.msgError = req.flash("msgError")
    res.locals.error = req.flash("error")
    res.locals.session = req.session
    res.locals.lang = null
    next()
})





//Static
server.use(express.static("public"))

module.exports = server