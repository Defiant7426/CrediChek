import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Componente para la página de información personal
const PersonalInfoPage = ({ data, onChange }) => (
  <div>
    <h2>Información Personal</h2>
    <input
      type="text"
      placeholder="Nombre"
      value={data.name || ""}
      onChange={(e) => onChange("name", e.target.value)}
    />
    <input
      type="email"
      placeholder="Correo electrónico"
      value={data.email || ""}
      onChange={(e) => onChange("email", e.target.value)}
    />
  </div>
);

// Componente para la página de información laboral
const WorkInfoPage = ({ data, onChange }) => (
  <div>
    <h2>Información Laboral</h2>
    <input
      type="text"
      placeholder="Empresa"
      value={data.company || ""}
      onChange={(e) => onChange("company", e.target.value)}
    />
    <input
      type="text"
      placeholder="Cargo"
      value={data.position || ""}
      onChange={(e) => onChange("position", e.target.value)}
    />
  </div>
);

// Componente para la página de posición financiera
const FinancialInfoPage = ({ data, onChange }) => (
  <div>
    <h2>Posición Financiera</h2>
    <input
      type="number"
      placeholder="Ingreso mensual"
      value={data.income || ""}
      onChange={(e) => onChange("income", e.target.value)}
    />
    <input
      type="number"
      placeholder="Deudas actuales"
      value={data.debt || ""}
      onChange={(e) => onChange("debt", e.target.value)}
    />
  </div>
);

const CreditRiskForm = () => {
  const [page, setPage] = useState(0); // Estado para la página actual
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    position: "",
    income: "",
    debt: "",
  });
  const [isFormValid, setIsFormValid] = useState(false); // Estado para habilitar el botón "Siguiente"
  const navigate = useNavigate();

  // Función para cambiar los datos del formulario
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Función para validar los datos de cada página
  const validatePage = () => {
    if (page === 0) {
      return formData.name && formData.email; // Validar página 1
    }
    if (page === 1) {
      return formData.company && formData.position; // Validar página 2
    }
    if (page === 2) {
      return formData.income && formData.debt; // Validar página 3
    }
    return false;
  };

  // Función para avanzar a la siguiente página
  const handleNext = () => {
    if (validatePage()) {
      if (page === 2) {
        // En la última página, calcular el riesgo crediticio
        calculateCreditRisk();
        navigate("/resultado"); // Redirige a la página de resultado
      } else {
        setPage(page + 1);
      }
    } else {
      alert("Por favor, complete todos los campos de esta página.");
    }
  };

  // Calcular el riesgo crediticio
  const calculateCreditRisk = () => {
    // Aquí puedes agregar la lógica para calcular el riesgo crediticio
    const { income, debt } = formData;
    const risk = (debt / income) * 100; // Ejemplo de cálculo de riesgo
    console.log("Riesgo crediticio calculado: ", risk);
  };

  return (
    <div>
      <h1>Formulario de Riesgo Crediticio</h1>
      {page === 0 && <PersonalInfoPage data={formData} onChange={handleChange} />}
      {page === 1 && <WorkInfoPage data={formData} onChange={handleChange} />}
      {page === 2 && <FinancialInfoPage data={formData} onChange={handleChange} />}
      
      <button
        onClick={handleNext}
        disabled={!validatePage()} // Deshabilitar el botón si la página no está completa
      >
        {page === 2 ? "Calcular Riesgo" : "Siguiente"}
      </button>
    </div>
  );
};

export default CreditRiskForm;
