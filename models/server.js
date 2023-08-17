const express = require('express')
const cors = require('cors');

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

        //CORS
        this.app.use(cors())

        // Directorio Publico
        this.app.use(express.static('public'))
    }


    routes (){
        this.app.get('/api', (req, res) => {
            res.json({
                ok: true,
                msg: "GET API"
            })
        })

        this.app.post('/api', (req, res) => {
            res.status(400).json({
                ok: true,
                msg: "POST API"
            })
        })

        this.app.put('/api', (req, res) => {
            res.json({
                ok: true,
                msg: "PUT API"
            })
        })

        this.app.delete('/api', (req, res) => {
            res.json({
                ok: true,
                msg: "DELETE API"
            })
        })
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Corriendo en el http://localhost:${this.port}/`)
        })
    }
}

module.exports = Server