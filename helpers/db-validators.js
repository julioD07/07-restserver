const Rol = require('../models/role');
const Usuario = require('../models/usuario');
const Categoria = require('../models/categoria');
const Producto = require('../models/producto');

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

const existeProductoPorID = async (id) => {
    const existeProductoId = await Producto.findById(id)

    // console.log(existeCategoriaId)

    if (!existeProductoId) {
        throw new Error(`El producto con ${id} no se encuentra registrado en la BD`)
    }
}


/**
 * ? Validar Colecciones Permitidas
 */

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluido = coleccion.includes(coleccion)

    if (!incluido) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`)
    }

    return true
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    coleccionesPermitidas
}

