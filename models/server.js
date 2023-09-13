const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT || 3000 
        
        //Definir string rutas
        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
            productos: '/api/productos'
        }

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

        //! Middleware para carga de archivos FileUpload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }


    routes (){
        this.app.use(this.paths.auth, require('../routes/auth.routes'))
        this.app.use(this.paths.buscar, require('../routes/buscar.routes'))
        this.app.use(this.paths.categorias, require('../routes/categorias.routes'))
        this.app.use(this.paths.productos, require('../routes/productos.routes'))
        this.app.use(this.paths.usuarios, require('../routes/usuarios.routes'))
        this.app.use(this.paths.uploads, require('../routes/uploads.routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }
}

module.exports = Server