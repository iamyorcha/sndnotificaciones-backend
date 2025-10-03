const express = require('express');
const multer = require('multer');
const path = require('path');
const { pool } = require('../utils/db');

const router = express.Router();

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Registrar diligencia
router.post('/', upload.single('foto'), async (req, res) => {
  const {
    caso_id,
    ministro_id,
    esta_contribuyente,
    nombre_recibe,
    telefono_recibe,
    plazo_pago,
    ubicacion_lat,
    ubicacion_lng
  } = req.body;

  try {
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO diligencias (
        caso_id, ministro_id, esta_contribuyente, nombre_recibe,
        telefono_recibe, plazo_pago, ubicacion_lat, ubicacion_lng, foto_url
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [caso_id, ministro_id, esta_contribuyente, nombre_recibe, telefono_recibe, plazo_pago, ubicacion_lat, ubicacion_lng, foto_url]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al registrar diligencia', error: err.message });
  }
});

module.exports = router;
