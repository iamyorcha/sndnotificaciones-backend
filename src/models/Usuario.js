const { pool } = require('../utils/db');

class Usuario {
  static async crear(datos) {
    const query = `
      INSERT INTO usuarios (nombre, correo, contraseña, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, correo, rol
    `;
    const hashedPassword = await bcrypt.hash(datos.contraseña, 10);
    const result = await pool.query(query, [
      datos.nombre,
      datos.correo,
      hashedPassword,
      datos.rol
    ]);
    return result.rows[0];
  }

  static async buscarPorCorreo(correo) {
    const query = 'SELECT * FROM usuarios WHERE correo = $1';
    const result = await pool.query(query, [correo]);
    return result.rows[0];
  }
}

module.exports = Usuario;
