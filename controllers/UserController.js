const bcrypt = require("bcrypt")
const database = require("../config/database")
const validator = require("../config/validator")
const fetch = require("node-fetch")

class UserController{
    async create(req, res){
        try{
            var isClear = await validator.login_input(req.body)

            if (isClear){
                res.redirect("/")
            }else{
                var {email, password} = req.body

                password = await bcrypt.hash(password, 16)
                var newUser = {
                    email,
                    password
                }
                await database.User.create(newUser).then(()=>{
                    req.flash("msgError", {text: "Usuario criado com sucesso!"})
                    res.redirect("/admin")
                }).catch((e)=>{
                    req.flash("msgError", {text: "Falha ao criar usuario"})
                    res.redirect("/admin")
                })
            }
        }catch{
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async login(req, res){
        try{
            const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SERVER_CAPTCHA}&response=${req.body['g-recaptcha-response']}`, {
                method: "POST"
            }).then((res) => res.json())

            if (captchaVerified.success == true){
                database.User.findOne({email: req.body.email}).then(async (user) =>{
                    var match = await bcrypt.compare(req.body.password, user.password)
                    if (match){
                        req.session.user = {
                            email: user.email,
                            type: user.type
                        }
                        res.redirect("/admin")
                    }else{
                        req.flash("msgError", {text: "Senha e/ou login inválido!"})
                        res.redirect("/pt")
                    }
                }).catch((err) =>{
                    req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
                    res.redirect("/pt")
                })
            }else{
                req.flash("msgError", {text: "Falha na verificação"})
                res.redirect("/pt")
            }

        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/pt")
        }
    }

    async logout(req, res){
        try{
            req.session.user = undefined
            res.redirect("/")
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async findAll(req, res){
        return database.User.find()
    }

    async changeType(req, res){
        try{
            if (req.body.option == "Promote"){
                await database.User.findByIdAndUpdate(req.body.id, {type: "Master"}).then(()=>{
                    req.flash("msgSuccess", {text: "Usuário Promovido com sucesso!"})
                    res.redirect("/admin/users")
                }).catch((err) =>{
                    req.flash("msgError", {text: "Houve um erro ao promover o usuário, tente novamente!"})
                    res.redirect("/admin/users")
                })
            }else{
                await database.User.findByIdAndUpdate(req.body.id, {type: "Admin"}).then(()=>{
                    req.flash("msgSuccess", {text: "Usuário rebaixado com sucesso!"})
                    res.redirect("/admin/users")
                }).catch((err) =>{
                    req.flash("msgError", {text: "Houve um erro ao rebaixar o usuário, tente novamente!"})
                    res.redirect("/admin/users")
                })
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }
}

module.exports = new UserController()