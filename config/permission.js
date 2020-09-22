function adminAuth(req, res, next){
    if (req.session.user != undefined){
        next()
    }else {
        req.flash("msgError", {text: "Você não tem permissão para acessar essa área!"})
        res.redirect("/pt")
    }
}

module.exports = adminAuth