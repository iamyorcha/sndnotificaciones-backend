const express = require('express');
const { pool } = require('../utils/db');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, correo, rol FROM usuarios');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error: err.message });
  }
});

module.exports = router;
