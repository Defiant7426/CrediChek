import { useContext } from 'react';
import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import Footer from "./Footer";
import { ThemeContext } from "../../ThemeContext";

export default function PreguntasFrecuentes() {
  const { theme } = useContext(ThemeContext);

  const footerClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <>
      <TopBar />
      <Header />
      <div className={`${footerClasses} border-t border-gray-300 pt-10 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h1>

          <h2 className="text-2xl font-semibold mb-4">1. ¿Qué servicios ofrece la clínica Vitalink?</h2>
          <p className="mb-4">
            En Vitalink ofrecemos una amplia gama de servicios médicos, incluyendo atención primaria, consultas especializadas, tratamientos de fisioterapia, y exámenes de diagnóstico, entre otros.
          </p>

          <h2 className="text-2xl font-semibold mb-4">2. ¿Cómo puedo agendar una cita?</h2>
          <p className="mb-4">
            Puedes agendar una cita a través de nuestra página web hablando con la IA o hacerlo manualmente, llamando a nuestro número de contacto o visitando nuestras instalaciones.
          </p>

          <h2 className="text-2xl font-semibold mb-4">3. ¿Aceptan seguros médicos?</h2>
          <p className="mb-4">
            Sí, trabajamos con varios seguros médicos. Por favor, contacta con nosotros para confirmar si tu seguro está cubierto en nuestra clínica.
          </p>

          <h2 className="text-2xl font-semibold mb-4">4. ¿Cuáles son los horarios de atención?</h2>
          <p className="mb-4">
            Nuestro horario de atención es de lunes a viernes de 8:00 a 18:00 horas. Los sábados atendemos de 8:00 a 14:00 horas.
          </p>

          <h2 className="text-2xl font-semibold mb-4">5. ¿Cómo puedo obtener los resultados de mis exámenes?</h2>
          <p className="mb-4">
            Los resultados de tus exámenes estarán disponibles en nuestra plataforma en línea o puedes solicitarlos directamente en la clínica.
          </p>

          <h2 className="text-2xl font-semibold mb-4">6. ¿Ofrecen atención de urgencias?</h2>
          <p className="mb-4">
            Sí, contamos con un servicio de urgencias disponible las 24 horas para cualquier emergencia médica.
          </p>

          <h2 className="text-2xl font-semibold mb-4">7. ¿Qué debo llevar para mi consulta?</h2>
          <p className="mb-4">
            Para tu consulta, por favor trae tu documento de identidad, tu seguro médico (si aplica), y cualquier historial médico relevante.
          </p>

          <h2 className="text-2xl font-semibold mb-4">8. ¿Tienen estacionamiento?</h2>
          <p className="mb-4">
            Sí, contamos con estacionamiento gratuito para nuestros pacientes.
          </p>

          <h2 className="text-2xl font-semibold mb-4">9. ¿Puedo cancelar o reprogramar mi cita?</h2>
          <p className="mb-4">
            Sí, puedes cancelar o reprogramar tu cita con al menos 24 horas de antelación sin cargos adicionales.
          </p>

          <h2 className="text-2xl font-semibold mb-4">10. ¿Qué medidas de seguridad tienen contra el COVID-19?</h2>
          <p className="mb-4">
            En Vitalink seguimos todos los protocolos de seguridad recomendados para garantizar la salud de nuestros pacientes y personal. Esto incluye desinfección constante de nuestras instalaciones y el uso obligatorio de mascarillas.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
