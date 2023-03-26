const {Schema,model} = require('mongoose');


const Usermodel = new Schema({
    nombre:{
        type:String,
        required:["El nombre es obligatoria"]
    },
    edad:{
        type:Number,
        required:["La edad es obligatoria"]
    },
    ciudadResidencia:{
        type:String
    },
    nombreUsuario:{
        type:String,
        required:["El nombre de usuario es obligatoria"]
    },
    password:{
        type:String,
        required:["La contraseña es obligatoria"]
    },
    rol:{
        type:String,
        required:["el rol es obligatoria"] 
    }
})

module.exports = model('User',Usermodel)