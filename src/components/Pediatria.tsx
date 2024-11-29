import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';
import Footer from './Footer';
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';

export default function Pediatria() {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TopBar />
      <Header />
      <div className={`w-full h-[2px] ${theme === 'dark' ? 'bg-[#1E4343]' : 'bg-black'}`}></div>
      <div
        className={`w-full mx-auto mt-0 px-4 flex flex-col items-center py-14 ${theme === 'dark' ? 'bg-[#1E4343] text-white' : 'bg-white text-black'}`}
        style={{ flexGrow: 1, overflow: 'hidden' }}>
        {/* Introducción */}
        <h1 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>SERVICIO DE PEDIATRÍA</h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2 className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center font-semibold text-5xl`}>
            Cuidamos a los más pequeños con amor y profesionalismo
          </h2>
        </div>
        <div className="max-w-4xl py-6">
          <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-slate-700 text-center`}>
            En VitaLink, sabemos lo importante que es la salud de tus hijos. Por eso, ofrecemos una atención integral y personalizada
            para garantizar su bienestar en cada etapa de su crecimiento.
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
        <h1
          className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        >
          NUESTRO COMPROMISO
        </h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2
            className={`text-5xl font-semibold max-w-xl text-center ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Tu hijo merece la mejor atención pediátrica.
          </h2>
        </div>
        <div className="max-w-4xl py-6">
          <p
            className={`text-2xl text-center ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            Nuestro equipo de pediatras está dedicado a garantizar la salud de tus hijos con un enfoque cálido y profesional.
            Desde chequeos preventivos hasta atención especializada, estamos aquí para ellos.
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
        <h1
          className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
        >
          ¿POR QUÉ ELEGIRNOS?
        </h1>
        <div className="space-y-3 flex flex-col items-center">
          <h2
            className={`text-5xl font-semibold max-w-xl text-center ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            Atención de clase mundial en pediatría
          </h2>
        </div>
        <div className="max-w-4xl py-6 space-y-4">
          <p
            className={`text-2xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            ✔ Chequeos médicos preventivos para tus hijos.
          </p>
          <p
            className={`text-2xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            ✔ Atención cálida y especializada.
          </p>
          <p
            className={`text-2xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            ✔ Asesoramiento para padres sobre el cuidado infantil.
          </p>
          <p
            className={`text-2xl ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
            }`}
          >
            ✔ Seguimiento personalizado y continuo.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div
        className={`w-full mx-auto px-4 py-14 ${
          theme === 'dark'
            ? 'bg-[#1E4343] text-white'
            : 'bg-[#ffffff] text-black'
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
          href="/cuestionarCita"
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

