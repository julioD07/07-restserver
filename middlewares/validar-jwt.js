const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')

    if  (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la peticion"
        })
    }

    try {
        
        const {uid} = jwt.verify(token, process.env.SECRET_KEY)

        // TODO Leer el usuario con el UID que se encuentra
        const usuario = await Usuario.findById(uid)

        // TODO Validar que existan usuarios
        if (!usuario) {
            return res.status(401).json({
                ok:false,
                msg:"El usuario no existe en la base de datos"
            })
        }

        // TODO Verificar si el uid tiene estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                ok:false,
                msg:"El usuario no esta activo"
            })
        }

        // TODO enviar usuario autenticado
        req.usuarioAutenticado = usuario

        next()
    } catch (error) {
        console.log(error.message)
        return res.status(401).json({
            ok:false,
            msg:"Token invalido o expiro"
        })
    }

}

module.exports = {
    validarJWT
}


