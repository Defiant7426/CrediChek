import TopBar from "../components-Home/TopBar";
import Header from "../components-Home/Header";
import Footer from "./Footer";
import Feature from "../components-Home/Feature";
import {ThemeProvider} from "../../ThemeContext"


export default function Home() {
  return (
    <ThemeProvider>
        <TopBar />
        <Header />
        <Feature />
        
        <Footer />
    </ThemeProvider>
  );
}
