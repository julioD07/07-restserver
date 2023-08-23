const {request, response} = require('express')
const brcyptjs = require('bcryptjs')

const Usuario = require('../models/usuario')


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

const usuariosPost = async (req = request, res = response) => {

    

    const { nombre, correo, password, rol } = req.body
    const usuario = new Usuario({
        nombre, 
        correo, 
        password,
        rol
    });

    // Verificar si el correo existe,
    const existeEmail = await Usuario.findOne({ correo })

    if (existeEmail) {
        return res.status(400).json({
            ok: false,
            msg: `El email ${correo}, ya se encuentra registrado`
        })
    }
    
    // Encriptar la contraseña
    const salt = brcyptjs.genSaltSync();
    usuario.password = brcyptjs.hashSync(password, salt)

    //Guardar en la BD

    await usuario.save()

    res.json({
        ok: true,
        msg: "POST API CONTROLLER",
        usuario
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