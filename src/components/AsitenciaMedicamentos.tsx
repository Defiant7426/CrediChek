import Header from "../components-Home/Header";
import TopBar from "../components-Home/TopBar";
import { useContext } from 'react';
import { ThemeContext } from '../../ThemeContext';
import ChatImagen from "./ChatImagen";


export default function AsitenciaMedicamentos() {
    const { theme } = useContext(ThemeContext);
  return (
    <>
        <TopBar />
        <Header />
        <div className={`w-full h-[2px] ${theme === 'dark' ? 'bg-[#1E4343]' : 'bg-vita-link'}`}></div> 
        <ChatImagen />
    </>
  )
}
