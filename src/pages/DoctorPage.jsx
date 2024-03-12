import { useState, useEffect } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import ECOP_IMG from '../assets/ecop_image.png'
import ECOP_IMG2 from '../assets/eccop_image_2.png'
import ADD_IMG from '../assets/añadir.png'
import LogoComponent from '../components/LogoComponent'
import notificationIcon from '../assets/notificationIcon.svg'
import SystemDeseaseComponent from '../components/SystemDeseaseComponent'
import {GeneralComponent} from '../components/ECOP/GeneralComponent'
import { ConstantesFComponent } from '../components/ECOP/ConstantesFComponent';
import { ExamenCComponent } from '../components/ECOP/ExamenCComponent';
import { MucosasComponent } from '../components/ECOP/MucosasComponent';
import { ProblemComponent } from '../components/ECOP/ProblemComponent';
const DoctorPage = () => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm()
  const [sistema, setSistema] = useState(null);
  const [enfermedad, setEnfermedad] = useState(null);
  const [deseaseComponents, setDeseaseComponents] = useState([{}]);
  const [problemsComponents, setProblemsComponents] = useState([{}]);

  const handleSystemChange = (sistemaSeleccionado) => {
    setSistema(sistemaSeleccionado);
  };

  const handleEnfermedadChange = (enfermedadSeleccionada) => {
    setEnfermedad(enfermedadSeleccionada);
  };


  const watchAlimentacion = watch('Alimentación', '');
  const watchHabitat = watch('Hábitat', '');
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

  useEffect(() => {
    const obtenerDatos = () => {
      const fechaActual = new Date().toLocaleDateString('en-CA');
      axios.get(`https://g8k31qc7-8000.use.devtunnels.ms/doctor/citas/${fechaActual}/`)
        .then(res => {
          setMascotas(res.data);
          setMascota(res.data[0]); // Guarda la primera mascota en el estado
        })
        .catch(err => console.error(err));
    };

    obtenerDatos(); // Ejecutar al montar el componente
    const intervalId = setInterval(obtenerDatos, 24 * 60 * 60 * 1000); // Ejecutar cada 24 horas

    return () => {
      clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    };
  }, []);

  const handleClick = mascota => {
    setMascotaSeleccionada(mascota);
  };

  function onSubmit(data) {
    if (watchAlimentacion !== 'Otro1') {
      delete data.otro1;
    } else {
      data.Alimentación = data.otro1
    }

    if (watchHabitat !== 'Otro2') {
      delete data.otro2;
    } else {
      data.Hábitat = data.otro2
    }

    const mascotaData = {
      mascota: mascota.id,
      historia: {
        motivo: data.motivo,
        anamnesis: data.anamnesis,
        estado_reproductivo: data.estado_reproductivo,
        alimentacion: data.Alimentación,
        habitad: data.Hábitat,
        alergia: data.alergias,
        tllc: data.TLLC,
        pulso: data.Pulso,
        fc: data.FC,
        fr: data.FR,
        temperatura: data.Temperatura,
        peso: data.Peso
      },

      cirugia: [
        {
          tipo: "Cirugia",
          organo: "dfsf"
        },
        {
          tipo: "Cirugia2",
          organo: "aasda"
        }
      ],
      vacuna: [
        {
          tipo: "Vacuna",
          producto: "aassd"
        }
      ],
      desparacitacion: [
        {
          producto: "Desparacitacio",
          fecha: "2024-02-16"
        }
      ],
      examen_clinico: [
        {
          hidratacion: "Exame",
          actitud: "sads",
          sistema:
          {
            nombre: sistema,
            enfermedad: enfermedad
          },
          evolucion:
          {
            peso: 2.52,
            fecha: "2024-02-21"
          },
          mucosa: {
            "tipo": "dsd"
          }
        }
      ],
      terapia: [
        {
          tratamiento: "Terapi",
          via: "asdh",
          examen: {
            "fecha": "2024-02-21"
          }
        }
      ]
    }

    axios.post('https://g8k31qc7-8000.use.devtunnels.ms/doctor/actualizarHistoria/', mascotaData)
      .then(response => {
        console.log("Respuesta de axios.post", response);

      })
      .catch(error => {
        console.error("Error en axios.post", error);
      });

    console.log(data);
    reset();
  }
  const handleButtonClickDesease = () => {
    const newComponent = (
      <SystemDeseaseComponent
        key={deseaseComponents.length}
        onSubmit={handleSystemChange}
        onEnfermedadChange={handleEnfermedadChange}
      />
    );

    setDeseaseComponents(prevComponents => [...prevComponents, newComponent]);
  };

  const handleButtonClickProblem = () => {
    const newComponentProblem = (
      <ProblemComponent
        key={problemsComponents.length}
      />
    );

    setProblemsComponents(prevComponents => [...prevComponents, newComponentProblem]);
  };
  return (
    <>
      <div className='flex flex-col'>
        <nav className=' flex flex-col h-[14vh] w-full'>
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
        <div className='flex flex-row h-full w-full '>
          <main className='flex flex-col h-[100vh] w-[75vw] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-thin scrollbar-thumb-rounded'>
            <section className='flex flex-col mt-8 ml-8'>
              <div className=' flex flex-row place-items-center'>
                <img src={ECOP_IMG} alt="ECOP Image" className=' size-8' />
                <h2 className='text-[#344054] font-bold ml-1'>ECOP</h2>
              </div>
              <div className=' mt-4 border-[1px] border-solid border-[#344054] h-0 w-[98%]'></div>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <GeneralComponent register={register} />
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              <ConstantesFComponent register={register}/>
             
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              <ExamenCComponent register={register} />
              
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              <MucosasComponent register={register}/>
             
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              <div className='mt-16 ml-16'>
                {deseaseComponents.map((_, index) => (
                  <SystemDeseaseComponent
                    key={index}
                    onSubmit={handleSystemChange}
                    onEnfermedadChange={handleEnfermedadChange}
                  />
                ))}
                <button onClick={handleButtonClickDesease} className=' bg-transparent border-none '>
                  <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none'/>
                </button>
              </div>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              <section className=' flex flex-col ml-16 mt-16'>
                  <h3>LISTA DE PROBLEMAS</h3>
                  <div className=' flex flex-row mt-4'>
                    <p className=' font-semibold text-[#eb5b27]  pl-2 ml-4 w-80'>Lista de problemas</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-2 w-80'>Lista Maestra</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-14'>{`Diagnóstico Diferencial (DAMNVVIT)`}</p>
                  </div>
                  {/* <div className=' mt-4 border-[1px] border-solid border-[#b5b7ba] h-0 ml-8 w-[95%]' /> */}

                  {/* <div className='flex flex-row mt-4'>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none ml-6 w-72 h-8 border-none  outline-1 focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text'/>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none w-80 ml-8 h-8 border-none  outline-1 focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text'/>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none ml-14 w-72 h-8 border-none outline-1  focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text'/>
                  </div> */}
                  {problemsComponents.map((_, index) => (
                      <ProblemComponent
                        key={index}
                      />
                    ))}
                  <button onClick={handleButtonClickProblem} className=' bg-transparent border-none place-self-start mt-8  '>
                  <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none'/>
                </button>
              </section>
              <div className='flex flex-row justify-around mt-8'>
                <button onClick={() => { reset() }} className=' rounded-3xl h-10 w-36 mb-8'>Cancelar</button>
                <button type='submit' className=' bg-[#eb5b27] text-white border-none rounded-3xl h-10 w-36 mb-8'>Guardar</button>
              </div>
            </form>
          </main>
          <aside className='flex flex-col justify-start w-[25vw]  sticky top-0 h-screen '>
            <div className='ml-12'>

              <h1 className=' mt-8 font-light'>MASCOTA</h1>
              <div className=' mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[90%]'></div>
              {mascotaSeleccionada ? (
                <div>
                  <h3 className=' my-4 text-[#eb5b27]'>Nombre de la mascota : {mascotaSeleccionada.nombre_mascota}</h3>
                  <div className='flex flex-row'>
                    <p className='text-[#344054]'>Especie : {mascotaSeleccionada.especie}</p>
                    <span className=' mx-4 text-[#344054]'>/</span>
                    <p className='text-[#344054]'> Raza : {mascotaSeleccionada.raza}</p>
                  </div>
                  <span className=' mt-4 font-extralight'>Edad : {mascotaSeleccionada.edad}</span>
                </div>
              ) : (
                <div className=' flex flex-row my-4'>
                  <div className=' grid rounded-full size-28'>
                    <img src={ECOP_IMG2} alt="ECOP_IMG2" className='flex size-24 justify-self-end place-self-center ' />
                  </div>
                  <div>
                    <h3 className=' my-4 text-[#eb5b27]'>Nombre de la mascota</h3>
                    <div className='flex flex-row'>
                      <p className='text-[#344054]'>Especie</p>
                      <span className=' mx-4 text-[#344054]'>/</span>
                      <p className='text-[#344054]'> Raza</p>
                    </div>
                    <span className=' mt-4 font-extralight'>Edad</span>
                  </div>
                </div>
              )}

            </div>
            <div className=' mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[100%]'></div>
            <h3 className=' mt-8 ml-12 text-[#344054]'>Citas programadas</h3>
            <div className=' ml-12 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[87%]'></div>
            <div className='flex flex-col place-items-centers'>
              {mascotas.map(mascota => (
                <button key={mascota.id} onClick={() => handleClick(mascota)} className=' my-2 w-[85%] mx-auto h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
                  <div className='grid grid-cols-2'>
                    <p>
                      {mascota.nombre_mascota}

                    </p>
                    <p>

                      {mascota.especie}
                    </p>
                    <p>

                      {mascota.raza}
                    </p>
                    <p>

                      {mascota.edad + ' años'}
                    </p>
                    <p>

                      {mascota.id + ' id'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export default DoctorPage