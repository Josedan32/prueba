const { request, response } = require('express')
const UserModel = require('../models/UsersModel')




const postaunt = async (req = request,res = response)=>{
    const {nombreUsuario,password} = req.body
    let band = false;

    try {
        const UsuarioExite = await UserModel.findOne({nombreUsuario})
        if (!UsuarioExite) {
            return res.json({
                band
            })
        }

        if(UsuarioExite.password == password){
            band= true;
            return res.json({
                band,
                "usuario":UsuarioExite
            })
        }

        return res.json({
            band
        })

    } catch (error) {
        console.log("Error:", error);
        throw new Error({
            Error:500,
            "msg":"Comunicate con el administrador"
        })
    }
    
}

module.exports = {
    postaunt
}
