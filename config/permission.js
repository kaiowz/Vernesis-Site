function adminAuth(req, res, next){
    if (req.session.user.type == "Admin" || req.session.user.type == "Master"){
        next()
    }else{
        res.redirect("/")
    }
}

function masterAuth(req, res, next){
    if (req.session.user.type == "Master"){
        next()
    }else{
        res.redirect("/")
    }
}