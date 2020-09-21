const slugify = require("slugify")
const database = require("../config/database")
const validator = require("../config/validator")

class CategoryController{
    async create(req, res){
        try{
            var errors = []

            if (typeof req.body.title_pt == undefined || req.body.title_pt == null || !req.body.title_pt){
                errors.push({text: "Nome português de categoria inválido! "})
            }

            if (typeof req.body.title_eng == undefined || req.body.title_eng == null || !req.body.title_eng){
                errors.push({text: "Nome inglês de categoria inválido! "})
            }

            var exist = await validator.category_checkIfExist(req.body.title_pt, req.body.title_eng)

            if (exist.length > 0){
                req.flash("msgError", exist)
                res.redirect("/admin")
            }
    
            if (errors.length > 0){
                req.flash("msgError", errors)
                res.redirect("/admin")
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
                    req.flash("msgSuccess", {text: "Categoria criada com sucesso!"})
                    res.redirect("/admin")
                }).catch((err) =>{
                    req.flash("msgError", {text: "Falha ao criar categoria com sucesso!"})
                    res.redirect("/admin")
                })
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
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
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async delete(req, res){
        try{
            var id = req.body.id
            if (id != undefined){
                database.Category.findByIdAndDelete(id).then(() =>{
                    req.flash("msgSuccess", {text: "Categoria deletada com sucesso!"})
                    res.redirect("/admin")
                })
            }else{
                req.flash("msgError", {text: "Falha ao deletar categoria!"})
                res.redirect("/admin")
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }

    async findByID(id){
        return database.Category.findById(id)
    }

    async getPtCategoryName(slug){
        var category = await database.Category.findOne({slug_pt: slug})
        return category.title_pt
    }

    async getEnCategoryName(slug){
        var category = await database.Category.findOne({slug_en: slug})
        return category.title_en
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
                req.flash("msgError", exist)
                res.redirect("/admin")
            }

            if (errors.length > 0){
                req.flash("msgError", errors)
                res.redirect("/admin")
            }else{
                var slug_pt = slugify(req.body.title_pt)
                slug_pt = slug_pt.toLowerCase()
                var slug_eng = slugify(req.body.title_en)
                slug_eng = slug_eng.toLowerCase()
                var newCategory = {
                    title_pt: req.body.title_pt,
                    title_en: req.body.title_en,
                    slug_pt,
                    slug_eng
                }
                
                await database.Category.findByIdAndUpdate(req.body.id, newCategory).then(() =>{
                    req.flash("msgSuccess", {text: "Categoria atualizada com sucesso!"})
                    res.redirect("/admin")
                }).catch((err) =>{
                    req.flash("msgSuccess", {text: "Falha ao atualizar a categoria!"})
                    res.redirect("/admin")
                })
            }
        }catch(e){
            req.flash("msgError", {text: "Houve um erro interno, tente novamente!"})
            res.redirect("/admin")
        }
    }
}

module.exports = new CategoryController()