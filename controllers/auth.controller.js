const { request, response, json } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google_verify");


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


const googleSignInController = async (req = request, res = response) => {

    const {id_token } = req.body

    try {

        const {nombre, img, correo} = await googleVerify(id_token)

        // TODO Ver si el correo existe en la bd
        let usuario = await Usuario.findOne({correo}).exec()


        if (!usuario) {
            // TODO Si no existe el usuario lo creo
            const data = {
                nombre,
                correo,
                password: ":P",
                img,
                google: true,
                rol: 'USER_ROLE'
            }

            usuario = new Usuario(data)
            await usuario.save()
        }

        // TODO Si el usuario en DB 
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // TODO Generar el JWT
        const token = await generarJWT(usuario._id)

        res.json({
            ok: true,
            msg: "Google Signin",
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            ok: false,
            msg: "El token no se pudo verificar",
            error_message: error.message
        })
    }

}

module.exports = {
    loginController,
    googleSignInController
}