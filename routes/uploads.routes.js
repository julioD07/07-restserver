const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads.controller');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');

const router = Router()

router.get('/:coleccion/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion', 'no es una coleccion permitida').isIn(['usuarios', 'productos']),
    validarCampos
], mostrarImagen)

router.post('/', cargarArchivo)
router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion', 'no es una coleccion permitida').isIn(['usuarios', 'productos']),
    validarCampos
], actualizarImagenCloudinary)


module.exports = router