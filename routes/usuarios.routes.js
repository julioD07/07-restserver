
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const Rol = require('../models/role');

const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(async (rol = '') => {
        const existeRol = await Rol.findOne({ rol })

        if (!existeRol) {
            throw new Error(`El rol ${rol} no esta registrado en la BD`)
        }

    }), 
    validarCampos
], usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuariosDelete)

module.exports = router
