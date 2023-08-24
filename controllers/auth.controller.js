const { request, response } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");


const loginController = async (req = request, res = response) => {

    const {correo, password} = req.body

    try {

        // TODO Verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos"
            })
        }

        // TODO Verificar si el usuario esta activo
        if (!usuario.estado) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos - estado: false"
            })
        }

        // TODO Verificar la contraseña
        const validpassword = bcryptjs.compareSync(password, usuario.password)
        if (!validpassword) {
            return  res.status(400).json({
                ok: false,
                msg: "Usuario / password no son correctos - password"
            })
        }

        // TODO Generar el JWT
        const token = await generarJWT(usuario.id)

        res.json({
            ok: true,
            msg: "Login OK",
            usuario,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
            error_message: error.message
        })
    }
}



module.exports = {
    loginController
}