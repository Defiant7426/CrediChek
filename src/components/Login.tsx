import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Manejo de errores
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("username",username);
          navigate("/home"); // Redirigir al home si es exitoso
        } else {
          setError(data.message || "Credenciales inválidas");
        }
      } else {
        setError("Error al conectarse al servidor.");
      }
      }catch (error) {
      setError("Ocurrió un error inesperado.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-credi-check">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <img
          src="https://vitalink.nyc3.cdn.digitaloceanspaces.com/CrediChek_logoCompleto.png"
          alt="CrediCheck Logo"
          className="w-32 mx-auto mb-6"
        />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-4 px-4 bg-credi-check text-white font-semibold rounded-lg shadow hover:bg-credi-check-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Ingresar
          </button>

          <a
            href="/register"
            className="block text-center text-sm text-credi-check hover:text-credi-check-dark"
          >
            Registrarse
          </a>
        </form>
      </div>
    </div>
  );
}
