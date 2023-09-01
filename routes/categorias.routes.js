const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares');
const { crearCategoriaController, obtenerCategoriasController, obtenerCategoriaController, actualizarCategoriaController, borrarCategoriaController } = require('../controllers/categorias.controller');
const { existeCategoriaPorID } = require('../helpers/db-validators');


const router = Router()

/** 
 *  ? {{url}}/api/categorias
 * 
 */

// // TODO verificar el id, creamos un middleware para hacer un check.custom(existeCateogria)

// TODO: Servicio para obtener todas las categorias - publico
router.get('/', obtenerCategoriasController)

// TODO: Obtener una categoria por Id - publico
router.get('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], obtenerCategoriaController)

// TODO: Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoriaController)

// TODO: Actualizar un registro por id - privado - cualquier persona con un token valido
router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoriaController)

// TODO: Borrar una categoria - Admin
router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], borrarCategoriaController)


router.get('/', (req, res) => {
    res.json('get')
})

module.exports = router