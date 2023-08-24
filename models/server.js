const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000 
        
        //Definir string rutas
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

        // Conectar a base de datos
        this.conectarDB()

        // Middlewares
        this.midlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    async conectarDB() {
        await dbConnection()
    }

    midlewares() {

        // CORS
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio Publico
        this.app.use(express.static('public'))
    }


    routes (){
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }
}

module.exports = Server