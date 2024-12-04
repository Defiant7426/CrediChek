import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { set } from 'react-datepicker/dist/date_utils';

export default function CuerpoChat() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState([
    { sender: 'Asistente IA', text: 'Hola, ¿en qué puedo ayudarte a calcular tu score crediticio?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const { theme } = useContext(ThemeContext);
  const username = localStorage.getItem("username") || "Paciente";
  const [userData, setUserData] = useState({});
  const [consultaSQL, setConsultaSQL] = useState('');
  const [resultadosSQL, setResultadosSQL] = useState([]);
  

  // Función para manejar la captura de voz
  const startListening = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Idioma español
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
      const transcript = event.results[0][0].transcript;
      sendMessage(transcript);  // Enviar el mensaje como texto
    };

    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  // Función para convertir texto a voz
  const speakText = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Idioma español
    window.speechSynthesis.speak(utterance);
  };

  // Enviar el mensaje
  const sendMessage = async (message: string) => {
    if (message.trim() === '') return;

    const newMessages = [...messages, { sender: username, text: message }];
    setMessages(newMessages);
    setInputValue('');

    let gptResponse = '';

    try {
      const response_detection = await axios.post('http://localhost:3001/api/detect', { message });
      console.log("Respuesta de detección: ", response_detection.data.response);
      let gpt_detec_response = response_detection.data.response;
      //quitamos los acentos que puede haber en la respuesta
      gpt_detec_response = gpt_detec_response.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      if (gpt_detec_response.toLowerCase().includes('genero')) {
        const genero = gpt_detec_response.match(/El genero de la persona es (\w+)/);
        if (genero) {
          console.log("El genero es: ", genero[1]);
          setUserData({ ...userData, codigo_genero: genero[1] });
          console.log("userData: ", userData);
        }
      }
      // Extracción de número de hijos
      if (gpt_detec_response.toLowerCase().includes('hijo')) {
        const hijos = gpt_detec_response.match(/El numero de hijos es (\d+)/i);
        if (hijos) {
          const numeroHijosValue = parseInt(hijos[1]);
          console.log("El número de hijos es:", numeroHijosValue);
          setUserData({ ...userData, numero_hijos: numeroHijosValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de estado civil
      if (gpt_detec_response.toLowerCase().includes('estado civil')) {
        const estadoCivil = gpt_detec_response.match(/El estado civil de la persona es (\w+)/i);
        if (estadoCivil) {
          const estadoCivilValue = estadoCivil[1];
          console.log("El estado civil es:", estadoCivilValue);
          setUserData({ ...userData, estado_civil: estadoCivilValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de número de miembros en la familia
      if (gpt_detec_response.toLowerCase().includes('familia')) {
        const miembrosFamilia = gpt_detec_response.match(/El numero de miembros en la familia es (\d+)/i);
        if (miembrosFamilia) {
          const numeroMiembrosFamiliaValue = parseInt(miembrosFamilia[1]);
          console.log("El número de miembros en la familia es:", numeroMiembrosFamiliaValue);
          setUserData({ ...userData, numero_miembros_familia: numeroMiembrosFamiliaValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de ingreso total
      if (gpt_detec_response.toLowerCase().includes('ingreso total')) {
        const ingresoTotal = gpt_detec_response.match(/El ingreso total de la persona es (\d+\.?\d*)/i);
        if (ingresoTotal) {
          const ingresoTotalValue = parseFloat(ingresoTotal[1]);
          console.log("El ingreso total es:", ingresoTotalValue);
          setUserData({ ...userData, ingreso_total: ingresoTotalValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de tipo de ingreso
      if (gpt_detec_response.toLowerCase().includes('tipo de ingreso')) {
        const tipoIngreso = gpt_detec_response.match(/El tipo de ingreso de la persona es (\w+)/i);
        if (tipoIngreso) {
          const tipoIngresoValue = tipoIngreso[1];
          console.log("El tipo de ingreso es:", tipoIngresoValue);
          setUserData({ ...userData, tipo_ingreso: tipoIngresoValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de nivel educativo
      if (gpt_detec_response.toLowerCase().includes('nivel educativo')) {
        const nivelEducativo = gpt_detec_response.match(/El nivel educativo de la persona es (\w+)/i);
        if (nivelEducativo) {
          const nivelEducativoValue = nivelEducativo[1];
          console.log("El nivel educativo es:", nivelEducativoValue);
          setUserData({ ...userData, nivel_educativo: nivelEducativoValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de tipo de ocupación
      if (gpt_detec_response.toLowerCase().includes('tipo de ocupacion')) {
        const tipoOcupacion = gpt_detec_response.match(/El tipo de ocupacion de la persona es (\w+)/i);
        if (tipoOcupacion) {
          const tipoOcupacionValue = tipoOcupacion[1];
          console.log("El tipo de ocupación es:", tipoOcupacionValue);
          setUserData({ ...userData, tipo_ocupacion: tipoOcupacionValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de propiedad de vehículo
      if (gpt_detec_response.toLowerCase().includes('propietario de vehiculo')) {
        const propietarioVehiculo = gpt_detec_response.match(/El usuario es propietario de vehiculo (\w+)/i);
        if (propietarioVehiculo) {
          const propietarioVehiculoValue = propietarioVehiculo[1];
          console.log("Propietario de vehículo:", propietarioVehiculoValue);
          setUserData({ ...userData, propietario_vehiculo: propietarioVehiculoValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de propiedad de propiedad
      if (gpt_detec_response.toLowerCase().includes('propietario de propiedad')) {
        const propietarioPropiedad = gpt_detec_response.match(/El usuario es propietario de propiedad (\w+)/i);
        if (propietarioPropiedad) {
          const propietarioPropiedadValue = propietarioPropiedad[1];
          console.log("Propietario de propiedad:", propietarioPropiedadValue);
          setUserData({ ...userData, propietario_propiedad: propietarioPropiedadValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de tipo de vivienda
      if (gpt_detec_response.toLowerCase().includes('tipo de vivienda')) {
        const tipoVivienda = gpt_detec_response.match(/El tipo de vivienda de la persona es (\w+)/i);
        if (tipoVivienda) {
          const tipoViviendaValue = tipoVivienda[1];
          console.log("El tipo de vivienda es:", tipoViviendaValue);
          setUserData({ ...userData, tipo_vivienda: tipoViviendaValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de tipo de contrato
      if (gpt_detec_response.toLowerCase().includes('tipo de contrato')) {
        const tipoContrato = gpt_detec_response.match(/El tipo de contrato de la persona es (\w+)/i);
        if (tipoContrato) {
          const tipoContratoValue = tipoContrato[1];
          console.log("El tipo de contrato es:", tipoContratoValue);
          setUserData({ ...userData, tipo_contrato: tipoContratoValue });
          console.log("userData: ", userData);    
        }
      }

      // Extracción de monto de crédito
      if (gpt_detec_response.toLowerCase().includes('monto del credito')) {
        const montoCredito = gpt_detec_response.match(/El monto del credito de la persona es (\d+\.?\d*)/i);
        if (montoCredito) {
          const montoCreditoValue = parseFloat(montoCredito[1]);
          console.log("El monto del crédito es:", montoCreditoValue);
          setUserData({ ...userData, monto_credito: montoCreditoValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de monto de anualidad
      if (gpt_detec_response.toLowerCase().includes('monto de la anualidad')) {
        const montoAnualidad = gpt_detec_response.match(/El monto de la anualidad de la persona es (\d+\.?\d*)/i);
        if (montoAnualidad) {
          const montoAnualidadValue = parseFloat(montoAnualidad[1]);
          console.log("El monto de la anualidad es:", montoAnualidadValue);
          setUserData({ ...userData, monto_anualidad: montoAnualidadValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de precio de bienes
      if (gpt_detec_response.toLowerCase().includes('precio de los bienes')) {
        const precioBienes = gpt_detec_response.match(/El precio de los bienes de la persona es (\d+\.?\d*)/i);
        if (precioBienes) {
          const precioBienesValue = parseFloat(precioBienes[1]);
          console.log("El precio de los bienes es:", precioBienesValue);
          setUserData({ ...userData, precio_bienes: precioBienesValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de deuda con el banco
      if (gpt_detec_response.toLowerCase().includes('tiene deuda con el banco')) {
        const deudaBanco = gpt_detec_response.match(/El usuario tiene deuda con el banco (\w+)/i);
        if (deudaBanco) {
          const deudaBancoValue = deudaBanco[1];
          console.log("Deuda con el banco:", deudaBancoValue);
          setUserData({ ...userData, fuente_externa_2: deudaBancoValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de deuda con un servicio
      if (gpt_detec_response.toLowerCase().includes('tiene deuda con un servicio')) {
        const deudaServicio = gpt_detec_response.match(/El usuario tiene deuda con un servicio (\w+)/i);
        if (deudaServicio) {
          const deudaServicioValue = deudaServicio[1];
          console.log("Deuda con un servicio:", deudaServicioValue);
          setUserData({ ...userData, fuente_externa_3: deudaServicioValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de edad
      if (gpt_detec_response.toLowerCase().includes('edad')) {
        const edad = gpt_detec_response.match(/La edad de la persona es (\d+)/i);
        if (edad) {
          const edadValue = parseInt(edad[1]);
          console.log("La edad es:", edadValue);
          setUserData({ ...userData, edad: edadValue });
          console.log("userData: ", userData);
        }
      }

      // Extracción de años de empleo
      if (gpt_detec_response.toLowerCase().includes('años de empleo')) {
        const añosEmpleo = gpt_detec_response.match(/La persona lleva (\d+) años en su empleo/i);
        if (añosEmpleo) {
          const añosEmpleoValue = parseInt(añosEmpleo[1]);
          console.log("Años de empleo:", añosEmpleoValue);
          setUserData({ ...userData,  anios_empleo: añosEmpleoValue });
          console.log("userData: ", userData);
        }
      }

      if (userData && Object.keys(userData).length > 0) {
        try{
          const fastApiResponse = await axios.post('http://localhost:8000/predict', userData);
          const consultaSQL = fastApiResponse.data.consulta_sql;
        
          // Enviar consultaSQL al endpoint /api/consultasql
          const respuestaSQL = await axios.post('http://localhost:3001/api/consultasql', { consulta_sql: consultaSQL });
          setResultadosSQL(respuestaSQL.data.resultados);

          console.log("Consulta SQL: ", consultaSQL);

          console.log("Resultados SQL: ", respuestaSQL.data.resultados);

          if(respuestaSQL.data.resultados[0].avg){

            gptResponse = gptResponse + "Score " + respuestaSQL.data.resultados[0].avg + ". ";
          }
        }catch (error) {
          console.error('Error al obtener la respuesta de FastAPI:', error);
          setMessages([...newMessages, { sender: 'Asistente IA', text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' }]);

        }
        // Enviar userData al backend FastAPI para obtener consulta_sql
        
      }
      
  }catch (error) {
    console.error('Error al detectar el genero:', error);
    setMessages([...newMessages, { sender: 'Asistente IA', text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.'
    }]);
  }


    try {
      const response = await axios.post('http://localhost:3001/api/chat', {
        username,
        messages: newMessages.map(msg => ({
          role: msg.sender === username ? 'user' : 'assistant',
          content: msg.text
        }))
      });

      gptResponse = gptResponse + response.data.response;

      

      if (gptResponse.toLowerCase().includes('cita confirmada')) {
        const citaData = extractCitaData(gptResponse); // Extraer datos de la cita
        if (citaData) {
          await axios.post('/api/citas', { username, ...citaData });
        }
      }

      // Mostrar respuesta de GPT y reproducirla
      setMessages([...newMessages, { sender: 'Asistente IA', text: gptResponse }]);
      speakText(gptResponse);  // Reproducir la respuesta del asistente

    } catch (error) {
      console.error('Error al obtener la respuesta de GPT:', error);
      setMessages([...newMessages, { sender: 'Asistente IA', text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' }]);
    }
  };

  const extractCitaData = (responseText: string) => {
    const fechaMatch = responseText.match(/fecha: (\d{4}-\d{2}-\d{2})/); // Ejemplo: "fecha: 2024-11-28"
    const horaMatch = responseText.match(/hora: (\d{2}:\d{2})/); // Ejemplo: "hora: 14:00"
    const especialidadMatch = responseText.match(/especialidad: (\w+)/); // Ejemplo: "especialidad: cardiología"
    const doctorMatch = responseText.match(/doctor: Dr. ([\w\s]+)/); // Ejemplo: "doctor: Dr. López"
  
    if (fechaMatch && horaMatch) {
      return {
        fecha: fechaMatch[1],
        hora: horaMatch[1],
        especialidad: especialidadMatch ? especialidadMatch[1] : null,
        doctor: doctorMatch ? doctorMatch[1] : null
      };
      }
      return null;
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    
<div
  className={`flex flex-col ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`}
  style={{ minHeight: '80vh' }}
>
  <div
    className="max-w-4xl mx-auto py-4 px-6 flex flex-col"
    style={{ flexGrow: 1, maxHeight: '80vh', overflow: 'hidden' }}
  >
    <div
      className={`flex-1 overflow-y-auto border rounded-lg p-4 ${theme === 'dark' ? 'bg-[#152C2C] text-white' : 'bg-white text-black'}`}
      style={{ maxHeight: 'calc(100% - 100px)', overflowY: 'auto' }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`rounded-lg p-3 max-w-xs text-sm ${
              msg.sender === username
                ? 'bg-green-500 text-white rounded-br-none'
                : 'bg-gray-200 text-black rounded-bl-none'
            }`}
          >
            <span className="font-bold">{msg.sender}:</span> {msg.text}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>

    <div className={`mt-4 flex items-center border-t pt-4 ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`}>
      <input
        type="text"
        className={`flex-1 border rounded-l-lg p-2 outline-none ${theme === 'dark' ? 'bg-[#152C2C] text-white' : 'bg-white text-black'}`}
        placeholder="Escribe tu mensaje..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="bg-credi-check text-white text-sm font-bold px-4 py-2 rounded-r-lg hover:bg-credi-check-dark"
        onClick={() => sendMessage(inputValue)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
      <button
        className="bg-credi-check text-white text-sm font-bold px-4 py-2 ml-2 rounded-lg hover:bg-credi-check-dark"
        onClick={startListening}
        disabled={isListening}
      >
        {isListening ? 'Escuchando...' : 'Hablar'}
      </button>
    </div>
  </div>
</div>

  );
}
