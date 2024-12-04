import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import Header from "../components-Home/Header";
import Footer from "./Footer";

const RiskForm = () => {
  const navigate = useNavigate();
  
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    dob: null,
    email: '',
    maritalStatus: '',
    address: '',
    numberOfChildren: 0,
  });

  const [jobInfo, setJobInfo] = useState({
    employer: '',
    salary: '',
    position: '',
    jobTenure: '',
    contractType: '',
  });

  const [financialInfo, setFinancialInfo] = useState({
    monthlyIncome: '',
    monthlyExpenses: '',
    currentDebts: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const isPersonalInfoComplete = personalInfo.name && personalInfo.dob && personalInfo.email && personalInfo.maritalStatus && personalInfo.address;
  const isJobInfoComplete = jobInfo.employer && jobInfo.salary && jobInfo.position && jobInfo.jobTenure && jobInfo.contractType;
  const isFinancialInfoComplete = financialInfo.monthlyIncome && financialInfo.monthlyExpenses && financialInfo.currentDebts;

  const handleNextPage = () => {
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

    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    } else {
      const riskScore = calculateRisk();
      Swal.fire(`Tu puntaje de riesgo crediticio es: ${riskScore}`);
      navigate('/resultado');
    }
  };

  const calculateRisk = () => {
    let score = 0;
    if (personalInfo.dob && personalInfo.email) score += 30;
    if (jobInfo.salary > 5000) score += 30;
    if (financialInfo.monthlyIncome > financialInfo.monthlyExpenses) score += 40;
    return score;
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
          </div>
        )}

        {currentPage === 2 && (
          <div className="job-info space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Información Laboral</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Empleador"
              value={jobInfo.employer}
              onChange={(e) => setJobInfo({ ...jobInfo, employer: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Salario"
              value={jobInfo.salary}
              onChange={(e) => setJobInfo({ ...jobInfo, salary: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Posición"
              value={jobInfo.position}
              onChange={(e) => setJobInfo({ ...jobInfo, position: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Antigüedad en el Trabajo"
              value={jobInfo.jobTenure}
              onChange={(e) => setJobInfo({ ...jobInfo, jobTenure: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="text"
              placeholder="Tipo de Contrato"
              value={jobInfo.contractType}
              onChange={(e) => setJobInfo({ ...jobInfo, contractType: e.target.value })}
            />
          </div>
        )}

        {currentPage === 3 && (
          <div className="financial-info space-y-4">
            <h3 className="text-2xl font-semibold mb-4">Información Financiera</h3>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Ingresos Mensuales"
              value={financialInfo.monthlyIncome}
              onChange={(e) => setFinancialInfo({ ...financialInfo, monthlyIncome: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Gastos Mensuales"
              value={financialInfo.monthlyExpenses}
              onChange={(e) => setFinancialInfo({ ...financialInfo, monthlyExpenses: e.target.value })}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              type="number"
              placeholder="Deudas Actuales"
              value={financialInfo.currentDebts}
              onChange={(e) => setFinancialInfo({ ...financialInfo, currentDebts: e.target.value })}
            />
          </div>
        )}

        <button
          className="mt-8 w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          onClick={handleNextPage}
        >
          Siguiente
        </button>
      </div>
      <Footer />
    </>
  );
};

export default RiskForm;