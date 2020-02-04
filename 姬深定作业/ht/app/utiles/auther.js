const jwt = require("jsonwebtoken")
module.exports={
     jm : (params) =>{
        return jwt.sign({params},'sdececnk')
    }
}