// Dermatologia
import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

export default function Dermatologia() {
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
        <h1 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>SERVICIO DE DERMATOLOGÍA</h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center font-semibold text-5xl`}>
            Cuidamos tu piel con los mejores tratamientos
          </h2>
        </div>
        <div className="max-w-4xl py-6">
          <p className={ `${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center`}>
            En VitaLink, nos especializamos en el cuidado de la piel. Ofrecemos diagnósticos precisos, tratamientos avanzados
            y asesoramiento experto para mantener tu piel sana y radiante.
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
            ? 'bg-gradient-to-b from-[#3B6363] to-[#001C1C] opacity-95'
            : 'bg-gradient-to-b from-[#ffffff] to-[#058789] opacity-95'
        }`}
      >
        <h1 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>NUESTRO COMPROMISO</h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2 className={`text-5xl font-semibold max-w-xl text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Tu piel, nuestra prioridad.
          </h2>
        </div>
        <div className="max-w-4xl py-6">
          <p className={`text-2xl text-center ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            Desde condiciones crónicas hasta tratamientos estéticos, nuestro equipo de dermatólogos está comprometido
            a brindarte la mejor atención para el cuidado de tu piel.
          </p>
        </div>
      </div>

      {/* Beneficios del servicio */}
      <div
        className={`w-full mx-auto px-4 flex flex-col items-center py-14 ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#3B6363] to-[#001C1C] opacity-95'
            : 'bg-gradient-to-b from-[#ffffff] to-[#058789] opacity-95'
        }`}
      >
        <h1 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>¿POR QUÉ ELEGIRNOS?</h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2 className={`text-5xl font-semibold max-w-xl text-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Atención dermatológica de excelencia
          </h2>
        </div>
        <div className="max-w-4xl py-6 space-y-4">
          <p className={`text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            ✔ Tratamientos innovadores para todas las condiciones de la piel.
          </p>
          <p className={`text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            ✔ Diagnósticos rápidos y precisos.
          </p>
          <p className={`text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            ✔ Especialistas con amplia experiencia.
          </p>
          <p className={`text-2xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
            ✔ Acompañamiento integral en cada paso del tratamiento.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className={`w-full mx-auto px-4 py-14 ${
          theme === 'dark' ? 'bg-[#001C1C] opacity-95' : 'bg-[#ffffff] opacity-95'
        } text-center`}
      >
        <h2 className={`text-4xl font-semibold mb-8 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
          Cuida tu piel con los mejores especialistas. Agenda tu cita.
        </h2>
        <a
          href="/cuestionarCita"
          className={`bg-vita-link text-white py-4 px-6 rounded-full font-semibold text-lg hover:bg-vita-link-dark mt-8 ${
            theme === 'dark' ? 'hover:bg-vita-link-dark-dark' : 'hover:bg-vita-link-dark-light'
          }`}
        >
          Solicitar una cita
        </a>
      </div>

      <div className="py-0">
        <Footer />
      </div>
    </>
  );
}
