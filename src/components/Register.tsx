import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [role, setRole] = useState('patient');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (password !== password_confirm) {
        alert('Las contraseñas no coinciden');
        return;
      }
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, role }),
        });
        if (response.ok) {
          alert('Usuario registrado con éxito');
          navigate('/login');
        } else {
          alert('Error al registrar el usuario');
        }
      } catch (err) {
        console.error('Error:', err);
        alert('Error de conexión con el servidor');
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-vita-link">
        <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
          <img
            src="vitalink_logo.png"
            alt="Vitalink Logo"
            className="w-32 mx-auto mb-6"
          />
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
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
                Password
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
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="password"
                value={password_confirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="patient">Paciente</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-4 px-4 bg-vita-link text-white font-semibold rounded-lg shadow hover:bg-vita-link-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    );
}
