const express = require('express')

class Server {

    constructor() {
        this.app = express()
        this.port = 3000 || process.env.PORT

        // Middlewares
        this.midlewares()

        // Rutas de mi aplicacion
        this.routes()
    }

    midlewares() {
        // Directorio Publico
        this.app.use(express.static('public'))
    }


    routes (){
        this.app.get('/api', (req, res) => {
            res.send('Hello World!')
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }
}

module.exports = Server