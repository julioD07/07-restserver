const { request, response } = require("express");
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const { subirArchivo } = require("../helpers/subir-archivo");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");

cloudinary.config(process.env.CLOUDINARY_URL)

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

    //! Limpiar imagenes previas
    if (modelo.img) {
      //TODO Hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img) 
      //? Validamos que exista la imagen
      if (fs.existsSync(pathImagen)) {
        //? Si la imagen existe, la borramos
        fs.unlinkSync(pathImagen)
      }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre
    
    await modelo.save()

    res.json({
      ok: true, 
      modelo
    })
}

const mostrarImagen = async (req = request, res = response) => {

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

    //! Limpiar imagenes previas
    if (modelo.img) {
      //TODO Hay que borrar la imagen del servidor
      const pathImagen = path.join(__dirname, '../uploads/', coleccion, modelo.img) 
      //? Validamos que exista la imagen
      if (fs.existsSync(pathImagen)) {
        //? Necesito Responde la imagen
        return res.sendFile(pathImagen)
      }
    }

    const pathImagen = path.join(__dirname, '../assets/no-image.jpg')
    res.status(400).sendFile(pathImagen)
} 


const actualizarImagenCloudinary = async (req = request, res = response) => {

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

  //! Limpiar imagenes previas
  if (modelo.img) {
      const nombreArr = modelo.img.split('/')
      const nombre = nombreArr[nombreArr.length - 1]
      const [ public_id ] = nombre.split('.')
      cloudinary.uploader.destroy(public_id)
  }
  const { tempFilePath } = req.files.archivo
  const { secure_url } = await cloudinary.uploader.upload( tempFilePath )

  modelo.img = secure_url
  await modelo.save()

  res.json({
    ok: true, 
    modelo
  })
}


module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
};
