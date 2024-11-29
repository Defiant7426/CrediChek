import { useContext } from 'react';
import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import Footer from "./Footer";
import { ThemeContext } from "../../ThemeContext";

export default function TermsAndConditions() {
  const { theme } = useContext(ThemeContext);

  const footerClasses = theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black';

  return (
    <>
      <TopBar />
      <Header />
      <div className={`${footerClasses} border-t border-gray-300 pt-10 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>
          <p className="mb-4">
            Bienvenido a nuestra página de Términos y Condiciones. Estos términos y
            condiciones describen las reglas y regulaciones para el uso del sitio
            web de nuestra compañía.
          </p>
          <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
          <p className="mb-4">
            Al acceder a este sitio web, asumimos que aceptas estos términos y
            condiciones en su totalidad. No continúes usando el sitio web si no
            aceptas todos los términos y condiciones establecidos en esta página.
          </p>
          <h2 className="text-2xl font-semibold mb-4">2. Licencia</h2>
          <p className="mb-4">
            A menos que se indique lo contrario, nuestra compañía y/o sus
            licenciantes poseen los derechos de propiedad intelectual de todo el
            material en el sitio web. Todos los derechos de propiedad intelectual
            están reservados. Puedes ver y/o imprimir páginas del sitio web para tu
            uso personal sujeto a las restricciones establecidas en estos términos y
            condiciones.
          </p>
          <h2 className="text-2xl font-semibold mb-4">3. Restricciones</h2>
          <p className="mb-4">
            No debes:
            <ul className="list-disc list-inside ml-4">
              <li>Republicar material del sitio web</li>
              <li>Vender, alquilar o sublicenciar material del sitio web</li>
              <li>Reproducir, duplicar o copiar material del sitio web</li>
              <li>Redistribuir contenido del sitio web</li>
            </ul>
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            4. Hipervínculos a nuestro contenido
          </h2>
          <p className="mb-4">
            Las siguientes organizaciones pueden enlazar a nuestro sitio web sin
            aprobación previa por escrito:
            <ul className="list-disc list-inside ml-4">
              <li>Agencias gubernamentales</li>
              <li>Motores de búsqueda</li>
              <li>Organizaciones de noticias</li>
            </ul>
          </p>
          <p className="mb-4">
            Estas organizaciones pueden enlazar a nuestra página de inicio, a
            publicaciones o a otra información del sitio web siempre que el enlace:
            (a) no sea engañoso de ninguna manera; (b) no implique falsamente
            patrocinio, respaldo o aprobación de la parte que enlaza y sus productos
            o servicios; y (c) encaje dentro del contexto del sitio de la parte que
            enlaza.
          </p>
          <h2 className="text-2xl font-semibold mb-4">5. Reserva de Derechos</h2>
          <p className="mb-4">
            Nos reservamos el derecho de solicitar que elimines todos los enlaces o
            cualquier enlace en particular a nuestro sitio web. Apruebas eliminar de
            inmediato todos los enlaces a nuestro sitio web a solicitud. También nos
            reservamos el derecho de enmendar estos términos y condiciones y su
            política de enlaces en cualquier momento. Al continuar enlazando a
            nuestro sitio web, aceptas estar obligado y seguir estos términos y
            condiciones de enlace.
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            6. Eliminación de enlaces de nuestro sitio web
          </h2>
          <p className="mb-4">
            Si encuentras algún enlace en nuestro sitio web o cualquier sitio web
            vinculado objetable por cualquier motivo, puedes contactarnos al
            respecto. Consideraremos solicitudes para eliminar enlaces, pero no
            estamos obligados a hacerlo ni a responder directamente.
          </p>
          <p className="mb-4">
            No aseguramos que la información en este sitio web sea correcta, no
            garantizamos su integridad o exactitud; tampoco prometemos asegurar que
            el sitio web permanezca disponible o que el material en el sitio web se
            mantenga actualizado.
          </p>
          <h2 className="text-2xl font-semibold mb-4">
            7. Descargo de responsabilidad
          </h2>
          <p className="mb-4">
            En la medida máxima permitida por la ley aplicable, excluimos todas las
            representaciones, garantías y condiciones relacionadas con nuestro sitio
            web y el uso de este sitio web. Nada en este descargo de
            responsabilidad:
            <ul className="list-disc list-inside ml-4">
              <li>
                Limitará o excluirá nuestra o tu responsabilidad por muerte o
                lesiones personales resultantes de negligencia;
              </li>
              <li>
                Limitará o excluirá nuestra o tu responsabilidad por fraude o
                tergiversación fraudulenta;
              </li>
              <li>
                Limitará cualquiera de nuestras o tus responsabilidades de cualquier
                manera que no esté permitida por la ley aplicable; o
              </li>
              <li>
                Excluirá cualquiera de nuestras o tus responsabilidades que no
                puedan ser excluidas bajo la ley aplicable.
              </li>
            </ul>
          </p>
          <p className="mb-4">
            Las limitaciones y prohibiciones de responsabilidad establecidas en esta
            Sección y en otras partes de este descargo de responsabilidad: (a) están
            sujetas al párrafo anterior; y (b) regirán todas las responsabilidades
            que surjan bajo el descargo de responsabilidad, incluidas las
            responsabilidades que surjan en contrato, en agravio y por
            incumplimiento de obligaciones legales.
          </p>
          <p className="mb-4">
            Siempre que el sitio web y la información y servicios en el sitio web se
            proporcionen de forma gratuita, no seremos responsables de ninguna
            pérdida o daño de cualquier naturaleza.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}