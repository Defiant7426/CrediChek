import TopBar from '../components-Home/TopBar';
import Header from '../components-Home/Header';

interface InfoSectionProps {
  title: string;
  imageSrc: string;
  items: string[]; // Puedes especificar un tipo más preciso si conoces la estructura de los elementos en items
}

function InfoSection({ title, imageSrc, items }: InfoSectionProps) {
  return (
    <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 mb-8">
      {/* Image */}
      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
        <img
          src={imageSrc}
          alt={title}
          className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-teal-500"
        />
      </div>
      {/* Content */}
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Perfil() {
  const basicInfo = {
    name: 'Luis Fernández',
    age: '35 años',
    id: '#123456789',
    email: 'luis.fernandez@example.com',
    phone: '+34 123 456 789',
    address: 'Calle Ejemplo 123, Madrid, España',
    imageSrc:
      'https://cdn.domestika.org/c_limit,dpr_auto,f_auto,q_auto,w_820/v1576497920/content-items/003/518/382/JuanCruzPedroni-46-original.jpg?1576497920',
  };

  const sections = [
    {
      title: 'Historial Médico',
      imageSrc:
        'https://th.bing.com/th/id/OIP.eoeRfMofo4xO1bcgxthxxQHaE8?rs=1&pid=ImgDetMain',
      items: ['Hipertensión desde 2018', 'Alergia a penicilina', 'Cirugía de apendicitis en 2020'],
    },
    {
      title: 'Medicamentos Actuales',
      imageSrc:
        'https://th.bing.com/th/id/R.b81b52285f4fc19472a3938234a8eef8?rik=kfDU0K%2fqemE5Mw&pid=ImgRaw&r=0',
      items: ['Losartán 50mg - 1 vez al día', 'Atorvastatina 20mg - 1 vez al día'],
    },
    {
      title: 'Citas Médicas',
      imageSrc:
        'https://www.clinicasanpablo.co/galepages/mac_gal_citas_medicas_1549383405.jpg',
      items: [
        'Consulta con cardiólogo - 10 de diciembre, 2023',
        'Ecografía abdominal - 15 de enero, 2024',
      ],
    },
    {
      title: 'Resultados de Laboratorio Recientes',
      imageSrc:
        'https://pulsosalud.com/pe/wp-content/uploads/2023/09/examenes-medicos-laboratorio-2048x1366.jpeg',
      items: [
        'Colesterol Total: 190 mg/dL - dentro de rango normal',
        'Glucosa: 85 mg/dL - dentro de rango normal',
      ],
    },
    {
      title: 'Plan de Salud',
      imageSrc:
        'https://blog.planseguro.com.mx/wp-content/uploads/2023/03/que-plan-de-salud-es-para-ti-de-acuerdo-a-tu-estilo-de-vida.jpg',
      items: [
        'Ejercicio moderado: 30 minutos diarios',
        'Dieta baja en sodio',
        'Control mensual de presión arterial',
      ],
    },
    {
      title: 'Documentación Médica',
      imageSrc:
        'https://www.unitecoprofesional.es/blog/wp-content/uploads/2021/10/documentacion-clinica.jpg',
      items: [
        'Informe médico de consulta con cardiólogo - noviembre 2023',
        'Certificado de incapacidad - octubre 2023',
      ],
    },
  ];

  return (
    <>
      <TopBar />
      <Header />
      <main className="max-w-4xl mx-auto mt-8 px-4">
        {/* Basic Patient Information */}
        <div className="flex flex-col md:flex-row items-center bg-white shadow-md rounded-lg p-6 mb-8">
          {/* Patient Photo */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <img
              src={basicInfo.imageSrc}
              alt="Foto del Paciente"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-teal-500"
            />
          </div>
          {/* Patient Info */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{basicInfo.name}</h2>
            <p className="text-gray-600">Edad: {basicInfo.age}</p>
            <p className="text-gray-600">Número de Identificación: {basicInfo.id}</p>
            <p className="text-gray-600">Correo electrónico: {basicInfo.email}</p>
            <p className="text-gray-600">Teléfono: {basicInfo.phone}</p>
            <p className="text-gray-600">Dirección: {basicInfo.address}</p>
          </div>
        </div>

        {/* Additional Information Sections */}
        {sections.map((section, index) => (
          <InfoSection
            key={index}
            title={section.title}
            imageSrc={section.imageSrc}
            items={section.items}
          />
        ))}
      </main>
    </>
  );
}