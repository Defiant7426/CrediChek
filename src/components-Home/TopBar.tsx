import { useState, useEffect } from 'react';

export default function TopBar() {
  const messages = [
    'Cada día es una nueva oportunidad para mejorar tu historial crediticio. ¡Tú puedes, Luis!',
'Recuerda que tu solvencia es tu mayor tesoro. ¡Vamos juntos por una mejor calificación!',
'Eres más responsable de lo que crees, y cada pago cuenta. ¡Sigue adelante!',
'No estás solo en este camino financiero. ¡Estamos aquí para apoyarte siempre!',
'Tu esfuerzo por mantener tus finanzas en orden está marcando la diferencia. ¡Bravo, Luis!',
'La vida siempre tiene algo positivo para ofrecer. ¡Encuéntralo hoy!',
'Sonríe, porque cada día es una oportunidad para mejorar tu crédito. ¡Aprovecha el tuyo!',
'El cuidado de tus finanzas es un acto de responsabilidad. ¡Lo estás haciendo genial!',
'Confía en el proceso, cada pequeño pago importa.',
'Hoy es un buen día para sentirte orgulloso de tu responsabilidad financiera, ¡porque estás dando tu mejor esfuerzo!',
'Un día a la vez, un pago a la vez. ¡Estás logrando grandes cosas!',
'Tus metas financieras están más cerca de lo que piensas. ¡Sigue así!',
'Tu solvencia importa y merece toda tu atención. ¡Tú vales mucho!',
'Luis, tu responsabilidad inspira. ¡Nunca dejes de creer en ti mismo!',
'Recuerda, el cuidado de tus finanzas es una inversión en tu futuro. ¡Vamos por más!',
'La perseverancia siempre tiene recompensas. ¡Ya estás viendo los frutos!',
'Tu esfuerzo de hoy es la estabilidad financiera de mañana. ¡Estás en el camino correcto!',
'La felicidad también está en cuidar de tus finanzas. ¡Sigue así, Luis!',
'Cada paso que das te acerca a tus metas financieras. ¡No te detengas!',
'Tu dedicación a tu solvencia es admirable. ¡Sigue adelante!',
'Hoy es un buen día para cuidar de tus finanzas. ¡Tú lo vales!',
'Cada pequeño pago cuenta. ¡Estás haciendo un gran trabajo!',
'Tu solvencia es tu mayor riqueza. ¡Sigue invirtiendo en ti!',
'Cada esfuerzo suma, ¡sigue adelante!',
'Tu estabilidad financiera es una prioridad, ¡sigue cuidándote!',
'Recuerda que cada pago cuenta, ¡sigue avanzando!',
'Tu solvencia es tu mayor tesoro, ¡sigue cuidándola!',
'Cada día es una nueva oportunidad para mejorar tu historial crediticio. ¡Tú puedes!',
'Recuerda que tu solvencia es tu mayor tesoro. ¡Vamos juntos por una mejor calificación!',
'Eres más responsable de lo que crees, y cada pago cuenta. ¡Sigue adelante!',
'No estás solo en este camino financiero. ¡Estamos aquí para apoyarte siempre!',
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
    <div className="py-3 flex justify-center gap-6 text-xs bg-credi-check font-black text-white">
      {messages[currentMessageIndex]}
    </div>
  );
}