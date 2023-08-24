
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de mas de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo')
        .custom(existeEmail), 
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol')
        // * Esto es implicito en un callback
        // ? .custom( (rol) => esRolValido(rol)), 
        .custom(esRolValido), 
    validarCampos
], usuariosPost)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol')
        .custom(esRolValido), 
    validarCampos
] ,usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete)

module.exports = router
