const { request, response } = require("express");
const Producto = require("../models/producto");

// TODO: obtenerProductosController - paginado - total - populate (obtener el ultimo usuario que lo ha modificado)
const obtenerProductosController = async (req = request, res = response) => {

    const { limit = 5 } = req.query
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .limit(Number(limit))
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .exec()
    ])

    res.json({
        ok: true,
        msg: "Todos las productos listadas correctamente",
        total,
        productos
    })
}

// TODO ObtenerProducto - populate ()
const obtenerProductoController = async (req = request, res = response) => {
    const { id } = req.params
    const query = {estado: true}
    const producto = await Producto.findById(id)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .exec()

    if (!producto.estado) {
        return res.status(400).json({
            ok: false,
            msg: `La producto con el id ${id} no existe`
        })
    }

    res.json({
        ok: true,
        msg: "Producto obtenidd correctamente",
        producto
    })
}

const crearProductoController = async (req = request, res = response) => {

    const { nombre, estado, precio, categoria, descripcion, disponible } = req.body;

    const productoDB = await Producto.findOne({nombre})

    if (productoDB) {
        return res.status(400).json({
            ok: false,
            msg: `El producto ${productoDB.nombre} ya existe`
        })
    }

    // console.log(req.usuarioAutenticado)

    // TODO generar la data a guardar
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        usuario: req.usuarioAutenticado._id,
        precio,
        categoria,
        descripcion,
        disponible
    }

    const producto = new Producto(data)

    // TODO Guardar en la BD
    await producto.save()

    res.status(201).json({
        ok: true,
        producto
    })
}

const actualizarProducto = async (req = request, res = response) => {

    const { id } = req.params
    const { estado, usuario, ...data } = req.body
    
    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuarioAutenticado._id

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})

    res.json(producto)
}

const borrarProducto = async (req = request, res = response) => {
    const { id } = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true})

    res.json({
        ok: true,
        productoBorrado
    })
}


module.exports = {
    obtenerProductosController,
    obtenerProductoController,
    crearProductoController,
    actualizarProducto,
    borrarProducto
}