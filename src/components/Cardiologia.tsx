import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

export default function Cardiologia() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TopBar />
      <Header/>
      <div className={`w-full h-[2px] ${theme === 'dark' ? 'bg-[#1E4343]' : 'bg-black'}`}></div> 
      <div
        className={`w-full mx-auto mt-0 px-4 flex flex-col items-center py-14 ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`}
        style={{ flexGrow: 1, overflow: 'hidden' }}>
        {/* Introducción */}
        <h1 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>SERVICIO DE CARDIOLOGÍA</h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center" font-semibold text-5xl`}>
            Cuidando tu corazón con tecnología de punta
          </h2>
        </div>
        <div className="max-w-4xl py-6">
          <p className= {`${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center"`}>
            En VitaLink, nuestra prioridad es tu salud cardiovascular. Ofrecemos diagnósticos precisos, tratamientos avanzados y seguimiento personalizado
            con un equipo de especialistas altamente capacitados para garantizar tu bienestar.
          </p>
        </div>
      </div>

      {/* Video promocional */}
      <div className="relative">
        <div className="relative max-w-7xl py-96 mx-auto px-8 z-30">
          <div className="max-w-7xl text-white flex flex-col items-center mt-auto">
            <h1 className="text-6xl font-semibold leading-tight text-center">

            </h1>
          </div>
        </div>

        <div className="absolute top-0 z-20  w-full h-full"></div>

        <img
          src='https://vitalink.nyc3.cdn.digitaloceanspaces.com/nuevo.png'
          className="absolute top-0 z-10 w-auto min-w-full object-fill max-h-full max-w-none"
        >
          
        </img>
      </div>
      {/* Compromiso */}
    <div
      className={`max-w-full mx-auto px-4 flex flex-col items-center py-32 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-[#3B6363] to-[#001C1C] opacity-95'  // Colores más oscuros en tema oscuro
          : 'bg-gradient-to-b from-[#ffffff] to-[#058789] opacity-95'   // Colores claros en tema claro (de blanco a #058789)
      }`}
    >
      <h1
        className={`text-sm font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      >
        NUESTRO COMPROMISO
      </h1>
      <div className="space-y-3 flex flex-col items-center">
        <h2
          className={`text-5xl font-semibold max-w-xl text-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Tu salud cardiovascular es nuestra prioridad.
        </h2>
      </div>
      <div className="max-w-4xl py-6">
        <p
          className={`text-2xl text-center ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          Nuestro equipo de especialistas en cardiología está comprometido a ofrecerte atención integral y personalizada.
          Desde chequeos preventivos hasta tratamientos avanzados, en VitaLink estamos a tu lado en cada paso de tu recuperación.
        </p>
      </div>
    </div>

    {/* Beneficios del servicio */}
    <div
      className={`w-full mx-auto px-4 flex flex-col items-center py-14 ${
        theme === 'dark' 
          ? 'bg-gradient-to-b from-[#3B6363] to-[#001C1C] opacity-95'   // Colores más oscuros en tema oscuro
          : 'bg-gradient-to-b from-[#ffffff] to-[#058789] opacity-95'    // Colores claros en tema claro (de blanco a #058789)
      }`}
    >
      <h1
        className={`text-sm font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        }`}
      >
        ¿POR QUÉ ELEGIRNOS?
      </h1>
      <div className="space-y-3 flex flex-col items-center">
        <h2
          className={`text-5xl font-semibold max-w-xl text-center ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Atención de clase mundial en cardiología
        </h2>
      </div>
      <div className="max-w-4xl py-6 space-y-4">
        <p
          className={`text-2xl ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          ✔ Diagnósticos rápidos y precisos con la última tecnología.
        </p>
        <p
          className={`text-2xl ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          ✔ Equipo de especialistas con amplia experiencia.
        </p>
        <p
          className={`text-2xl ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          ✔ Tratamientos personalizados para cada paciente.
        </p>
        <p
          className={`text-2xl ${
            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
          }`}
        >
          ✔ Acompañamiento y seguimiento continuo.
        </p>
      </div>
    </div>
      
    {/* Call to Action */}
  <div
    className={`w-full mx-auto px-4 py-14 ${
      theme === 'dark'
        ? 'bg-[#001C1C] opacity-95'  // Fondo sólido oscuro en tema oscuro
        : 'bg-[#ffffff] opacity-95'   // Fondo blanco en tema claro
    } text-center`}
  >
    <h2
      className={`text-4xl font-semibold mb-8 ${
        theme === 'dark' ? 'text-white' : 'text-black'
      }`}
    >
      Confía en nuestros especialistas en pediatría. Agenda tu cita hoy.
    </h2>
    <a
      href="/chatcita"
      className={`bg-vita-link text-white py-4 px-6 rounded-full font-semibold text-lg hover:bg-vita-link-dark mt-8 ${
        theme === 'dark' ? 'hover:bg-vita-link-dark-dark' : 'hover:bg-vita-link-dark-light'
      }`}
    >
      Solicitar una cita
    </a>
  </div>
  {/* Eliminar o reducir el padding aquí */}
  <div className="py-0"> {/* Cambié 'py-14' a 'py-0' */}
    <Footer />
  </div>

    </>
  );
}
