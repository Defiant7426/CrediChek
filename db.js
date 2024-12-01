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
      SK_ID_CURR BIGINT PRIMARY KEY,
      TARGET INT,
      NAME_CONTRACT_TYPE VARCHAR(50),
      CODE_GENDER VARCHAR(10),
      FLAG_OWN_CAR VARCHAR(10),
      FLAG_OWN_REALTY VARCHAR(10),
      CNT_CHILDREN INT,
      AMT_INCOME_TOTAL FLOAT,
      AMT_CREDIT FLOAT,
      AMT_ANNUITY FLOAT,
      AMT_GOODS_PRICE FLOAT,
      NAME_TYPE_SUITE VARCHAR(50),
      NAME_INCOME_TYPE VARCHAR(50),
      NAME_EDUCATION_TYPE VARCHAR(50),
      NAME_FAMILY_STATUS VARCHAR(50),
      NAME_HOUSING_TYPE VARCHAR(50),
      REGION_POPULATION_RELATIVE FLOAT,
      DAYS_BIRTH FLOAT,
      DAYS_EMPLOYED FLOAT,
      DAYS_REGISTRATION FLOAT
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
  const filePath = './data/application_train.csv';
  const queryText = `
    INSERT INTO application_data (
      SK_ID_CURR, TARGET, NAME_CONTRACT_TYPE, CODE_GENDER, FLAG_OWN_CAR, FLAG_OWN_REALTY, CNT_CHILDREN, 
      AMT_INCOME_TOTAL, AMT_CREDIT, AMT_ANNUITY, AMT_GOODS_PRICE, NAME_TYPE_SUITE, NAME_INCOME_TYPE, 
      NAME_EDUCATION_TYPE, NAME_FAMILY_STATUS, NAME_HOUSING_TYPE, REGION_POPULATION_RELATIVE, 
      DAYS_BIRTH, DAYS_EMPLOYED, DAYS_REGISTRATION
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
  `;

  const results = [];
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => {
      const values = [
        data.SK_ID_CURR || null, data.TARGET || null, data.NAME_CONTRACT_TYPE || null, data.CODE_GENDER || null, 
        data.FLAG_OWN_CAR || null, data.FLAG_OWN_REALTY || null, data.CNT_CHILDREN || null, 
        data.AMT_INCOME_TOTAL || null, data.AMT_CREDIT || null, data.AMT_ANNUITY || null, 
        data.AMT_GOODS_PRICE || null, data.NAME_TYPE_SUITE || null, data.NAME_INCOME_TYPE || null, 
        data.NAME_EDUCATION_TYPE || null, data.NAME_FAMILY_STATUS || null, data.NAME_HOUSING_TYPE || null, 
        data.REGION_POPULATION_RELATIVE || null, data.DAYS_BIRTH || null, data.DAYS_EMPLOYED || null, 
        data.DAYS_REGISTRATION || null
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