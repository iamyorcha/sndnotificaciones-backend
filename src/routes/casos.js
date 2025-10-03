const express = require('express');
const { pool } = require('../utils/db');
const router = express.Router();

// Obtener casos por ministro
router.get('/ministro/:ministroId', async (req, res) => {
  const { ministroId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM casos WHERE asignado_a = $1 ORDER BY creado_en DESC',
      [ministroId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener casos', error: err.message });
  }
});

module.exports = router;
