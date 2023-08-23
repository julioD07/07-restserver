const brcyptjs = require('bcryptjs')

const encriptarContraseña = async (password = '') => {
    const salt = brcyptjs.genSaltSync();
    return brcyptjs.hashSync(password, salt)
}

module.exports = {
    encriptarContraseña
}