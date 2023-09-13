const dbValidators = require('./db-validators')
const generarJWT = require('./jwt')
const googleVerify = require('./google-verify')
const { subirArchivo } = require('./subir-archivo.js')
const hashPasswords = require('./hashPasswords')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo,
    ...hashPasswords,
}