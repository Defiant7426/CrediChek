import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';
import Footer from './Footer';

export default function Informacion() {
  return (
    <>
        <TopBar />
        <Header />
        <div className="max-w-7xl mx-auto mt-8 px-4 flex flex-col items-center py-14 ">
            {/* Page Content */}
            <h1 className="text-sm font-bold text-gray-800">NUESTRO OBJETIVO</h1>
            <div className='space-y-3 flex flex-col items-center'>
                <h2 className="text-5xl font-semibold max-w-xl">
                Darte la mejor atención
                </h2>
                <h2 className="text-5xl font-semibold max-w-3xl">
                medica posible, con los mejores
                </h2>
                <h2 className="text-5xl font-semibold max-w-4xl">
                doctores y especialistas de la salud.
                </h2>
            </div>
        </div>

        {/* <div className='flex flex-col min-h-screen'> */}
            <div className="relative">
            <div className="relative max-w-7xl py-96 mx-auto px-8 z-30">
                <div className="max-w-7xl  text-white flex flex-col items-center mt-auto">
                    <h1 className="text-6xl font-semibold leading-tight">Más de 3000 pacientes confían en nosotros.</h1>
                </div>
            </div>

            <div className="absolute top-0 z-20 opacity-[60%]  bg-gradient-to-r from-black from-25% bg-transparent w-full h-full">

            </div>

                <video autoPlay loop muted
                    className="absolute top-0 z-10 w-auto min-w-full object-fill max-h-full max-w-none">
                
                    <source src="/vitaLinkVid2.mp4" type="video/mp4" />
                </video>
            </div>
        {/* </div> */}
        
        <div className="max-w-full mx-auto px-4 flex flex-col items-center py-32 bg-gradient-to-b from-vita-link to-white">
            {/* Page Content */}
            <h1 className="text-sm font-bold text-gray-800">NUESTRO COMPROMISO</h1>
            <div className='space-y-3 flex flex-col items-center'>
                <h2 className="text-5xl font-semibold max-w-xl">
                Cuidar de tu salud
                </h2>
                <h2 className="text-5xl font-semibold max-w-3xl">
                y bienestar es nuestra prioridad.
                </h2>
            </div>
            <div className='max-w-4xl py-6'>
                <p className='text-2xl text-slate-700'>
                    VitaLink se creo en 2017 con el objetivo de brindar una atención médica de calidad a todos los pacientes que lo necesiten.
                    Cada día trabajamos para mejorar nuestros servicios y ofrecer una atención personalizada y de calidad. 
                    Sientete seguro de que en VitaLink encontrarás a los mejores especialistas de la salud.
                </p>
            </div>
        </div>

        

        <div className='py-14'>
            <Footer />
        </div>
        
        
        
    </>
  );
}