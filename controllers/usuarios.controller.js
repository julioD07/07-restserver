const {request, response} = require('express')

const usuariosGet = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "GET API CONTROLLER"
    })
}

const usuariosPost = (req, res) => {
    res.json({
        ok: true,
        msg: "POST API CONTROLLER"
    })
}

const usuariosPut = (req, res) => {
    res.json({
        ok: true,
        msg: "PUT API CONTROLLER"
    })
}

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        msg: "PATCH API CONTROLLER"
    })
}

const usuariosDelete = (req, res) => {
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