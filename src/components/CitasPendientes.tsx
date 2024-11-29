import { useEffect, useState } from "react";
import axios from "axios";
import TopBar from "../components-Home/TopBar";
import Header from "../components-Home/Header";
import Footer from "./Footer";
import { ThemeProvider } from "../../ThemeContext";

interface Appointment {
  id: number;
  fecha: string;
  hora: string;
  especialidad: string;
  doctor: string;
}

export default function CitasPendientes() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username") || "Paciente";
  
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/api/citas?username=${username}`
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error al obtener las citas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [username]);

  return (
    <ThemeProvider>
      <TopBar />
      <Header />
    
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "2rem",
        }}
      >
        <h2>Citas Pendientes</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : appointments.length > 0 ? (
          <table
            style={{
              borderCollapse: "collapse",
              width: "80%",
              marginTop: "1rem",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Fecha
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Hora
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Especialidad
                </th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                  Doctor
                </th>
              </tr>
            </thead>
            <tbody>
            {appointments.map((appointment) => (
                <tr key={appointment.id}>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {appointment.fecha.split("T")[0]}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {appointment.hora}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {appointment.especialidad}
                    </td>
                    <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {appointment.doctor}
                    </td>
                </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p style={{ marginTop: "2rem" }}>No tienes ninguna cita pendiente.</p>
        )}
      </main>

      <Footer />
    </ThemeProvider>
  );
}
