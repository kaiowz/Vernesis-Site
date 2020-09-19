const mongoose = require("mongoose")
const slugify = require("slugify")
const database = require("../config/database")
const validator = require("../config/validator")

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

            var exist = await validator.category_checkIfExist(req.body.title_pt, req.body.title_eng)

            if (exist.length > 0){
                res.json(exist)
                return
            }
    
            if (errors.length > 0){
                res.render("admin/newcategory", {errors: errors})
                return
            }else{
                var slug_pt = slugify(req.body.title_pt)
                slug_pt = slug_pt.toLowerCase()
                var slug_eng = slugify(req.body.title_eng)
                slug_eng = slug_eng.toLowerCase()
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
        try{
            var categories = []
            if (lang == "pt"){
                categories = await database.Category.find().select("title_pt slug_pt")
            }else if (lang =="eng"){
                categories = await database.Category.find().select("title_eng slug_eng")
            }else{
                categories = await database.Category.find()
            }
            return categories
        }catch(e){
            console.log(e)
        }
    }

    async delete(req, res){
        try{
            var id = req.body.id
            if (id != undefined){
                database.Category.findByIdAndDelete(id).then(() =>{
                    res.redirect("/admin")
                })
            }else{
                res.redirect("/admin")
            }
        }catch(e){
            console.log(e)
        }
    }

    async findByInd(id){
        try{
            return database.Category.findById(id)
        }catch(e){
            console.log(e)
        }

    }

    async update(req, res){
        try{
            var errors = []

            if (typeof req.body.title_pt == undefined || req.body.title_pt == null || !req.body.title_pt){
                errors.push({error: "Nome português de categoria inválido! "})
            }

            if (typeof req.body.title_eng == undefined || req.body.title_eng == null || !req.body.title_eng){
                errors.push({error: "Nome inglês de categoria inválido! "})
            }

            var exist = await validator.category_checkIfExist(req.body.title_pt, req.body.title_eng)

            if (exist.length > 0){
                res.json(exist)
                return
            }

            if (errors.length > 0){
                res.render("admin/newcategory", {errors: errors})
                return
            }else{
                var slug_pt = slugify(req.body.title_pt)
                slug_pt = slug_pt.toLowerCase()
                var slug_eng = slugify(req.body.title_eng)
                slug_eng = slug_eng.toLowerCase()
                var newCategory = {
                    title_pt: req.body.title_pt,
                    title_eng: req.body.title_eng,
                    slug_pt,
                    slug_eng
                }
                
                await database.Category.findByIdAndUpdate(req.body.id, newCategory).then(() =>{
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

}

module.exports = new CategoryController()