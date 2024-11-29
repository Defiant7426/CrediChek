import { useContext } from 'react';
import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import Footer from "./Footer";
import { ThemeContext } from "../../ThemeContext";

export default function ContactUs() {

    const { theme } = useContext(ThemeContext);

  const footerClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';
  return (
    <>
      <TopBar />
      <Header />
      <div className={`${footerClasses} border-t border-gray-300 pt-10 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Contáctenos</h1>
          <p className="mb-4">
            Si tienes alguna pregunta o necesitas más información, no dudes en ponerte en contacto con nosotros a través de los siguientes medios:
          </p>
          <h2 className="text-2xl font-semibold mb-4">Información de Contacto</h2>
          <p className="mb-4">
            <strong>Dirección:</strong> Lima 123, San Isidro, Perú
          </p>
          <p className="mb-4">
            <strong>Teléfono:</strong> +123 456 7890
          </p>
          <p className="mb-4">
            <strong>Email:</strong> vitalink@salud.com
          </p>
          <h2 className="text-2xl font-semibold mb-4">Formulario de Contacto</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Nombre</label>
              <input type="text" id="name" className="w-full border border-gray-300 p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input type="email" id="email" className="w-full border border-gray-300 p-2 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">Mensaje</label>
              <textarea id="message" className="w-full border border-gray-300 p-2 rounded-md" rows={4}></textarea>
            </div>
            <button type="submit" className="bg-vita-link text-white py-2 px-4 rounded-md hover:bg-vita-link-dark">Enviar</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}
