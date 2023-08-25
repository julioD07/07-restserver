const { request, response } = require("express");


const esAdminRol = (req = request, res = response, next) => {

    if(!req.usuarioAutenticado){
        return res.status(500).json({
            ok: false,
            msg: "Se quiere verificar el role sin validar el token primero"
        })
    }

    const {rol, nombre} = req.usuarioAutenticado;

    if (rol !== "ADMIN_ROLE") {
        return res.status(401).json({
            ok:false,
            msg:"No tienes permiso para realizar esta acción."
        })
    }
 
    next()
}


const tieneRole = ( ...roles ) => {
    return (req = request, res = response, next) => {

        if(!req.usuarioAutenticado){
            return res.status(500).json({
                ok: false,
                msg: "Se quiere verificar el role sin validar el token primero"
            })
        }

        if (!roles.includes(req.usuarioAutenticado.rol)) {
            return res.status(401).json({
                ok:false,
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }

        console.log(roles)

        next()
    }
}

module.exports = {
    esAdminRol,  // exportamos la funcion de middleware a utilizarla en otros archivos
    tieneRole
}
