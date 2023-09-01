const Rol = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');

const esRolValido = async(rol = '') => {
    const existeRol = await Rol.findOne({ rol })

    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo })

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya se encuentra registrado en la BD`)
    }
}

const existeUsuarioPorID = async (id) => {
    const existeUsuarioId = await Usuario.findById(id)

    if (!existeUsuarioId) {
        throw new Error(`El id ${id} no se encuentra registrado en la BD`)
    }
}


const existeCategoriaPorID = async (id) => {
    const existeCategoriaId = await Categoria.findById(id)

    // console.log(existeCategoriaId)

    if (!existeCategoriaId) {
        throw new Error(`La categoria con ${id} no se encuentra registrado en la BD`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorID
}

