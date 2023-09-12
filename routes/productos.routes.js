const { Router } = require("express");
const { validarCampos, validarJWT, esAdminRol } = require("../middlewares");
const { check } = require("express-validator");
const { obtenerProductosController, obtenerProductoController, crearProductoController, actualizarProducto, borrarProducto } = require("../controllers/productos.controller");
const { existeProductoPorID, existeCategoriaPorID } = require("../helpers/db-validators");

const router = Router()

/** 
 *  ? {{url}}/api/productos
 * 
 */

// TODO: Servicio para obtener todas las productos - publico
router.get('/', obtenerProductosController)

// TODO: Obtener un producto por Id - publico
router.get('/:id', [
    check('id','No es un ID de Mongo valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], obtenerProductoController)

// TODO Crear producto - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], crearProductoController)

// TODO: Actualizar un registro por id - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('categoria','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], actualizarProducto)

// TODO: Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], borrarProducto)

module.exports = router