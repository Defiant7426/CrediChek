import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import { query, createTable } from './db.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';  // Asegúrate de importar path
import "dotenv/config";

// Obtener el nombre del archivo y el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

createTable();

// Aquí iría el resto de tu código...



// Endpoint para registrar un nuevo usuario
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const result = await query(
      'INSERT INTO usuario (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, password, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    res.status(500).json({ error: 'No se pudo registrar el usuario' });
  }
});


// Endpoint para login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await query(
      'SELECT * FROM usuario WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.json({success:true, message: 'Login exitoso', user: result.rows[0] });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error al iniciar sesión:', err.message);
    res.status(500).json({ error: 'No se pudo procesar la solicitud' });
  }
});


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/api/citas', async (req, res) => {
  const { username } = req.query;

  try {
    const result = await query(
      'SELECT * FROM citas WHERE username = $1 ORDER BY fecha, hora',
      [username]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener las citas:', err.message);
    res.status(500).json({ error: 'No se pudieron obtener las citas' });
  }
});


app.post('/api/chat', async (req, res) => {
  const { username,messages } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `
            Eres un asistente especializado en ofrecer apoyo a los usuarios de CrediRisk, una aplicación que ayuda a las personas a calcular su score crediticio y gestionar su salud financiera. Tu misión es proporcionar asistencia clara y precisa, ayudando a los usuarios a obtener un cálculo confiable de su riesgo crediticio. Sigue estos pasos en cada interacción con el usuario:
1. Bienvenida y Orientación:
Saludo inicial: "¡Hola, ${username}! Bienvenido a CrediRisk, ¿te puedo ayudar a calcular tu score crediticio?"

2. Recopilación de Información financiera
Solicitar información personal: "Para comenzar, necesitaré algunos datos personales. ¿Podrías proporcionarme tu nombre?"

Luego de esto, debes hacer las siguientes preguntas respectivamente al usuario:

2.1 Preguntar por el genero del usuario
2.2 Preguntar por el numero de hijos
2.3 Preguntar por el estado civil del usuario
2.4 Preguntar por el numero de miembros en la familia
2.5 Preguntar por el ingreso total del usuario
2.6 Preguntar por el tipo de ingreso del usuario
2.7 Preguntar por el nivel educativo del usuario
2.8 Preguntar por el tipo de ocupación del usuario
2.9 Preguntar si el usuario es propietario de un vehículo
2.10 Preguntar si el usuario es propietario de una propiedad
2.11 Preguntar por el tipo de vivienda del usuario
2.12 Preguntar por el tipo de contrato del usuario
2.13 Preguntar por el monto del crédito del usuario
2.14 Preguntar por el monto de la anualidad del usuario
2.15 Preguntar por el precio de los bienes del usuario
2.16 Preguntar por si es que el usuario debe algun servicio del usuario
2.17 Preguntar por si es que el usuario tiene alguna deuda en otro banco
2.18 Preguntar por la edad del usuario
2.19 Preguntar por los años de empleo del usuario

No repitas el numero osea el "2.x" solo formula la pregunta al usuario

El usuario debe de dar respuestas como las siguientes, si es que no responde de esta manera debes de pedirle que lo haga (solo son ejemplos de respuestas el usuario debe de responder de manera natural refiriendose a la pregunta dada):

            "Mi genero es hombre" 
            "Mi genero es mujer"
            "Soy varon" 
            "Soy una dama" 
            "Soy hombre" 
            "Soy mujer"

            "Tengo 2 hijos" 
            "Poseo 3 hijos" 
            "Tengo dos hijos" 
            "Tenemos 4 hijos" 

            "Estoy casado" 
            "Estoy soltero" 
            "Estoy divorciado" 
            "Estoy viudo" 

            "Tengo 4 miembros en mi familia" 
            "Somos 5 en la familia" 
            "Mi familia tiene 6 miembros" 

            "Mi ingreso total es de 1000" 
            "Gano 2000" 
            "Tengo un ingreso de 3000" 

            "Mi tipo de ingreso es asalariado" 
            "Soy independiente" 
            "Trabajo en el servidor publico" 

            "Mi nivel educativo es universitario" 
            "Estoy en la secundaria baja" 
            "No termine la universidad" 

            "Soy gerente" 
            "No me ocupo de nada"
            "Yo soy taxista" 

            "Soy propietario de un vehiculo" 
            "No tengo vehiculo" 

            "Tengo una casa" 
            "No tengo casa" 

            "Vivo en un apartamento alquilado" 
            "Vivo con mis padres" 

            "Tipo de contrato es en efectivo"
            "Mi tipo de contrato es rotativo" 

            "El credito que tengo es de 1000" 
            "Tengo un credito de 2000"

            "Mi anualidad es de 100.100" 
            "Pago 200.334 de anualidad"
            "Tengo una anualidad de 300000" 

            "El precio de mis bienes es de 1000" 
            "Mis bienes valen 2000" 

            "Tengo una deuda con el banco" 
            "No debo nada" 

            "Tengo una deuda pagando el agua" 
            "No debo nada a nadie" 
            
            "Tengo 20 años"
            "Tengo 30 años" 
            "Cumplo 40 años"

            "Tengo 2 años de empleo" 
            "Tengo 3 años de empleo" 
            "Llevo 4 años trabajando"


            Los valores que puede tomar ciertas variables te lo especificare aqui, si no lo menciono es porque es un numero, se entiende que hay ciertas variantes como "varon" que se refiere a hombre:
            genero: hombre, mujer
            estado civil: soltero, casado, matrimonio civil, viudo, separado, desconocido
            tipo ingreso: trabajando, servidor publico, asociado comercial, pensionado, desempleado, estudiante, empresario, licencia maternidad
            nivel educativo: secundaria completa, educacion superior, superior incompleto, secundaria baja, grado academico
            tipo ocupacion: trabajadores, personal principal, contadores, gerentes, nulo, conductores, personal de ventas, personal de limpieza, personal de cocina, personal de servicio privado, personal de medicina, personal de seguridad, personal tecnico alta habilidad, personal de mozo bar, trabajadores baja habilidad, agentes inmobiliarios, secretarias, personal de TI, personal de RRHH
            propietario vehiculo: N, Y
            propietario propiedad: Y, N
            tipo vivienda: casa apartamento, apartamento alquilado, con padres, apartamento municipal, apartamento oficina, apartamento coop
            tipo contrato: prestamos en efectivo, prestamos rotativos


3. No debes de dejar de preguntar al cliente ni que se desvie del tema a propósito hasta que termine completamente de responder las preguntas

4. Has sido creado con el propósito para cumplir estas tareas, no debes de realizar otra tarea que no se haya comentado en este prompt

5. Despedida: "Gracias por usar CrediRisk, ${username}! Que tengas un excelente día."

            
            ` },
        ...messages,
      ],
    });

    const gptResponse = response.choices[0].message.content;
    res.json({ response: gptResponse });
  } catch (error) {
    console.error('Error al obtener la respuesta de GPT:', error);
    res.status(500).json({ error: 'Error al obtener la respuesta de GPT' });
  }
});

// API para detectar el dato del usuario
app.post('/api/detect', async (req, res) => {
  const { message } = req.body;

  console.log("Mensaje del usuario: " + message);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: `
            Quiero que me ayudes a detectar la información que el usuario me proporciona, 
            para ello necesito que me ayudes a identificar los siguientes datos:
            codigo_genero,numero_hijos,estado_civil,numero_miembros_familia,ingreso_total,
            tipo_ingreso,nivel_educativo,tipo_ocupacion,propietario_vehiculo,propietario_propiedad,
            tipo_vivienda,tipo_contrato,monto_credito,monto_anualidad,precio_bienes,fuente_externa_2,
            fuente_externa_3,objetivo,edad,anios_empleo
            Aqui te dare algunos ejemplo de como podrias responder:

            "Mi genero es hombre" -> El género de la persona es hombre
            "Mi genero es mujer" -> El género de la persona es mujer
            "Soy varon" -> El género de la persona es hombre
            "Soy una dama" -> El género de la persona es mujer
            "Soy hombre" -> El género de la persona es hombre
            "Soy mujer" -> El género de la persona es mujer

            "Tengo 2 hijos" -> El número de hijos es 2
            "Tengo dos hijos" -> El número de hijos es 2
            "Tenemos 4 hijos" -> El número de hijos es 4

            "Estoy casado" -> El estado civil de la persona es casado
            "Estoy soltero" -> El estado civil de la persona es soltero
            "Estoy divorciado" -> El estado civil de la persona es divorciado
            "Estoy viudo" -> El estado civil de la persona es viudo

            "Tengo 4 miembros en mi familia" -> El número de miembros en la familia es 4
            "Somos 5 en la familia" -> El número de miembros en la familia es 5
            "Mi familia tiene 6 miembros" -> El número de miembros en la familia es 6

            "Mi ingreso total es de 1000" -> El ingreso total de la persona es 1000
            "Gano 2000" -> El ingreso total de la persona es 2000
            "Tengo un ingreso de 3000" -> El ingreso total de la persona es 3000

            "Mi tipo de ingreso es asalariado" -> El tipo de ingreso de la persona es trabajando
            "Soy independiente" -> El tipo de ingreso de la persona es estudiante
            "Trabajo en el servidor publico" -> El tipo de ingreso de la persona es servidor_publico

            "Mi nivel educativo es universitario" -> El nivel educativo de la persona es educacion_superior
            "Estoy en la secundaria baja" -> El nivel educativo de la persona es secundaria_baja
            "No termine la universidad" -> El nivel educativo de la persona es superior_incompleto

            "Soy gerente" -> El tipo de ocupación de la persona es gerente
            "No me ocupo de nada" -> El tipo de ocupación de la persona es nulo
            "Yo soy taxista" -> El tipo de ocupación de la persona es condutores

            "Soy propietario de un vehiculo" -> El usuario es propietario de vehículo Y
            "No tengo vehiculo" -> El usuario no es propietario de vehículo N
            "Tengo un carro" -> El usuario es propietario de vehiculo Y
            "No tengo carro" -> El usuario no es propietario de vehiculo N

            "Tengo una casa" -> El usuario es propietario de propiedad Y
            "No tengo casa" -> El usuario no es propietario de propiedad N

            "Vivo en un apartamento alquilado" -> El tipo de vivienda de la persona es apartamento_alquilado
            "Vivo con mis padres" -> El tipo de vivienda de la persona es con_padres

            "Tipo de contrato es en efectivo" -> El tipo de contrato de la persona es prestamo_en_efectivo
            "Mi tipo de contrato es rotativo" -> El tipo de contrato de la persona es prestamo_rotativos

            "El credito que tengo es de 1000" -> El monto del credito de la persona es 1000
            "Tengo un credito de 2000" -> El monto del credito de la persona es 2000

            "Mi anualidad es de 100.100" -> El monto de la anualidad de la persona es 100.100
            "Pago 200.334 de anualidad" -> El monto de la anualidad de la persona es 200.334
            "Tengo una anualidad de 300000" -> El monto de la anualidad de la persona es 300.000

            "El precio de mis bienes es de 1000" -> El precio de los bienes de la persona es 1000
            "Mis bienes valen 2000" -> El precio de los bienes de la persona es 2000

            "Tengo una deuda con el banco" -> El usuario tiene deuda con el banco Y
            "No debo nada" -> El usuario no tiene deuda con el banco N

            "Tengo una deuda pagando el agua" -> El usuario tiene deuda con un servicio Y
            "No debo nada a nadie" -> El usuario no tiene deuda con un servicio N
            
            "Tengo 20 años" -> La edad de la persona es 20
            "Tengo 30 años" -> La edad de la persona es 30
            "Cumplo 40 años" -> La edad de la persona es 40
            
            "Tengo 2 años de empleo" -> La persona lleva 2 años en su empleo
            "Tengo 3 años de empleo" -> La persona lleva 3 años en su empleo
            "Llevo 4 años trabajando" -> La persona lleva 4 años en su empleo

            Los valores que pueden tomar ciertas variables te lo especificare aqui, si no lo menciono es porque es un numero:


            codigo_genero: hombre, mujer, XNA
            estado_civil: soltero, casado, matrimonio_civil, viudo, separado, desconocido
            tipo_ingreso: trabajando, servidor_publico, asociado_comercial, pensionado, desempleado, estudiante, empresario, licencia_maternidad
            nivel_educativo: secundaria_completa, educacion_superior, superior_incompleto, secundaria_baja, grado_academico
            tipo_ocupacion: trabajadores, personal_principal, contadores, gerentes, nulo, conductores, personal_de_ventas, personal_de_limpieza, personal_de_cocina, personal_de_servicio_privado, personal_de_medicina, personal_de_seguridad, personal_tecnico_alta_habilidad, personal_de_mozo_bar, trabajadores_baja_habilidad, agentes_inmobiliarios, secretarias, personal_de_TI, personal_de_RRHH
            propietario_vehiculo: N, Y
            propietario_propiedad: Y, N
            tipo_vivienda: casa_apartamento, apartamento_alquilado, con_padres, apartamento_municipal, apartamento_oficina, apartamento_coop
            tipo_contrato: prestamos_en_efectivo, prestamos_rotativos


            Aqui te pasare el mensaje del usuario y me daras la respuesta como los ejemplos que te di anteriormente, si es que no encuentras ningun dato o patron anteriormente dicho, entonces tu respuesta sera "Nada por hacer":
            ${message}
            ` },
      ],
    });
    const gptResponse = response.choices[0].message.content;
    res.json({ response: gptResponse });
  } catch (error) {
    console.error('Error al obtener la respuesta de GPT:', error);
    res.status(500).json({ error: 'Error al obtener la respuesta de GPT' });
  }
});


app.post('/api/consultasql', async (req, res) => {
  const { consulta_sql } = req.body;

  // if (!consulta_sql) {
  //   return res.status(400).json({ error: 'No se proporcionó ninguna consulta SQL.' });
  // }

  try {
    // Ejecutar la consulta SQL
    const result = await query(consulta_sql);
    // const result = await query("SELECT AVG(objetivo) FROM usuario WHERE  codigo_genero=hombre  AND  0.5<numero_hijos AND numero_hijos<99999999 ;");
    //const result = await query("SELECT AVG(objetivo) FROM application_data WHERE  codigo_genero='hombre'  AND  0.5<numero_hijos AND numero_hijos<99999999 ;");

    
    console.log("Resultado", result.rows);
    // Devolver los resultados como JSON
    res.json({ resultados: result.rows });
  } catch (err) {
    console.error('Error al ejecutar la consulta SQL:', err.message);
    res.status(500).json({ error: 'No se pudo ejecutar la consulta SQL.' });
  }
});



app.post('/api/citas', async (req, res) => {
  const { username, fecha, hora, especialidad, doctor } = req.body;

  if (!username || !fecha || !hora || !especialidad || !doctor) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  
  try {
    const result = await query(
      'INSERT INTO citas (username, fecha, hora, especialidad, doctor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, fecha, hora, especialidad, doctor]
    );
    res.status(201).json({ success: true, cita: result.rows[0] });
  } catch (err) {
    console.error('Error al registrar cita:', err.message);
    res.status(500).json({ error: 'No se pudo registrar la cita' });
  }
});



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Aquí guardamos los archivos
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Nombre único para evitar colisiones
  }
});

const upload = multer({ storage: storage });


// Historial de mensajes para cada usuario
const userMessages = {};

// Endpoint para interpretar una imagen y un mensaje
app.post('/api/interpret-image', upload.single('image'), async (req, res) => {
  const userId = req.body.userId || 'default';
  const imagePath = req.file ? req.file.path : null;
  const message = req.body.message || '';

  // Inicializar el historial de mensajes del usuario si no existe
  if (!userMessages[userId]) {
    userMessages[userId] = [];
  }

  try {
    let imageBase64 = null;
    if (imagePath) {
      const imageBuffer = fs.readFileSync(imagePath);
      imageBase64 = imageBuffer.toString('base64');
    }

    const messages = [
      ...userMessages[userId],
      {
        role: "user",
        content: [
          {
            type: "text",
            text: message,
          },
        ],
      }
    ];

    if (imageBase64) {
      messages[messages.length - 1].content.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${imageBase64}`
        },
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages
    });

    // Actualizar el historial de mensajes del usuario
    userMessages[userId] = messages;

    res.json({ description: response.choices[0].message.content });
  } catch (error) {
    console.error("Error procesando la imagen:", error);
    res.status(500).json({ error: 'No se pudo interpretar la.' });
  } finally {
    if (imagePath) {
      fs.unlinkSync(imagePath); // Elimina el archivo temporal
    }
  }
});


// Endpoint para procesar el archivo de audio
app.post('/api/process-audio', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha enviado ningún archivo' });
  }

  try {
    console.log("Se recibio archivo");

    const audioPath = path.join(__dirname, 'uploads', req.file.filename);
    console.log("Ruta de archivo: " + audioPath);

    const audioFile = fs.createReadStream(audioPath);
    console.log("Se almaceno archivo");

    const transcription = await openai.audio.transcriptions.create(
      {
        model:"whisper-1",
        file:audioFile
    }
    )

    console.log("Transcripción realizada");
    const text = transcription.text;
    console.log("Texto transcrito: " + text);

    // Generar resumen con GPT
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: 'system', content: 'Resume la consulta médica.' },
        { role: 'user', content: text },
      ],
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error('Error al procesar el audio:', error);
    res.status(500).json({ error: 'No se pudo procesar el audio' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

