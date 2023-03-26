const express = require('express');
const cors = require('cors');
const {conectar} = require('../public/db/db')

class Server{
    constructor(){
        this.app = express();
        this.middlewares()
        this.routes()
        this.conexion()
    }

    middlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use('/user',require('../public/router/users.routes'))
        this.app.use('/auth',require('../public/router/auth.routes'))
    }
    conexion(){
        conectar()
    }
    listen(){
        this.app.listen(process.env.PORT)
    }
}

module.exports = Server