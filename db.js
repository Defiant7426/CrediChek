import pkg from 'pg'; // Importa el paquete completo
import fs from 'fs';
import csv from 'csv-parser';
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

export const createTableApplicationData = async () => {
  const dropQuery = 'DROP TABLE IF EXISTS application_data';
  const queryText = `
  CREATE TABLE IF NOT EXISTS application_data (
    id INT,
    codigo_genero VARCHAR(10),
    numero_hijos FLOAT,
    estado_civil VARCHAR(50),
    numero_miembros_familia FLOAT,
    ingreso_total FLOAT,
    tipo_ingreso VARCHAR(50),
    nivel_educativo VARCHAR(50),
    tipo_ocupacion VARCHAR(50),
    propietario_vehiculo VARCHAR(1),
    propietario_propiedad VARCHAR(1),
    tipo_vivienda VARCHAR(50),
    tipo_contrato VARCHAR(50),
    monto_credito FLOAT,
    monto_anualidad FLOAT,
    precio_bienes FLOAT,
    fuente_externa_2 FLOAT,
    fuente_externa_3 FLOAT,
    objetivo FLOAT,
    edad FLOAT,
    anios_empleo FLOAT
  );
`;

  try {
    await pool.query(dropQuery);
    console.log('Tabla application_data eliminada');
    await pool.query(queryText);
    console.log('Tabla application_data creada/verificada');
  } catch (err) {
    console.error('Error al crear/verificar la tabla application_data:', err.message);
  }
};

export const loadCSVData = async () => {
  const filePath = './data/data_ultimo.csv'; // application_train
  const queryText = `
  INSERT INTO application_data (
    codigo_genero, numero_hijos, estado_civil, numero_miembros_familia,
    ingreso_total, tipo_ingreso, nivel_educativo, tipo_ocupacion,
    propietario_vehiculo, propietario_propiedad, tipo_vivienda,
    tipo_contrato, monto_credito, monto_anualidad, precio_bienes,
    fuente_externa_2, fuente_externa_3, objetivo, edad, anios_empleo
  ) VALUES (
    $1, $2, $3, $4,
    $5, $6, $7, $8,
    $9, $10, $11, $12,
    $13, $14, $15, $16,
    $17, $18, $19, $20
  );
`;

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      const values = [
        data.codigo_genero,
        data.numero_hijos,
        data.estado_civil,
        data.numero_miembros_familia,
        data.ingreso_total,
        data.tipo_ingreso,
        data.nivel_educativo,
        data.tipo_ocupacion,
        data.propietario_vehiculo,
        data.propietario_propiedad,
        data.tipo_vivienda,
        data.tipo_contrato,
        data.monto_credito,
        data.monto_anualidad,
        data.precio_bienes,
        data.fuente_externa_2,
        data.fuente_externa_3,
        data.objetivo,
        data.edad,
        data.anios_empleo
      ];
      results.push(pool.query(queryText, values));
    })
    .on('end', async () => {
      try {
        await Promise.all(results);
        console.log('Datos del CSV cargados en la tabla application_data');
      } catch (err) {
        console.error('Error al cargar datos del CSV:', err.message);
      }
    });
};

(async () => {
  await createTable();
  await createTableCitas();
  await createTableApplicationData();
  await loadCSVData();
})();