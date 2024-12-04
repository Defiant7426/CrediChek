import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Header from "../components-Home/Header";
import Footer from "./Footer";
import axios from 'axios';

const RiskForm = () => {
  const navigate = useNavigate();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    dob: null,
    email: '',
    maritalStatus: '',
    address: '',
    numberOfChildren: 0,
    codigo_genero: '',
    numero_miembros_familia: 0,
    edad: 0,
    nivel_educativo: '',
    tipo_vivienda: '',
  });

  const [jobInfo, setJobInfo] = useState({
    employer: '',
    salary: '',
    position: '',
    jobTenure: '',
    contractType: '',
    tipo_ocupacion: '',
    anios_empleo: 0,
  });

  const [financialInfo, setFinancialInfo] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    currentDebts: '',
    propietario_vehiculo: '',
    propietario_propiedad: '',
    ingreso_total: 0,
    tipo_ingreso: '',
    monto_credito: 0,
    monto_anualidad: 0,
    precio_bienes: 0,
  });

  const [adeudos, setAdeudos] = useState({
    fuente_externa_2: '',
    fuente_externa_3: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  // Funciones de Validación Mejoradas
  const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
  const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);

  const isPersonalInfoComplete = 
    isNonEmptyString(personalInfo.name) &&
    personalInfo.dob !== null &&
    isNonEmptyString(personalInfo.email) &&
    isNonEmptyString(personalInfo.maritalStatus) &&
    isNonEmptyString(personalInfo.address) &&
    isNonEmptyString(personalInfo.codigo_genero) &&
    isValidNumber(personalInfo.numero_miembros_familia) &&
    isValidNumber(personalInfo.edad) &&
    isNonEmptyString(personalInfo.nivel_educativo) &&
    isNonEmptyString(personalInfo.tipo_vivienda);

  const isJobInfoComplete = 
    // isNonEmptyString(jobInfo.employer) &&
    // isValidNumber(jobInfo.salary) &&
    // isNonEmptyString(jobInfo.position) &&
    // isNonEmptyString(jobInfo.jobTenure) &&
    isNonEmptyString(jobInfo.contractType) &&
    isNonEmptyString(jobInfo.tipo_ocupacion) &&
    isValidNumber(jobInfo.anios_empleo);

  const isFinancialInfoComplete = 
    // isValidNumber(financialInfo.monthlyIncome) &&
    // isValidNumber(financialInfo.monthlyExpenses) &&
    // isValidNumber(financialInfo.currentDebts) &&
    isNonEmptyString(financialInfo.propietario_vehiculo) &&
    isNonEmptyString(financialInfo.propietario_propiedad) &&
    isValidNumber(financialInfo.ingreso_total) &&
    isNonEmptyString(financialInfo.tipo_ingreso) &&
    isValidNumber(financialInfo.monto_credito) &&
    isValidNumber(financialInfo.monto_anualidad) &&
    isValidNumber(financialInfo.precio_bienes);

  const isAdeudosComplete = 
    isNonEmptyString(adeudos.fuente_externa_2) &&
    isNonEmptyString(adeudos.fuente_externa_3);

  const handleNextPage = async () => {
    if (currentPage === 1 && !isPersonalInfoComplete) {
      Swal.fire('Por favor, completa la información personal.');
      return;
    }
    if (currentPage === 2 && !isJobInfoComplete) {
      Swal.fire('Por favor, completa la información laboral.');
      return;
    }
    if (currentPage === 3 && !isFinancialInfoComplete) {
      Swal.fire('Por favor, completa la información financiera.');
      return;
    }
    if (currentPage === 4 && !isAdeudosComplete) {
      Swal.fire('Por favor, completa la sección de Adeudos.');
      return;
    }

    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
    } else {
      const dataToSend = {
        codigo_genero: personalInfo.codigo_genero,
        numero_hijos: personalInfo.numberOfChildren,
        estado_civil: personalInfo.maritalStatus,
        numero_miembros_familia: personalInfo.numero_miembros_familia,
        ingreso_total: financialInfo.ingreso_total,
        tipo_ingreso: financialInfo.tipo_ingreso,
        nivel_educativo: personalInfo.nivel_educativo,
        tipo_ocupacion: jobInfo.tipo_ocupacion,
        propietario_vehiculo: financialInfo.propietario_vehiculo,
        propietario_propiedad: financialInfo.propietario_propiedad,
        tipo_vivienda: personalInfo.tipo_vivienda,
        tipo_contrato: jobInfo.contractType,
        monto_credito: financialInfo.monto_credito,
        monto_anualidad: financialInfo.monto_anualidad,
        precio_bienes: financialInfo.precio_bienes,
        fuente_externa_2: adeudos.fuente_externa_2 === "Sí" ? 0.234 : 0.732,
        fuente_externa_3: adeudos.fuente_externa_3 === "Sí" ? 0.234 : 0.732,
        edad: personalInfo.edad,
        anios_empleo: jobInfo.anios_empleo,
      };

      // try {
      //   const response = await axios.post('http://127.0.0.1:8000/predict', dataToSend);
      //   const { prediccion, probabilidad } = response.data;
      //   Swal.fire({
      //     title: 'Predicción',
      //     html: `Predicción: ${prediccion}<br>Probabilidad: ${probabilidad}`,
      //     icon: 'success'
      //   });
      //   navigate('/resultado');
      // } catch (error) {
      //   console.error('Error al enviar los datos:', error);
      //   Swal.fire('Error al enviar los datos a la API.', '', 'error');
      // }
      console.log("Datos de entrada: ", dataToSend);
      try {
        const response = await axios.post('http://127.0.0.1:8000/predict', dataToSend);
        const { consulta_sql } = response.data;
        Swal.fire({
          title: 'Consulta SQL',
          html: `Consulta SQL: ${consulta_sql}`,
          icon: 'success'
        });
        navigate('/resultado');
      } catch (error) {
        console.error('Error al enviar los datos:', error);
        Swal.fire('Error al enviar los datos a la API.', '', 'error');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="form-container max-w-7xl py-32 mx-auto px-8">
        <h2 className="text-3xl font-bold mb-8">Formulario de Riesgo Crediticio</h2>

        {currentPage === 1 && (
          <div className="personal-info space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Información Personal</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Nombre"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
            />
            <DatePicker
              className="w-full p-2 border border-gray-300 rounded"
              selected={personalInfo.dob}
              onChange={(date) => setPersonalInfo({ ...personalInfo, dob: date })}
              placeholderText="Fecha de Nacimiento"
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="email"
              placeholder="Correo Electrónico"
              value={personalInfo.email}
              onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={personalInfo.maritalStatus}
              onChange={(e) => setPersonalInfo({ ...personalInfo, maritalStatus: e.target.value })}
            >
              <option value="">Estado Civil</option>
              <option value="soltero">Soltero</option>
              <option value="casado">Casado</option>
              <option value="matrimonio civil">Matrimonio Civil</option>
              <option value="viudo">Viudo</option>
              <option value="separado">Separado</option>
              <option value="desconocido">Desconocido</option>
            </select>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Dirección de Residencia"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={personalInfo.numberOfChildren}
              onChange={(e) => setPersonalInfo({ ...personalInfo, numberOfChildren: parseInt(e.target.value) })}
            >
              <option value={0}>Número de Hijos</option>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            {/* Nuevos campos de Información Personal */}
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={personalInfo.codigo_genero}
              onChange={(e) => setPersonalInfo({ ...personalInfo, codigo_genero: e.target.value })}
            >
              <option value="">Género</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Número de Miembros de la Familia"
              value={personalInfo.numero_miembros_familia}
              onChange={(e) => setPersonalInfo({ ...personalInfo, numero_miembros_familia: parseInt(e.target.value) })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Edad"
              value={personalInfo.edad}
              onChange={(e) => setPersonalInfo({ ...personalInfo, edad: parseInt(e.target.value) })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={personalInfo.nivel_educativo}
              onChange={(e) => setPersonalInfo({ ...personalInfo, nivel_educativo: e.target.value })}
            >
              <option value="">Nivel Educativo</option>
              <option value="secundaria completa">Secundaria Completa</option>
              <option value="educación superior">Educación Superior</option>
              <option value="superior incompleto">Superior Incompleto</option>
              <option value="secundaria baja">Secundaria Baja</option>
              <option value="grado académico">Grado Académico</option>
            </select>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={personalInfo.tipo_vivienda}
              onChange={(e) => setPersonalInfo({ ...personalInfo, tipo_vivienda: e.target.value })}
            >
              <option value="">Tipo de Vivienda</option>
              <option value="casa/apartamento">Casa/Apartamento</option>
              <option value="apartamento alquilado">Apartamento Alquilado</option>
              <option value="con padres">Con Padres</option>
              <option value="apartamento municipal">Apartamento Municipal</option>
              <option value="apartamento en oficina">Apartamento en Oficina</option>
              <option value="apartamento en cooperativa">Apartamento en Cooperativa</option>
            </select>
          </div>
        )}

        {currentPage === 2 && (
          <div className="job-info space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Información Laboral</h3>
            
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Antigüedad en el Trabajo"
              value={jobInfo.jobTenure}
              onChange={(e) => setJobInfo({ ...jobInfo, jobTenure: e.target.value })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={jobInfo.contractType}
              onChange={(e) => setJobInfo({ ...jobInfo, contractType: e.target.value })}
            >
              <option value="">Tipo de Contrato</option>
              <option value="préstamos en efectivo">Préstamos en Efectivo</option>
              <option value="préstamos rotativos">Préstamos Rotativos</option>
            </select>
            {/* Nuevos campos de Información Laboral */}
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={jobInfo.tipo_ocupacion}
              onChange={(e) => setJobInfo({ ...jobInfo, tipo_ocupacion: e.target.value })}
            >
              <option value="">Tipo de Ocupación</option>
              <option value="trabajadores">Trabajadores</option>
              <option value="personal principal">Personal Principal</option>
              <option value="contadores">Contadores</option>
              <option value="gerentes">Gerentes</option>
              <option value="nulo">Nulo</option>
              <option value="conductores">Conductores</option>
              <option value="personal de ventas">Personal de Ventas</option>
              <option value="personal de limpieza">Personal de Limpieza</option>
              <option value="personal de cocina">Personal de Cocina</option>
              <option value="personal de servicio privado">Personal de Servicio Privado</option>
              <option value="personal de medicina">Personal de Medicina</option>
              <option value="personal de seguridad">Personal de Seguridad</option>
              <option value="personal técnico alta habilidad">Personal Técnico Alta Habilidad</option>
              <option value="personal de mozo bar">Personal de Mozo Bar</option>
              <option value="trabajadores baja habilidad">Trabajadores Baja Habilidad</option>
              <option value="agentes inmobiliarios">Agentes Inmobiliarios</option>
              <option value="secretarias">Secretarias</option>
              <option value="personal de TI">Personal de TI</option>
              <option value="personal de RRHH">Personal de RRHH</option>
            </select>
          </div>
        )}

        {currentPage === 3 && (
          <div className="financial-info space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Información Financiera</h3>
            
            {/* Nuevos campos de Información Financiera */}
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={financialInfo.propietario_vehiculo}
              onChange={(e) => setFinancialInfo({ ...financialInfo, propietario_vehiculo: e.target.value })}
            >
              <option value="">¿Es propietario de un vehículo?</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={financialInfo.propietario_propiedad}
              onChange={(e) => setFinancialInfo({ ...financialInfo, propietario_propiedad: e.target.value })}
            >
              <option value="">¿Es propietario de una propiedad?</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Ingreso Total"
              value={financialInfo.ingreso_total}
              onChange={(e) => setFinancialInfo({ ...financialInfo, ingreso_total: parseFloat(e.target.value) })}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={financialInfo.tipo_ingreso}
              onChange={(e) => setFinancialInfo({ ...financialInfo, tipo_ingreso: e.target.value })}
            >
              <option value="">Tipo de Ingreso</option>
              <option value="trabajando">Trabajando</option>
              <option value="servidor público">Servidor Público</option>
              <option value="asociado comercial">Asociado Comercial</option>
              <option value="pensionado">Pensionado</option>
              <option value="desempleado">Desempleado</option>
              <option value="estudiante">Estudiante</option>
              <option value="empresario">Empresario</option>
              <option value="licencia maternidad">Licencia Maternidad</option>
            </select>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Monto del Crédito"
              value={financialInfo.monto_credito}
              onChange={(e) => setFinancialInfo({ ...financialInfo, monto_credito: parseFloat(e.target.value) })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Monto Anualidad"
              value={financialInfo.monto_anualidad}
              onChange={(e) => setFinancialInfo({ ...financialInfo, monto_anualidad: parseFloat(e.target.value) })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Precio de sus Bienes"
              value={financialInfo.precio_bienes}
              onChange={(e) => setFinancialInfo({ ...financialInfo, precio_bienes: parseFloat(e.target.value) })}
            />
          </div>
        )}

        {currentPage === 4 && (
          <div className="adeudos space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Adeudos</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={adeudos.fuente_externa_2}
              onChange={(e) => setAdeudos({ ...adeudos, fuente_externa_2: e.target.value })}
            >
              <option value="">¿Tiene algún pago retrasado de algún servicio?</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={adeudos.fuente_externa_3}
              onChange={(e) => setAdeudos({ ...adeudos, fuente_externa_3: e.target.value })}
            >
              <option value="">¿Tiene algún pago atrasado de otro banco?</option>
              <option value="Si">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        )}

        <button
          className="mt-8 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          onClick={handleNextPage}
        >
          {currentPage < 4 ? 'Siguiente' : 'Enviar'}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default RiskForm;