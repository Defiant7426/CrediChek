import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

export default function Header() {
  const { theme } = useContext(ThemeContext);
  return (
    
<header
  className={`w-full flex items-center justify-between py-4 px-6 border-b-2 ${
    theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'
  }`}
>
  {/* Contenedor principal */}
  <div className="flex items-center w-full">
    {/* Botón Salir */}
    <div className="flex items-center">
      <a
        href="/home"
        className="bg-vita-link rounded-full p-3 hover:bg-vita-link-dark text-white text-sm font-bold"
      >
        Salir
      </a>
    </div>

    {/* Texto centrado */}
    <div className="flex-1 text-center">
      <h1 className="text-xl font-bold">Chat VitaLink</h1>
      <p className="text-sm text-gray-500">
        Hola Luis, estamos aquí para ayudarte a reservar tu cita médica
      </p>
    </div>

    {/* Logo en la derecha */}
    <div className="flex items-center">
      <img src="vitalink_logo.png" alt="Vitalink Logo" className="w-16 h-16 object-contain ml-4" />
    </div>
  </div>
</header>

  );
}
