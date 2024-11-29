// ThemeContext.d.ts
import React from "react";

export interface ThemeContextProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }>;
export const ThemeContext: React.Context<ThemeContextProps>;
