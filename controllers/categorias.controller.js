const { request, response } = require("express");
const Categoria = require("../models/categoria");

// TODO: ObtenerCategoriasController - paginado - total - populate (obtener el ultimo usuario que lo ha modificado)
const obtenerCategoriasController = async (req = request, res = response) => {

    const { limit = 5 } = req.query
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .limit(Number(limit))
            .populate('usuario', 'nombre')
            .exec()
    ])

    res.json({
        ok: true,
        msg: "Todos las categorias listadas correctamente",
        total,
        categorias
    })
}

// TODO ObtenerCategoria - populate ()
const obtenerCategoriaController = async (req = request, res = response) => {
    const { id } = req.params
    const query = {estado: true}
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre').exec()

    if (!categoria.estado) {
        return res.status(400).json({
            ok: false,
            msg: `La categoria con el id ${id} no existe`
        })
    }

    res.json({
        ok: true,
        msg: "Categoria obtenida correctamente",
        categoria
    })
}

const crearCategoriaController = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDB = await Categoria.findOne({nombre})

    if (categoriaDB) {
        return res.status(400).json({
            ok: false,
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        })
    }

    // TODO generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    const categoria = new Categoria(data)

    // TODO Guardar en la BD
    await categoria.save()

    res.status(201).json({
        ok: true,
        categoria
    })
}

// TODO ActualizarCategoria 
const actualizarCategoriaController = async (req = request, res = response) => {
    try {
        const { id } = req.params

        // TODO Obtenemos el nombre para actualizar desde el body
        const {estado, usuario, ...data} = req.body

        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.usuario._id

        // TODO Actualizamos la categoria y validamos que no exista el nombre a actualizar
        const categoriaValidar = await Categoria.findOne({nombre})

        if (categoriaValidar) {
            return res.status(400).json({
                ok: false,
                msg: `La categoria ${categoriaValidar.nombre} ya existe`
            })
        }

        const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})

        res.json({
            ok: true,
            msg: "Categoria actualizada correctamente",
            categoria
        })

    } 
    catch (error) {
        console.error(error.message)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
            error_message: error.message
        })
    }
}

// TODO BorrarCategoria - estado: false
const borrarCategoriaController = async (req = request, res = response) => {
    try {
        // TODO Obtenemos el id de la categoria por parametro
        const { id } = req.params

        // TODO Desactivamos la categoria
        const categoria = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true})
        categoria.estado = false

        res.json({
            ok: true,
            msg: "Categoria borrada correctamente",
            categoria
        })

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
            error_message: error.message
        })
    }
}

module.exports = {
    crearCategoriaController,
    obtenerCategoriasController,
    obtenerCategoriaController,
    actualizarCategoriaController,
    borrarCategoriaController
}