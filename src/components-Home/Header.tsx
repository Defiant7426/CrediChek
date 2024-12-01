import { useState, useContext } from "react";
import { ThemeContext } from "../../ThemeContext";
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate(); 

  const [menuQuestOpen, setMenuQuestOpen] = useState(false);
  const [menuEspecialidadesOpen, setMenuEspecialidadesOpen] = useState(false);
  const [menuModulosOpen, setMenuModulosOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);


  // Clases dinámicas basadas en el tema
  const headerClasses = theme === "dark" ? "bg-[#152C2C] text-white" : "bg-white text-black";

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate('/login')
  };

  return (
    <header
      className={`${headerClasses} transition-colors duration-300 shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <a href="/home">
          <img src="https://vitalink.nyc3.cdn.digitaloceanspaces.com/CrediChek_logoCompleto.png" alt="CrediCheck Logo" className="w-24" />
        </a>

        {/* Navegación */}
        <nav className="relative flex items-center gap-6">
          {/*Menu "modulos"*/}
          
          {/* Menú "Citas" */}
          <div
            className="relative"
            onMouseEnter={() => setMenuQuestOpen(true)}
            onMouseLeave={() => setMenuQuestOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Citas</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  menuQuestOpen
                    ? "text-credi-check rotate-180 duration-300"
                    : "text-gray-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {menuQuestOpen && (
              <div
              className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50"
            >
              <a
                href="/cuestionarCita"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Nueva Cita
              </a>
              <a
                href="/citasPendientes"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Citas Pendientes
              </a>
              <a
                href="/historialCitas"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Historial de Citas
              </a>
            </div>
            )}
          </div>

          {/* Menú "Especialidades" */}
          <div
            className="relative"
            onMouseEnter={() => setMenuEspecialidadesOpen(true)}
            onMouseLeave={() => setMenuEspecialidadesOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Especialidades</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  menuEspecialidadesOpen
                    ? "text-credi-check rotate-180 duration-300"
                    : "text-gray-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {menuEspecialidadesOpen && (
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
              <a
                href="/cardiologia"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Cardiología
              </a>
              <a
                href="/pediatria"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Pediatría
              </a>
              <a
                href="/dermatologia"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              >
                Dermatología
              </a>
            </div>
            
            )}
          </div>

          {/* Menú "Módulos" */}
        <div
            className="relative"
            onMouseEnter={() => setMenuModulosOpen(true)}
            onMouseLeave={() => setMenuModulosOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer">
              <span>Módulos</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 ${
                  menuModulosOpen
                    ? "text-credi-check rotate-180 duration-300"
                    : "text-gray-500"
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {menuModulosOpen && (
              <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md py-2 z-50">
                <a
                  href="/resumenConsultas"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Resumen de Consultas
                </a>
                <a
                  href="/chatImagen"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Prescripción de Medicamentos
                </a>
              </div>
            )}
          </div>
        </nav>

      
        {/* Barra lateral derecha */}
<div className="flex items-center gap-4">
  {/* Perfil 
  <a href="/perfil" className="hover:text-vita-link">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  </a>*/}

      {/* Botón para alternar el tema */}

      <button
  onClick={toggleTheme}
  className={`p-2 rounded-full border ${
    theme === "light"
      ? "bg-white border-gray-400 hover:bg-gray-100"
      : "bg-gray-700 border-gray-700 hover:bg-gray-600"
  }`}
>
  {theme === "light" ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-yellow-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {/* Fondo del círculo del sol */}
      <circle cx="12" cy="12" r="5" fill="white" stroke="currentColor" />
      <line x1="12" y1="1" x2="12" y2="4" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="23" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" strokeLinecap="round" />
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" strokeLinecap="round" />
      <line x1="1" y1="12" x2="4" y2="12" strokeLinecap="round" />
      <line x1="20" y1="12" x2="23" y2="12" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" strokeLinecap="round" />
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" strokeLinecap="round" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-gray-400"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M9.37 5.51a7 7 0 1010.67 10.67A8.07 8.07 0 019.37 5.51z" />
    </svg>
  )}
</button>



    
      {/* Botón de cierre de sesión */}
      <button
        onClick={handleLogout}
        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"
          />
        </svg>
      </button>
    </div>

      </div>
    </header>
  );
}
