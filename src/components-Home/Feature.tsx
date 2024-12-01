
export default function Feature() {
  const username = localStorage.getItem("username") || "Paciente";
  return (
    <div className="relative">
        <div className="relative max-w-7xl py-32 mx-auto px-8 z-30">
            <div className="max-w-[400px] text-white">
                <h1 className="text-6xl font-semibold leading-tight">Bienvenido, {username}</h1>
                <p className="my-6 text-lg pb-6">Estamos listos para verte! 😊</p>
                <div className="flex items-center gap-6">
                    <a href="/chatcita" className="bg-credi-check py-4 px-6 rounded-full font-semibold text-sm hover:bg-credi-check-dark">
                        Reservar cita 
                    </a>
                    
                    <a href="/informacion" className="flex items-center gap-3 font-medium group">
                        <div className="bg-white w-8 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" className=" text-credi-check group-hover:text-credi-check-dark">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                        </svg>


                        </div>
                        <div className="group-hover:underline underline-offset-8 ">
                            Mas información...
                        </div>
                        
                    </a>
                    
                </div>
            </div>
        </div>

        <div className="absolute top-0 z-20 opacity-[80%]  bg-gradient-to-r from-black from-25% bg-transparent w-full h-full">

        </div>

        <video autoPlay loop muted
            className="absolute top-0 z-10 w-auto min-w-full object-fill max-h-full max-w-none">
        
            <source src="/vitalink2.mp4" type="video/mp4" />
        </video>
    </div>
  )
}
