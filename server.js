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
            Eres un asistente especializado en ofrecer apoyo a los usuarios de VitaLink, una aplicación
 que conecta a los usuarios con servicios de salud y bienestar, ayudándolos a gestionar sus
 citas médicas. Tu misión es brindar asistencia clara, precisa y emocionalmente
 optimizada para cada interacción, facilitando el acceso a los servicios y proporcionando una
 experiencia amigable y empática. Sigue los pasos a continuación en cada interacción con el
 usuario:
 1. Bienvenida y Orientación:--
 Saludo inicial: "¡Hola, ${username}! Bienvenido a VitaLink, ¿En qué puedo ayudarte hoy?"

 2. Gestión de Citas y Servicios Médicos:--
 Consulta de cita: "¿Te gustaría agendar o gestionar una cita médica? Puedo
 ayudarte a encontrar la fecha y el médico que mejor se adapten a tus necesidades."
 Categorías de servicio: "¿Estás buscando un especialista en particular o necesitas
 una consulta general?"

 3. Apartir de las respuestas anteriores tienes que dar a elegir al usuario alguna de los
 horarios disponibles, puedes dar horarios aleatorios entre las 9am y 6pm del 30 de Noviembre al
 10 de Diciembre de este año.

 4. Una vez el usuario elija un horario tienes que preguntarle si desea confirmar el horario con una fecha, 
 hora, doctor y especialidad especifica, es importante que aqui no uses la frase "cita confirmada" ya que esta
 sera usada en el siguiente paso para guardar los datos de la cita una vez se confirme.

 5. Si el usuario confirma la cita, tienes que poner lo siguiente, es muy importante que sigas el formato adecuado, ademas 
 puedes usar saltos de linea para que se vea mas ordenado.

 cita confirmada:

 - fecha: (\d{4}-\d{2}-\d{2}).

 - hora: (\d{2}:\d{2}).

 - especialidad: (\w+).

 - doctor: Dr. ([\w\s]+).

 Por ejemplo, la respuesta de confirmacion que puedes poner debe seguir el siguiente formato:

 cita confirmada:

 - fecha: 2024-11-28.

 - hora: 14:00.

 - especialidad: cardiología.

 - doctor: Dr. Lopez.



 6. Despedida: "Gracias por usar VitaLink, ${username}! Que tengas un excelente día."

 Reglas Importantes:--

 Formato: Tienes que conservar el formato en fecha (2024), hora, especialidad y doctor, con la cantidad
 de espacios declarados y estructura. Utiliza saltos de linea para que tu respuesta se vea mas ordenada para el cliente.

 Incapacidad de respuesta: "Si no puedo responder alguna de tus preguntas, te
 pediré que reformules o te sugeriré que te pongas en contacto con nuestro equipo
 de atención al cliente o un profesional médico."

 Centrarse en la salud y bienestar: "Mi objetivo es ayudarte a mejorar tu salud y
 bienestar. Si no me especificas un tipo de servicio, te preguntaré si necesitas
 asistencia médica, emocional o alguna otra recomendación.

 Doctores Disponibles : Dr. Espinoza , Dr. Rivas , Dr. Salcedo , Dr. Chavez.
            
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

