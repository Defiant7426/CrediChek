import React, { createContext, useState, useEffect } from 'react';
import { ThemeContextProps } from './ThemeContext.d'; // Asegúrate de la ruta correcta

// Crear el contexto y asignarle el tipo
export const ThemeContext = createContext<ThemeContextProps>({
  theme: 'light', // Valor predeterminado
  toggleTheme: () => {}, // Función vacía por defecto
});

// Crear el proveedor del contexto
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme');
    if (savedTheme) {
      setTheme(savedTheme as 'light' | 'dark'); // Asegura que TypeScript conozca el tipo
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('preferred-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
