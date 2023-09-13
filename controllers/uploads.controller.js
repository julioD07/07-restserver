const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

const cargarArchivo = async (req = request, res = response) => {
  
  try {
      const nombre = await subirArchivo(req.files, undefined, 'imgs');
      res.json({
        ok: true,
        nombre,
      });
  } catch (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
  }
};

const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params

    let modelo;

    switch (coleccion) {
      case 'usuarios':
          modelo = await Usuario.findById(id)
          if (!modelo) {
              return res.status(400).json({
                ok: false,
                msg: `No existe un usuario con el id ${id}`
              })
          }
          break;
      case 'productos': 
          modelo = await Producto.findById(id)
          if (!modelo) {
              return res.status(400).json({
                ok: false,
                msg: `No existe un producto con el id ${id}`
              })
          }
          break;
    
      default:
        return res.status(500).json({ok: false, msg: "se me olvido añadir esto"})
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre
    
    await modelo.save()

    res.json({
      ok: true, 
      modelo
    })
}

module.exports = {
  cargarArchivo,
  actualizarImagen
};
