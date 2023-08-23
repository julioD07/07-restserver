const {request, response} = require('express')
const Usuario = require('../models/usuario')
const { encriptarContraseña } = require('../helpers/hashPasswords')


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
    
    // Encriptar la contraseña
    usuario.password = await encriptarContraseña(password)

    //Guardar en la BD
    await usuario.save()

    res.json({
        ok: true,
        msg: "POST API CONTROLLER",
        usuario
    })
}

const usuariosPut = async (req = request, res = response) => {

    const id = req.params.id
    const { _id, password, google, correo ,...resto } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        resto.password = await encriptarContraseña(password)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json({
        ok: true,
        msg: "PUT API CONTROLLER",
        usuario
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