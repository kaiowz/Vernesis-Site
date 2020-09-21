const database = require("./database")

class Validator{
    async category_checkIfExist(title_pt, title_eng){
        var exist = []
        await database.Category.findOne({title_pt: title_pt}).then((category)=>{
            if (category){
                exist.push({text: "Nome de Categoria PT existe! "})
            }

        })
        await database.Category.findOne({title_eng: title_eng}).then((category)=>{
            if (category){
                exist.push({text: "Nome de Categoria ENG já existe! "})
            }
        })
        return exist
    }

    async input(obj){
        if (obj.title_pt.includes("<script>") || obj.title_en.includes("<script>") || obj.link_img.includes("<script>")){
            return true
        }else{
            return false
        }
    }

    async edit_input(obj){
        if (obj.title.includes("<script>") || obj.lang.includes("<script") || obj.link_img.includes("<script>")){
            return true
        }else{
            return false
        }
    }

    async login_input(obj){
        if (obj.email.includes("<script") || obj.password.includes("<script>")){
            return true
        }else{
            return false
        }
    }
}

module.exports = new Validator()