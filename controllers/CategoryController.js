const mongoose = require("mongoose")
const slugify = require("slugify")
const database = require("../config/database")

class CategoryController{
    async create(req, res){
        try{
            var errors = []

            if (typeof req.body.title_pt == undefined || req.body.title_pt == null || !req.body.title_pt){
                errors.push({error: "Nome português de categoria inválido! "})
            }

            if (typeof req.body.title_eng == undefined || req.body.title_eng == null || !req.body.title_eng){
                errors.push({error: "Nome inglês de categoria inválido! "})
            }
    
            if (errors.length > 0){
                res.render("admin/newcategory", {errors: errors})
                return
            }else{
                var slug_pt = slugify(req.body.title_pt)
                var slug_eng = slugify(req.body.title_eng)
                var newCategory = {
                    title_pt: req.body.title_pt,
                    title_eng: req.body.title_eng,
                    slug_pt,
                    slug_eng
                }
                
                await database.Category.create(newCategory).then(() =>{
                    res.redirect("/admin")
                    return
                }).catch((err) =>{
                    res.redirect("/admin")
                    return
                })
            }
        }catch(e){
            console.log(e)
        }
    }

    async findCategories(lang){
        var categories = []
        if (lang == "pt"){
            categories = await database.Category.find().select("title_pt slug_pt")
        }else{
            categories = await database.Category.find().select("title_eng slug_eng")
        }
        return categories
    }
}

module.exports = new CategoryController()