const { Router } = require("express");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");

const router = Router()

/** 
 *  ? {{url}}/api/productos
 * 
 */

// TODO Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('usuario'),
    validarCampos
])

module.exports = router