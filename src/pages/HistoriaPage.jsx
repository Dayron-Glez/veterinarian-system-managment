import { useEffect, useState } from 'react';
import { jsPDF } from "jspdf";
import LogoComponent from '../components/LogoComponent';
import notificationIcon from '../assets/notificationIcon.svg'
import ECOP_IMG from '../assets/ecop_image.png'

let fecha = new Date()
let horas = fecha.getHours()
let minutos = fecha.getMinutes();
let ampm = horas >= 12 ? 'PM' : 'AM';
let opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let strFecha = fecha.toLocaleDateString('es-ES', opciones);

let partes = strFecha.split(' ');

partes = partes.map(parte => parte.charAt(0).toUpperCase() + parte.slice(1));

strFecha = partes.join(' ');

horas = horas % 12;
horas = horas ? horas : 12;
minutos = minutos < 10 ? '0' + minutos : minutos;
let strTiempo = horas + ':' + minutos + ' ' + ampm;

function HistoriaPage() {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('historia');
    if (data) {
      setHistoria(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem('historia');
      if (data) {
        setHistoria(JSON.parse(data));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function descargarPDF() {
    const doc = new jsPDF();

    doc.text("Historia de la Mascota", 10, 10);
    doc.text(`Nombre de la Mascota: ${historia.mascota[0].nombre_mascota}`, 10, 20);
    doc.text(`Motivo: ${historia.general[0].motivo_consulta}`, 10, 30);
    doc.text(`Consulta: ${historia.general[0].consulta}`, 10, 40);
    doc.text(`Anamnesis: ${historia.general[0].anamnesis}`, 10, 50);
    doc.text(`Estado Reproductivo: ${historia.general[0].estado_reproductivo}`, 10, 60);
    doc.text(`Habitat: ${historia.general[0].habitat}`, 10, 70);
    doc.text(`Alimentación: ${historia.general[0].alimentacion}`, 10, 80);
    doc.text(`Alergia: ${historia.general[0].alergias}`, 10, 90);
    doc.text(`TLLC: ${historia.general[0].tllc}`, 10, 100);
    doc.text(`Pulso: ${historia.general[0].pulso}`, 10, 110);
    doc.text(`FC: ${historia.general[0].fc}`, 10, 120);
    doc.text(`FR: ${historia.general[0].fr}`, 10, 130);
    doc.text(`Temperatura: ${historia.general[0].temperatura}`, 10, 140);
    doc.text(`Peso: ${historia.general[0].peso}`, 10, 150);
    doc.text(`Fecha: ${new Date(historia.general[0].fecha_consulta).toLocaleDateString()}`, 10, 160);
    doc.text(`ID de la Mascota: ${historia.general[0].mascota}`, 10, 170);
    doc.text(`Especie: ${historia.mascota[0].especie}`, 10, 180);
    doc.text(`Raza: ${historia.mascota[0].raza}`, 10, 190);
    doc.text(`Edad: ${historia.mascota[0].edad}`, 10, 200);
    doc.text(`Color: ${historia.mascota[0].color}`, 10, 210);
    doc.text(`Sexo: ${historia.mascota[0].sexo}`, 10, 220);
    doc.text(`Nombre del Tutor: ${historia.tutor[0].nombre_tutor}`, 10, 230);
    doc.text(`DNI del Tutor: ${historia.tutor[0].dni}`, 10, 240);
    doc.text(`Teléfono del Tutor: ${historia.tutor[0].telefono}`, 10, 250);

    doc.save(`historia de ${historia.mascota[0].nombre_mascota}.pdf`);
  }

  return (
    <div className="">
      <nav className=' flex flex-col h-[14vh] w-full'>
        <div>

        </div>
        <section className='flex flex-col h-[7vh] bg-white justify-center'>
          <div className='flex flex-row justify-between'>
            <LogoComponent height={48} className=' mx-4 md:mx-8' />
            <div className='flex flex-col justify-center place-items-center'>
              <p className='flex text-lg font-semibold'>{strTiempo}</p>
              <p className='flex'>{strFecha}</p>
            </div>
            <img height={32} width={32} src={notificationIcon} alt="notification Icon" className='mx-4 md:mx-8' />
          </div>
        </section>
        <div className='h-[4vh] bg-[#eb5b27]' />
      </nav>
      <div className=' flex flex-col w-full ml-8'>
        {historia && (
          <div className=' flex flex-col'>
            <div className=' flex flex-row place-items-center'>
              <img src={ECOP_IMG} alt="ECOP Image" className=' size-8' />
              <h2 className='text-[#344054] font-bold ml-1'>Historia Clínica</h2>
            </div>
            <div className=' ml-16'>


              <div className=' flex flex-row my-4'>
                <p ><p>Nombre del paciente</p> {historia.mascota[0].nombre_mascota}</p>
                <p className=' ml-32'><p>Nombre del Tutor</p> {historia.tutor[0].nombre_tutor}</p>
              </div>
              <section className=' flex flex-row'>
                <div>
                  <p>Especie</p>
                  <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.mascota[0].especie}</p>
                </div>
                <div className=' ml-16'>
                  <p>Raza</p>
                  <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.mascota[0].raza}</p>
                </div>
                <div className=' ml-16'>
                  <p>Edad</p>
                  <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.mascota[0].edad}</p>
                </div>
                <div className=' ml-16'>
                  <p>Color</p>
                  <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.mascota[0].color}</p>
                </div>
                <div className=' ml-16'>
                  <p>Sexo</p>
                  <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.mascota[0].sexo}</p>
                </div>
              </section>
              <section className=' flex flex-row mt-4'>
                <div className=' flex flex-col'>
                  <h3 className='text-[#344054] mb-2 '>Vacunaciones</h3>
                  <div className=' flex flex-row'>
                    <div>
                      <p>Tipo de vacuna</p>
                      <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.vacunaciones[0][0].tipo_vacuna}</p>
                    </div>
                    <div className=' ml-8'>
                      <p>Producto</p>
                      <p className=' bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.vacunaciones[0][0].producto}</p>
                    </div>
                  </div>
                  <div className=' mt-2'>
                    <button className=' border-[1px] border-[#eb5b27]  hover:bg-[#eb5b27] hover:text-white hover:border-transparent text-center rounded-md py-1 px-4 text-[#eb5b27] w-24'>{new Date(historia.vacunaciones[0][0].fecha).toLocaleDateString()}</button>
                  </div>
                  </div>
                  
                
                <div className=' flex flex-col ml-24'>
                  <h3 className='text-[#344054] mb-2'>Desparacitaciones</h3>
                  <div className=' flex flex-col'>
                   <p>Producto</p>
                   <p className='bg-[#eb5b27] text-center rounded-md py-1 px-4 text-white'>{historia.desparacitaciones[0][0].producto}</p>
                  </div>
                  <button className='border-[1px] border-[#eb5b27] hover:bg-[#eb5b27] hover:text-white hover:border-transparent text-center rounded-md py-1 px-4 text-[#eb5b27] mt-2 w-24'>{new Date(historia.desparacitaciones[0][0].fecha).toLocaleDateString()}</button>
                </div>
              </section>
              <div className=' flex flex-col'>
                <h2 className='text-[#344054] font-bold ml-1'>ECOP</h2>
                <p><strong>Motivo de consulta:</strong> {historia.general[0].motivo_consulta}</p>

              </div>
              <p><strong>Anamnesis:</strong> {historia.general[0].anamnesis}</p>
              <p><strong>Estado Reproductivo:</strong> {historia.general[0].estado_reproductivo}</p>
              <p><strong>Habitat:</strong> {historia.general[0].habitat}</p>
              <p><strong>Alimentación:</strong> {historia.general[0].alimentacion}</p>
              <p><strong>Alergia:</strong> {historia.general[0].alergias}</p>
              <p><strong>TLLC:</strong> {historia.general[0].tllc}</p>
              <p><strong>Pulso:</strong> {historia.general[0].pulso}</p>
              <p><strong>FC:</strong> {historia.general[0].fc}</p>
              <p><strong>FR:</strong> {historia.general[0].fr}</p>
              <p><strong>Temperatura:</strong> {historia.general[0].temperatura}</p>
              <p><strong>Peso:</strong> {historia.general[0].peso}</p>
              <p><strong>Fecha:</strong> {new Date(historia.mascota[0].fecha_consulta).toLocaleDateString()}</p>
              <p><strong>ID de la Mascota:</strong> {historia.general[0].mascota}</p>

              <p><strong>DNI del Tutor:</strong> {historia.tutor[0].dni}</p>
              <p><strong>Teléfono del Tutor:</strong> {historia.tutor[0].telefono}</p>

            </div>
            {historia.plan_terapeutico[0].map((item, index) => (
              <div key={index}>
                <h3>Plan Terapéutico {index + 1}</h3>
                <p><strong>Tratamiento:</strong> {item.tratamiento}</p>
                <p><strong>Principio Activo:</strong> {item.principio_activo}</p>
                <p><strong>Posología:</strong> {item.posologia}</p>
                <p><strong>Frecuencia:</strong> {item.frecuencia}</p>
                <p><strong>Duración:</strong> {item.duracion}</p>
                <p><strong>Vía:</strong> {item.via}</p>
              </div>
            ))}

            {historia.problemas[0].map((item, index) => (
              <div key={index}>
                <h3>Problema {index + 1}</h3>
                <p><strong>Problema:</strong> {item.problema}</p>
                <p><strong>Diagnóstico Diferencial:</strong> {item.diagnostico_diferencial}</p>
              </div>
            ))}

            {historia.diagnosticos[0].map((item, index) => (
              <div key={index}>
                <h3>Diagnóstico {index + 1}</h3>
                <p><strong>Tipo de Examen:</strong> {item.tipo_examen}</p>
                <p><strong>Resultados:</strong> {item.resultados}</p>
                <p><strong>Laboratorio:</strong> {item.laboratorio}</p>
              </div>
            ))}

            {historia.sistemas[0].map((item, index) => (
              <div key={index}>
                <h3>Sistema {index + 1}</h3>
                <p><strong>Sistema:</strong> {item.sistema}</p>
                <p><strong>Órgano:</strong> {item.organo}</p>
                <p><strong>Enfermedad:</strong> {item.enfermedad}</p>
                <p><strong>Observación:</strong> {item.observacion}</p>
              </div>
            ))}

            {historia.pasantes[0].map((item, index) => (
              <div key={index}>
                <h3>Pasantes/Rotantes {index + 1}</h3>
                <p><strong>DNI:</strong> {item.dni}</p>
                <p><strong>Nombre:</strong> {item.nombre}</p>
                <p><strong>Semestre:</strong> {item.semestre}</p>
                <p><strong>Observación:</strong> {item.observacion}</p>
              </div>
            ))}

            <button onClick={descargarPDF}>Descargar PDF</button>
          </div>
        )}
      </div>
    </div>
  );


}

export default HistoriaPage;
