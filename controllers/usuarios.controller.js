const {request, response} = require('express')
const Usuario = require('../models/usuario')
const { encriptarContraseña } = require('../helpers/hashPasswords')


const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre = 'No name', apiKey, page = 1, limit = 10} = req.query

    const { limit = 5, desde = 0 } = req.query
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(desde)
                .limit(Number(limit))
    ])

    res.json({
        ok: true,
        msg: "Todos los usuarios listados correctamente",
        total,
        usuarios
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
        msg: "Usuario Creado Correctamente",
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
        msg: "Usuario Registrado Correctamente",
        usuario
    })
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: "PATCH API CONTROLLER"
    })
}

const usuariosDelete = async (req = request, res = response) => {

    const { id } = req.params

    const { usuarioAutenticado } = req

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id)

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json({
        ok: true,
        msg: "Usuario Eliminado Correctamente",
        usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}