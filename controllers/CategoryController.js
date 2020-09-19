const mongoose = require("mongoose")
const slugify = require("slugify")
const database = require("../config/database")

class CategoryController{
    async create(req, res){
        try{
            var errors = []
            if (typeof req.body.name != undefined || req.body.name != null || !req.body.name){
                errors.push({error: "Nome de categoria inválido! "})
            }
    
            if (errors.length > 0){
                res.render("/admin/newcategory", {errors: errors})
                return
            }else{

            }
        }catch(e){
            console.log(e)
        }

    }
}

module.exports = new CategoryController()