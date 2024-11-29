import pkg from 'pg'; // Importa el paquete completo
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'usuario123',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'usersdb',
  password: process.env.DB_PASSWORD || 'DelfinesPacificos123',
  port: process.env.DB_PORT || 5432,
});

export const query = (text, params) => pool.query(text, params);

export const createTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS usuario (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'patient'
    );
  `;
  try {
    await pool.query(queryText);
    console.log('Tabla usuario creada/verificada');
  } catch (err) {
    console.error('Error al crear/verificar la tabla:', err.message);
  }
};

export const createTableCitas = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS citas (
      id SERIAL PRIMARY KEY,                -- ID único de la cita
      username TEXT NOT NULL,               -- Nombre de usuario que crea la cita
      fecha DATE NOT NULL,                  -- Fecha de la cita
      hora TIME NOT NULL,                   -- Hora de la cita
      especialidad TEXT,                    -- Especialidad médica (opcional)
      doctor TEXT                           -- Nombre del doctor (opcional)
    );
  `;

  try {
    await pool.query(queryText);
    console.log('Tabla citas creada/verificada');
  } catch (err) {
    console.error('Error al crear/verificar la tabla citas:', err.message);
  }
};

(async () => {
  await createTable();
  await createTableCitas();
})();

