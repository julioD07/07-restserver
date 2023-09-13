const { request, response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");

const cargarArchivo = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      return res.status(400).json({
        ok: false,
        msg: "No hay archivos que subir",
      });
  }

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

module.exports = {
  cargarArchivo,
};
