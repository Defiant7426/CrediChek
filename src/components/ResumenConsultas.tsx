import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { ThemeContext } from "../../ThemeContext";
import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';

type Message = {
  sender: string;
  text: string;
};

export default function ResumenConsultas() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const username = localStorage.getItem("username") || "Usuario";
  const userId = localStorage.getItem("userId") || "default";
//   {const [audioBlob, setAudioBlob] = useState<Blob | null>(null);}
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Mantener el mensaje inicial
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ sender: 'Asistente IA', text: `¡Bienvenido, ${username}! Te ayudaré a resumir tu cita.` }]);
    }
  }, [messages, username]);

  // Manejar la selección de un archivo de audio
  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      //setAudioBlob(file);
      await sendMessage('Audio cargado y enviado', file);
    }
  };

  // Enviar el mensaje y el audio
  const sendMessage = async (message: string, audioFile?: Blob) => {
    if (!audioFile) return;

    // Mantener los mensajes existentes, solo agregar el nuevo
    setMessages(prevMessages => [
      ...prevMessages,
      { sender: username, text: message }
    ]);

    try {
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('audio', audioFile);

      const response = await axios.post('/api/process-audio', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const gptResponse = response.data.summary;

      // Mantener los mensajes existentes y agregar la respuesta del asistente
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'Asistente IA', text: gptResponse }
      ]);
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'Asistente IA', text: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <TopBar />
      <Header />
      <div className={`w-full h-[2px] ${theme === 'dark' ? 'bg-[#1E4343]' : 'bg-vita-link'}`}></div>
      <div className={`flex flex-col ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`} style={{ minHeight: '80vh' }}>
        <div className="max-w-4xl mx-auto py-4 px-6 flex flex-col" style={{ flexGrow: 1, maxHeight: '80vh', overflow: 'hidden' }}>
          {/* Contenedor de los mensajes con altura fija */}
          <div
            className={`flex-1 overflow-y-auto border rounded-lg p-4 ${theme === 'dark' ? 'bg-[#152C2C] text-white' : 'bg-white text-black'}`}
            style={{
              height: '400px', /* Establecer una altura fija para el contenedor */
              overflowY: 'auto', /* Permitirá el desplazamiento si el contenido es mayor que la altura */
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} className="mb-4">
                <div className={`rounded-lg p-3 max-w-xs text-sm ${msg.sender === username ? 'bg-green-500 text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}`}>
                  <span className="font-bold">{msg.sender}:</span> <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-center mt-4">
                <div className="animate-spin border-t-2 border-vita-link rounded-full w-6 h-6"></div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={`mt-4 flex items-center border-t pt-4 ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`}>
            <label className="bg-vita-link text-white text-sm font-bold px-4 py-2 ml-2 rounded-lg hover:bg-vita-link-dark cursor-pointer">
              <i className="fa fa-microphone"></i> Subir Audio
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={handleAudioUpload}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
