import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Confetti from "react-confetti";
import { ThemeContext } from "../../ThemeContext";
import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

// Definición de los tipos de doctores y horarios
type DoctorSchedule = {
  time: string;
  doctor: string;
};

type SpecialtyDoctors = {
  Cardiologia: DoctorSchedule[];
  Pediatria: DoctorSchedule[];
  Dermatologia: DoctorSchedule[];
};

const convertTo24HourFormat = (time: string): string => {
  const [hourPart, modifier] = time.split(" ");
  let [hours, minutes] = hourPart.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  } else if (modifier === "AM" && hours === 12) {
    hours = 0;
  }

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:00`;
};

const DOCTORS_BY_SPECIALTY: SpecialtyDoctors = {
  Cardiologia: [
    { time: "09:00 AM", doctor: "Dr. Espinoza" },
    { time: "10:00 AM", doctor: "Dr. Salcedo" },
    { time: "11:30 AM", doctor: "Dr. Valdiviezo" },
  ],
  Pediatria: [
    { time: "02:00 PM", doctor: "Dra. Pacheco" },
    { time: "04:00 PM", doctor: "Dr. Rivas" },
  ],
  Dermatologia: [
    { time: "09:00 AM", doctor: "Dr. Canales" },
    { time: "10:00 AM", doctor: "Dr. Cleber" },
  ],
};

export default function CuestionarioCita() {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); // Mueve `useNavigate` aquí
  
  // Estados
  const [selectedSpecialty, setSelectedSpecialty] = useState<keyof SpecialtyDoctors | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const username = localStorage.getItem("username") || "Paciente";

  const handleSpecialtySelect = (specialty: keyof SpecialtyDoctors) => {
    setSelectedSpecialty(specialty);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedDoctor(null);
  };

  const handleTimeSelect = (time: string, doctor: string) => {
    setSelectedTime(time);
    setSelectedDoctor(doctor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime || !selectedDoctor || !selectedSpecialty) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, completa todos los pasos.",
      });
      return;
    }

    const data = {
      username: username,
      fecha: selectedDate.toISOString().split("T")[0],
      hora: convertTo24HourFormat(selectedTime!),
      especialidad: selectedSpecialty,
      doctor: selectedDoctor,
    };

    setLoading(true);

    try {
      const response = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setLoading(false);
        setShowConfetti(true); // Activa el confeti
        setTimeout(() => setShowConfetti(false), 3000); // Desactiva el confeti después de 3 segundos
      
        Swal.fire({
          icon: "success",
          title: "¡Cita reservada!",
          text: "Tu cita ha sido reservada exitosamente.",
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: "Ver citas pendientes",
        }).then(() => {
          navigate("/citasPendientes"); // Navega a /citasPendientes
        });
      } else {
        throw new Error("Error al reservar la cita.");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al reservar la cita.",
      });
      setLoading(false);
    }
  };

  // Resto del código (sin cambios)

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(minDate.getDate() + 7);

  const formClasses = theme === "dark" ? "bg-[#152C2C] text-white" : "bg-white text-black";
  const buttonClasses = theme === "dark" ? "bg-vita-link text-white" : "bg-blue-500 text-white";

  // Usamos `useEffect` para manejar el estado del confeti y ajustarlo cuando el tamaño de la ventana cambie
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  

  return (
    <div>
      <TopBar />
      <Header />
      <div className={`w-full h-[2px] ${theme === 'dark' ? 'bg-[#1E4343]' : 'bg-gray'}`}></div> 
      {showConfetti && (
        <Confetti
          width={windowWidth}
          height={windowHeight}
          numberOfPieces={500} // Aumenta el número de piezas
          gravity={0.2} // Reduce la gravedad para un efecto más flotante
          recycle={true} // Permite que el confeti se regenere
        />
      )}
      <main
        className={`${formClasses} transition-colors duration-300 min-h-screen p-6 flex justify-center`}
      >
        <div className="max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Reservar Cita</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selección de especialidad */}
            <div>
              <label className="block mb-2 font-medium">Selecciona una especialidad:</label>
              <div className="grid grid-cols-3 gap-2 text-black">
                {Object.keys(DOCTORS_BY_SPECIALTY).map((specialty) => (
                  <button
                    type="button"
                    key={specialty}
                    onClick={() => handleSpecialtySelect(specialty as keyof SpecialtyDoctors)}
                    className={`p-2 rounded-lg border ${
                      selectedSpecialty === specialty
                        ? "bg-vita-link text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>

            {/* Selección de fecha */}
            {selectedSpecialty && (
              <div>
                <label className="block mb-2 font-medium">Selecciona una fecha:</label>
                <div className = "text-black">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    minDate={minDate}
                    maxDate={maxDate}
                    dateFormat="dd/MM/yyyy"
                    className="w-full p-2 border rounded-lg"
                    placeholderText="Selecciona una fecha"
                  />
                </div>
              </div>
            )}

            {/* Selección de hora y doctor */}
            {selectedDate && selectedSpecialty && (
              <div>
                <label className="block mb-2 font-medium">Selecciona una hora:</label>
                <div className="grid grid-cols-2 gap-2 text-black">
                  {DOCTORS_BY_SPECIALTY[selectedSpecialty].map(({ time, doctor }: DoctorSchedule) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => handleTimeSelect(time, doctor)}
                      className={`p-2 rounded-lg border ${
                        selectedTime === time
                          ? "bg-vita-link text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {time} <br />
                      <span className="text-sm">{doctor}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Botón de envío */}
            {selectedTime && (
              <div>
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg ${buttonClasses} hover:bg-opacity-90`}
                  disabled={loading}
                >
                  {loading ? "Reservando..." : "Reservar Cita"}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
