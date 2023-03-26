const mongoose = require('mongoose')

const conectar = ()=>{
    try{
        mongoose.connect(process.env.CONECT)
    }catch(error){
        console.log("Lo lamento, no se pudo conectar a la base de datos; \n error:",error)
    }
}

module.exports = {
    conectar
}