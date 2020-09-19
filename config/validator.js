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
}

module.exports = new Validator()