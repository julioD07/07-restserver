const {request, response} = require('express')

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'No name', apiKey, page = 1, limit = 10} = req.query

    res.json({
        ok: true,
        msg: "GET API CONTROLLER",
        q, 
        nombre, 
        apiKey
    })
}

const usuariosPost = (req = request, res = response) => {

    const {nombre, edad} = req.body

    res.json({
        ok: true,
        msg: "POST API CONTROLLER",
        nombre,
        edad
    })
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id

    res.json({
        ok: true,
        msg: "PUT API CONTROLLER",
        id
    })
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "PATCH API CONTROLLER"
    })
}

const usuariosDelete = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "DELETE API CONTROLLER"
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}