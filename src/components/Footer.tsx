

import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext";

export default function Footer() {
  // Consumir el contexto del tema
  const { theme } = useContext(ThemeContext);

  // Clases dinámicas basadas en el tema
  const footerClasses = theme === 'dark' ? 'bg-[#152C2C] text-white' : 'bg-white text-black';
  const linkClasses = theme === 'dark' ? 'hover:text-credi-check hover:underline underline-offset-4 decoration-vita-link' : 'hover:text-credi-check hover:underline underline-offset-4 decoration-vita-link';

  return (
    <footer className={`${footerClasses} border-t border-gray-300 pt-10 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto text-sm ">
        <div className="grid grid-cols-5 gap-6">
          <div>
            <div className="mb-10">
              <img src="https://vitalink.nyc3.cdn.digitaloceanspaces.com/CrediChek_dibujo.png" alt="Vitalink Logo" className="w-28" />
            </div>

            <div className="flex items-center gap-5 ">
              {/* Iconos de redes sociales */}
              {/* Asegúrate de que los iconos también cambien de color si es necesario */}
              <a href="#">

                <img className="_8h4h img hover:filter hover:brightness-200 hover:saturate-200 hover:-hue-rotate-90 bg-white rounded-full" src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.8562-6/275949698_3248957128655833_369430323747988984_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=VMiootYWiykQ7kNvgG6VOXE&amp;_nc_oc=AdgJqBzWdirLF8ed7pvpRMH4SBQ0cVaY74zmQ7KB5aZ04KYymyYydylxI4EKxb0eOmsieIKaPr-pk5W8HEPYD0-X&amp;_nc_zt=14&amp;_nc_ht=scontent-lim1-1.xx&amp;_nc_gid=ATSYVOzAEhHhmL7-lI0qDpc&amp;oh=00_AYDEIjesR4HiAwU2MNeJVc9IU5ATFgVgdqcIoRuzHn_FWw&amp;oe=674ACF2E" height="24" width="24" alt="Icono de Facebook" id="u_0_k_zu"
                />

              </a>

              <a href="#">

                <img className="_8h4h img hover:filter hover:brightness-200 hover:saturate-200 hover:-hue-rotate-90 bg-white rounded-full" src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.8562-6/276079790_239645664974434_7595452976573962628_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=jcbkbQnI9IMQ7kNvgHBkDgB&amp;_nc_oc=AdjPeOifXckAnvQD20e9Xpz-d76o8_W4Jzpt9wfikqoVFNdbpGsFTzhQKfwrbU-1CVw35PwSLlMxXCDLFvqVbZu1&amp;_nc_zt=14&amp;_nc_ht=scontent-lim1-1.xx&amp;_nc_gid=ATSYVOzAEhHhmL7-lI0qDpc&amp;oh=00_AYD3lKMssNEltuNWo-fsLHthN1p9xtlqAhQalBvfjMH4YQ&amp;oe=674AE1F1" height="24" width="24" alt="Icono de Instagram" id="u_0_l_0B"/>

              </a>

              <a href="#">

                <img className="_8h4h img hover:filter hover:brightness-200 hover:saturate-200 hover:-hue-rotate-90 bg-white rounded-full" src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.8562-6/276008099_472069827986519_2757774944745661943_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=bNX8GTgXnm8Q7kNvgFkSSPP&amp;_nc_oc=AdgwW2TGp9DIVOCOIeuS44SjtIXP6qo7xz2AJpz3_ejnOEw6ovC5yldCErAt7gamWiFn9r_nr64yYrWcxN_Vv0Mj&amp;_nc_zt=14&amp;_nc_ht=scontent-lim1-1.xx&amp;_nc_gid=ATSYVOzAEhHhmL7-lI0qDpc&amp;oh=00_AYD2UN8ip9SC3MYNaKPpp757IPQ7Rqu48M-cZtpBWUwZrQ&amp;oe=674AE5E5" height="24" width="24" alt="Icono de YouTube" id="u_0_n_0m"/>

              </a>

              <a href="#">

              <img className="_8h4h img hover:filter hover:brightness-200 hover:saturate-200 hover:-hue-rotate-90 bg-white rounded-full" src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.8562-6/434686573_965393648261200_4295680538668886162_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=Ctc5IxBKGToQ7kNvgGH6mM3&amp;_nc_oc=Adg5ldi3d--_LRkJjtzfUQwI0V-0TlAuPmnSio1bWBV6wSbBumBpsPcixpSFw3oA-90Cn21QZp6Vmt-1UDnmCbU6&amp;_nc_zt=14&amp;_nc_ht=scontent-lim1-1.xx&amp;_nc_gid=ATSYVOzAEhHhmL7-lI0qDpc&amp;oh=00_AYAT2DqLQj9LNanw86LryW-neUiOMK2hyCbul0O3vMKHJQ&amp;oe=674ABFA1" height="24" width="24" alt="Icono de Twitter" id="u_0_o_2w"/>

              </a>

              <a href="#">
              <img className="_8h4h img hover:filter hover:brightness-200 hover:saturate-200 hover:-hue-rotate-90 bg-white rounded-full " src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.8562-6/275775241_706660317361134_8955597739986331891_n.png?_nc_cat=1&amp;ccb=1-7&amp;_nc_sid=f537c7&amp;_nc_ohc=R5XiWGkv0SMQ7kNvgGEz18X&amp;_nc_oc=AdiK3bEs13zO_e6xV8-sGgo39_OZLhO4ftd_xArOm4wlwpcoysBYx0cSrQjr1YzonrF21tu4K-cvTKgU-4Vbb_VE&amp;_nc_zt=14&amp;_nc_ht=scontent-lim1-1.xx&amp;_nc_gid=ATSYVOzAEhHhmL7-lI0qDpc&amp;oh=00_AYDNXseXBAwa0kZTW2ADNZFhvMHeT5RzpZR2C_tne0tVlg&amp;oe=674AEE82" height="24" width="24" alt="Icono de LinkedIn" id="u_0_p_tN"/>
              </a>
              
              {/* Agrega los demás iconos de manera similar */}
            </div>

            <p className="py-4 font-bold">© 2024 Empresa, S.A. Todos los derechos reservados.</p>
          </div>

          <div></div>

          <div className={`space-y-3 font-medium mt-14 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
            <p><a href="/terminos" className={linkClasses}>Términos y Condiciones</a></p>
            <p><a href="/informacion" className={linkClasses}>Sobre Nosotros</a></p>
            <p><a href="/contacto" className={linkClasses}>Contactenos</a></p>
          </div>

          <div className={`space-y-3 font-medium mt-14 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'}`}>
            {/*<p><a href="#" className={linkClasses}>Nuestros Especialistas</a></p>*/}
            <p><a href="/creadores" className={linkClasses}>Creadores</a></p>
            <p><a href="/preguntasFrecuentes" className={linkClasses}>Preguntas Frecuentes</a></p>
          </div>


        </div>
      </div>
    </footer>
  );
}