function adminAuth(req, res, next){
    if (req.session != undefined){
        next()
    }else {
        res.redirect("/")
    }
}

module.exports = adminAuth