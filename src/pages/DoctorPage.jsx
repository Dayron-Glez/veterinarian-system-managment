import { useState, useEffect } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';

import LogoComponent from '../components/LogoComponent'
import notificationIcon from '../assets/notificationIcon.svg'
import SystemDeseaseComponent from '../components/SystemDeseaseComponent'
const DoctorPage = () => {
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const { register, handleSubmit, reset, watch } = useForm()
  const [sistema, setSistema] = useState(null);
  const [enfermedad, setEnfermedad] = useState(null);


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
    // reset();
  }

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
          <div className=' flex flex-row h-[7vh] place-items-center bg-[#eb5b27]'>
            <ul className=' list-none mx-8'>
              <button className=' border-none bg-transparent mx-4'>
                <li className='text-white font-semibold'>INICIO</li>
              </button>
              <button className=' border-none bg-transparent mx-4'>
                <li className='text-white font-semibold'>CLIENTES</li>
              </button>
              <button className=' border-none bg-transparent mx-4'>
                <li className='text-white font-semibold'>MASCOTAS</li>
              </button>
              <button className=' border-none bg-transparent mx-4'>
                <li className='text-white font-semibold'>HISTORIAS</li>
              </button>
            </ul>
          </div>
        </nav>
        <div className='flex flex-row h-full w-full '>
          <main className='flex flex-col h-[100vh] w-[75vw] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-thin scrollbar-thumb-rounded'>
            <section className='flex flex-col mt-8 ml-8'>
              <h3 className='text-[#344054]'>HISTORIA CLÍNICA</h3>
              <div className=' mt-4 '>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Principal</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Examen Clínico</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Plan Terapéutico</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Mucosas</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Exámenes</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Vacunas</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Desparacitación</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Cirugía</button>
                <button className=' bg-transparent border-[#344054] border-[1px] rounded-md w-32 h-8 mx-2'>Evolución</button>
              </div>
            </section>
            <form onSubmit={handleSubmit(onSubmit)}>

              <section className='flex flex-row justify-around mt-8'>
                <div className='flex flex-col'>
                  <label className='flex flex-row mb-2'>Motivo de consulta <p className='text-red-500'>*</p> </label>
                  <textarea name="motivo" id="motivo" cols="70" rows="4" className='shadow rounded-md resize-none' {...register('motivo')} />
                </div>
                <div className='flex flex-col'>
                  <label className='flex flex-row mb-2'>Anamnesis <p className='text-red-500'>*</p> </label>
                  <textarea name="anamnesis" id="anamnesis" cols="70" rows="4" className='shadow rounded-md resize-none' {...register('anamnesis')} />
                </div>
              </section>
              <div className='flex flex-row'>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Estado reproductivo <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=' mx-8'>
                      <input type="radio" value="Castrado" name="estado_reproductivo" {...register('estado_reproductivo')} />
                      Castrado
                    </label>
                    <label>
                      <input type="radio" value="Gestación" name="estado_reproductivo" {...register('estado_reproductivo')} />
                      Gestación
                    </label>
                  </div>
                  <div className='flex flex-row'>
                    <label className=' mx-8'>
                      <input type="radio" value="Entero" name="estado_reproductivo" {...register('estado_reproductivo')} />
                      Entero
                    </label>
                    <label>
                      <input type="radio" value="Lactancia" name="estado_reproductivo" {...register('estado_reproductivo')} />
                      Lactancia
                    </label>
                  </div>
                </section>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Alimentación <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=''>
                      <input type="radio" value="Balanceada" name="Alimentación" {...register('Alimentación')} />
                      Balanceada
                    </label>
                    <label>
                      <input type="radio" value="Mixta" name="Alimentación" className='ml-4' {...register('Alimentación')} />
                      Mixta
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className='flex'>
                      <input type="radio" value="Casera" name="Alimentación" {...register('Alimentación')} />
                      Casera
                    </label>
                    <div className='flex flex-row'>
                      <label>
                        <input type="radio" value="Otro1" name="Alimentación" {...register('Alimentación')} />
                        Otro
                      </label>
                      <textarea name="otro1" id="otro1" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto' {...register('otro1')} />
                    </div>
                  </div>
                </section>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Hábitat <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=''>
                      <input type="radio" value="Casa" name="Hábitat" {...register('Hábitat')} />
                      Casa
                    </label>
                    <label>
                      <input type="radio" value="Lote" name="Hábitat" className='ml-4' {...register('Hábitat')} />
                      Lote
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <label className='flex'>
                        <input type="radio" value="Finca" name="Hábitat" {...register('Hábitat')} />
                        Finca
                      </label>
                      <label className='flex'>
                        <input type="radio" value="Tráiler" name="Hábitat" className='ml-3' {...register('Hábitat')} />
                        Tráiler
                      </label>
                    </div>
                    <div className='flex flex-row'>
                      <label>
                        <input type="radio" value="Otro2" name="Hábitat" {...register('Hábitat')} />
                        Otro
                      </label>
                      <textarea name="otro2" id="otro2" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto'{...register('otro2')} />
                    </div>
                  </div>
                </section>
              </div>
              <section className=' flex flex-col ml-5 mt-8'>
                <label className='flex flex-row mb-2'>Alergias <p className='text-red-500'>*</p> </label>
                <textarea name="alergias" id="alergias" cols="" rows="4" className='shadow resize-none rounded-md w-80'{...register('alergias')} />
              </section>
              <section className='flex flex-col ml-5 mt-8'>
                <h4 className='text-[#344054] ml-8'>CONSTANTES FISIOLÓGICAS</h4>
                <div className='flex flex-row justify-start  mt-8'>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>TLLC <p className='text-red-500'>*</p> </label>
                    <input type="number" name="TLLC" id="TLLC" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('TLLC')} />
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Pulso <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Pulso" id="Pulso" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Pulso')} />
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>FC <p className='text-red-500'>*</p> </label>
                    <input type="text" name="FC" id="FC" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FC')} />
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>FR <p className='text-red-500'>*</p> </label>
                    <input type="text" name="FR" id="FR" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FR')} />
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Temperatura <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Temperatura" id="Temperatura" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Temperatura')} />
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Peso <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Peso" id="Peso" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Peso')} />
                  </div>
                </div>
                <SystemDeseaseComponent
                  onSubmit={handleSystemChange}
                  onEnfermedadChange={handleEnfermedadChange}
                />
              </section>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[90%]'></div>
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
                <div>
                  <h3 className=' my-4 text-[#eb5b27]'>Nombre de la mascota</h3>
                  <div className='flex flex-row'>
                    <p className='text-[#344054]'>Especie</p>
                    <span className=' mx-4 text-[#344054]'>/</span>
                    <p className='text-[#344054]'> Raza</p>
                  </div>
                  <span className=' mt-4 font-extralight'>Edad</span>
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