const { request, response } = require("express");
const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const { ObjectId } = require("mongoose").Types

const coleccionesPermitidas = [
    "categorias",
    "productos",
    "roles",
    "usuarios",
]

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            ok: true,
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]    
    })

    return res.json({
        ok: true,
        results: usuarios
    })
}

const buscarCategorias = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            ok: true,
            results: (categoria) ? [categoria] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({ 
        nombre: regex, 
        $and: [{ estado: true }]    
    }).populate('usuario', 'nombre')

    return res.json({
        ok: true,
        results: categorias
    })
}

const buscarProducto = async (termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino)

    if (esMongoID) {
        const producto = await Producto.findById(termino)
        return res.json({
            ok: true,
            results: (producto) ? [producto] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const productos = await Producto.find({ 
        nombre: regex, 
        $and: [{ estado: true }]    
    }).populate('usuario', 'nombre').populate('categoria', 'nombre')

    return res.json({
        ok: true,
        results: productos
    })
}

const buscarController = async (req = request, res = response) => {
    try {
        const { coleccion, termino } = req.params;

        if (!coleccionesPermitidas.includes(coleccion)) {
            return res.status(400).json({
                ok: false,
                msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`,
            });
        }

        switch (coleccion) {
            case 'categorias': 
                await buscarCategorias(termino, res)
                break;
            case 'productos': 
                await buscarProducto(termino, res)
                break;
            case 'usuarios': 
                await buscarUsuarios(termino, res)
                break;
            default:
                res.status(500).json({
                    ok: false,
                    msg: "No se implemento todas las busquedas",
                })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, mensaje: "Error inesperado" });
    }
};

module.exports = {
    buscarController,
};
