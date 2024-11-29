import { useState, useEffect } from 'react';

export default function TopBar() {
  const messages = [
    'Cada día es una nueva oportunidad para cuidar de ti mismo, ¡tú puedes, Luis!',
    'Recuerda que tu salud es tu mayor tesoro. ¡Vamos juntos por más bienestar!',
    'Eres más fuerte de lo que crees, y cada paso cuenta. ¡Sigue adelante!',
    'No estás solo en este camino. ¡Estamos aquí para apoyarte siempre!',
    'Tu esfuerzo por cuidar de ti mismo está marcando la diferencia. ¡Bravo, Luis!',
    'La vida siempre tiene algo hermoso para ofrecer. ¡Encuéntralo hoy!',
    'Sonríe, porque cada día es un regalo lleno de posibilidades. ¡Aprovecha el tuyo!',
    'El cuidado de tu cuerpo es un acto de amor propio. ¡Lo estás haciendo genial!',
    'Confía en el proceso, cada pequeño avance importa.',
    'Hoy es un buen día para sentirte orgulloso de ti mismo, ¡porque estás dando tu mejor esfuerzo!',
    'Un día a la vez, un paso a la vez. ¡Estás logrando grandes cosas!',
    'Tus metas de salud están más cerca de lo que piensas. ¡Sigue así!',
    'Tu bienestar importa y merece toda tu atención. ¡Tú vales mucho!',
    'Luis, tu valentía inspira. ¡Nunca dejes de creer en ti mismo!',
    'Recuerda, el cuidado de tu salud es una inversión en tu futuro. ¡Vamos por más!',
    'La perseverancia siempre tiene recompensas. ¡Ya estás viendo los frutos!',
    'Tu esfuerzo de hoy es la salud de mañana. ¡Estás en el camino correcto!',
    'La felicidad también está en cuidar de ti. ¡Sigue así, Luis!',
    'Cada paso que das te acerca a tus metas. ¡No te detengas!',
    'Tu dedicación a tu bienestar es admirable. ¡Sigue adelante!',
    'Hoy es un buen día para cuidar de ti mismo. ¡Tú lo vales!',
    'Cada pequeño cambio cuenta. ¡Estás haciendo un gran trabajo!',
    'Tu salud es tu mayor riqueza. ¡Sigue invirtiendo en ti!',
    'Cada esfuerzo suma, ¡sigue adelante!',
    'Tu bienestar es una prioridad, ¡sigue cuidándote!',
    'Recuerda que cada paso cuenta, ¡sigue avanzando!',
    'Tu salud es tu mayor tesoro, ¡sigue cuidándola!',
    'Cada día es una nueva oportunidad para cuidar de ti mismo, ¡tú puedes!',
    'Recuerda que tu salud es tu mayor tesoro. ¡Vamos juntos por más bienestar!',
    'Eres más fuerte de lo que crees, y cada paso cuenta. ¡Sigue adelante!',
    'No estás solo en este camino. ¡Estamos aquí para apoyarte siempre!',
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessageIndex(randomIndex);
    }, 7000); // Actualiza cada 7 segundos

    return () => clearInterval(intervalId);
  }, [messages.length]);

  return (
    <div className="py-3 flex justify-center gap-6 text-xs bg-vita-link font-black text-white">
      {messages[currentMessageIndex]}
    </div>
  );
}