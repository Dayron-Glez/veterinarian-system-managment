import { useState, useEffect } from 'react';
import axios from 'axios'
import { useForm } from 'react-hook-form';
import ECOP_IMG from '../assets/ecop_image.png'
import ECOP_IMG2 from '../assets/eccop_image_2.png'
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
    reset();
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
              <section className=' flex flex-col'>
                <h3 className=' pt-10 ml-16'>GENERAL</h3>
                <div className='flex flex-row ml-16 mt-4'>
                  <div className='flex flex-col'>
                    <label className='flex flex-row mb-2'>Motivo de consulta <p className='text-red-500'>*</p> </label>
                    <textarea name="motivo" id="motivo" cols="64" rows="5" className='shadow rounded-sm resize-none' {...register('motivo')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>Anamnesis <p className='text-red-500'>*</p> </label>
                    <textarea name="anamnesis" id="anamnesis" cols="64" rows="5" className='shadow rounded-sm resize-none' {...register('anamnesis')} />
                  </div>
                </div>
                <section className=' flex flex-row ml-16'>

                  <div className='flex flex-col mt-4'>
                    <div>
                      <h3 className=' mt-16 mb-8'>&Uacute;LTIMA VACUNACIÓN</h3>
                    </div>
                    <div className=' flex flex-row ml-[-14px]'>
                      <div className='flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Tipo de vacuna</label>
                        <textarea name="tipo_vacuna" id="tipo_vacuna" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Producto</label>
                        <textarea name="producto" id="producto" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Fecha</label>
                        <textarea name="fecha" id="fecha" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>
                    </div>
                  </div>


                  <div className=' flex flex-col mt-4 ml-10'>

                    <div>
                      <h3 className=' ml-[15px] mt-16 mb-8'>&Uacute;LTIMA DESPARACITACIÓN</h3>
                    </div>
                    <div className=' flex flex-row'>

                      <div className=' flex flex-col items-baseline'>
                        <label className='flex flex-row mb-2'>Producto</label>
                        <textarea name="producto" id="producto" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Fecha</label>
                        <textarea name="fecha" id="fecha" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>
                    </div>
                  </div>

                </section>
              </section>
              <div className='flex flex-row ml-16 mt-16'>
                <section className=' flex flex-col  mt-8'>
                  <label className='flex flex-row mb-2'>Estado reproductivo <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-8'>
                      <input type="radio" value="Castrado" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Castrado</span>
                    </label>
                    <label className='flex items-center'>
                      <input type="radio" value="Gestación" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Gestación</span>
                    </label>
                  </div>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-12'>
                      <input type="radio" value="Entero" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Entero</span>
                    </label>
                    <label className='flex items-center'>
                      <input type="radio" value="Lactancia" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Lactancia</span>
                    </label>
                  </div>

                </section>
                <section className=' flex flex-col ml-[136px] mt-8'>
                  <label className='flex flex-row mb-2'>Alimentación <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center'>
                      <input type="radio" value="Balanceada" name="Alimentación" {...register('Alimentación')} className='custom-radio' />
                      <span className=' ml-2'>Balanceada</span>
                    </label>
                    <label className=' flex items-center'>
                      <input type="radio" value="Mixta" name="Alimentación" className='ml-8 custom-radio' {...register('Alimentación')} />
                      <span className=' ml-2'>Mixta</span>
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className='flex items-center'>
                      <input type="radio" value="Casera" name="Alimentación" {...register('Alimentación')} className='custom-radio' />
                      <span className=' ml-2'>Casera</span>
                    </label>
                    <div className='flex flex-row mt-4'>
                      <label className=' flex items-center'>
                        <input type="radio" value="Otro1" name="Alimentación" {...register('Alimentación')} className=' custom-radio' />
                        <span>Otro</span>
                      </label>
                      <textarea name="otro1" id="otro1" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto' {...register('otro1')} />
                    </div>
                  </div>
                </section>
                <section className=' flex flex-col ml-[165px] mt-8'>
                  <label className='flex flex-row mb-2'>Hábitat <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=' flex items-center'>
                      <input type="radio" value="Casa" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                      <span className=' ml-2'>Casa</span>
                    </label>
                    <label className=' flex items-center'>
                      <input type="radio" value="Lote" name="Hábitat" className='ml-8 custom-radio' {...register('Hábitat')} />
                      <span className=' ml-2'>Lote</span>
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <label className='flex items-center'>
                        <input type="radio" value="Finca" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                        <span className=' ml-2'>Finca</span>
                      </label>
                      <label className='flex items-center'>
                        <input type="radio" value="Tráiler" name="Hábitat" className='ml-7 custom-radio' {...register('Hábitat')} />
                        <span className=' ml-2'>Tráiler</span>
                      </label>
                    </div>
                    <div className='flex flex-row mt-4'>
                      <label className=' flex items-center'>
                        <input type="radio" value="Otro2" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                        <span className=' ml-2'>Otro</span>
                      </label>
                      <textarea name="otro2" id="otro2" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto'{...register('otro2')} />
                    </div>
                  </div>
                </section>
              </div>
              <div className=' flex flex-row flex-wrap ml-12 mt-16'>
                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Alergias <p className='text-red-500'>*</p> </label>
                  <textarea name="alergias" id="alergias" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('alergias')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Enfermedades anteriores <p className='text-red-500'>*</p> </label>
                  <textarea name="enfermedades" id="enfermedades" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('enfermedades')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Antecedentes familiares <p className='text-red-500'>*</p> </label>
                  <textarea name="antecedentes" id="antecedentes" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('antecedentes')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Cirugías <p className='text-red-500'>*</p> </label>
                  <textarea name="cirugías" id="cirugías" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('cirugías')} />
                </section>
              </div>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]'/>
              <section className='flex flex-col ml-8 mt-8'>
                <h4 className='text-[#344054] ml-8'>CONSTANTES FISIOLÓGICAS</h4>
                <div className='flex flex-row justify-start  mt-8'>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>TLLC <p className='text-red-500'>*</p> </label>
                    <input type="number" name="TLLC" id="TLLC" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('TLLC')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>Pulso <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Pulso" id="Pulso" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Pulso')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>FC <p className='text-red-500'>*</p> </label>
                    <input type="number" name="FC" id="FC" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FC')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>FR <p className='text-red-500'>*</p> </label>
                    <input type="number" name="FR" id="FR" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FR')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>{`Temperatura [C`}&deg;{`]`} <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Temperatura" id="Temperatura" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Temperatura')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>{`Peso [kg/lbs]`} <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Peso" id="Peso" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Peso')} />
                  </div>
                </div>
                {/* <SystemDeseaseComponent
                  onSubmit={handleSystemChange}
                  onEnfermedadChange={handleEnfermedadChange}
                /> */}
              </section>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]'/>
              <div className=' flex flex-col ml-16 mt-16'>
                <h3>EXAMEN CLÍNICO</h3>
                <div className=' flex flex-row '>
                  <section className=' flex flex-col  mt-8'>
                      <label className='flex flex-row mb-2'>Actitud <p className='text-red-500'>*</p> </label>
                      <div className='flex flex-row'>
                        <label className='flex items-center mr-11'>
                          <input type="radio" value="Alerta" name="Actitud" {...register('Actitud')} className='custom-radio' />
                          <span className="ml-2">Alerta</span>
                        </label>
                        <label className='flex items-center'>
                          <input type="radio" value="Agresivo" name="Actitud" {...register('Actitud')} className='custom-radio' />
                          <span className="ml-2">Agresivo</span>
                        </label>
                      </div>
                      <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Depresivo" name="Actitud" {...register('Actitud')} className='custom-radio' />
                          <span className="ml-2">Depresivo</span>
                        </label>
                        <label className='flex items-center'>
                          <input type="radio" value="Comatoso" name="Actitud" {...register('Actitud')} className='custom-radio' />
                          <span className="ml-2">Comatoso</span>
                        </label>
                      </div>
                    </section>

                    <section className=' flex flex-col  mt-8 ml-36'>
                      <label className='flex flex-row mb-2'>Condición corporal <p className='text-red-500'>*</p> </label>
                      <div className=' flex flex-col'>

                        <div className='flex flex-row'>
                          <label className='flex items-center mr-11'>
                            <input type="radio" value="Caquético" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                            <span className="ml-2">Caquético</span>
                          </label>
                          <label className='flex items-center'>
                            <input type="radio" value="Delgado" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                            <span className="ml-2">Delgado</span>
                          </label>
                      </div>
                          <div>
                          <label className='flex items-center'>
                            <input type="radio" value="Normal" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                            <span className="ml-2">Normal</span>
                          </label>
                          </div>
                      </div>
                      <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Sobrepeso" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                          <span className="ml-2">Sobrepeso</span>
                        </label>
                        <label className='flex items-center ml-[22px]'>
                          <input type="radio" value="Obeso" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                          <span className="ml-2">Obeso</span>
                        </label>
                      </div>
                    </section>

                    <section className=' flex flex-col  mt-8 ml-40'>
                      <label className='flex flex-row mb-2'>Hidratación <p className='text-red-500'>*</p> </label>
                      <div className=' flex flex-col'>

                        <div className='flex flex-row'>
                          <label className='flex items-center mr-11'>
                            <input type="radio" value="Normal" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                            <span className="ml-2">Normal</span>
                          </label>
                          <label className='flex items-center ml-[46px]'>
                            <input type="radio" value="d_0_5" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                            <span className="ml-2">{`Deshidratación 0-5%`}</span>
                          </label>
                      </div>
                          <div className=' flex flex-row'>
                            <label className='flex items-center'>
                              <input type="radio" value="d_6_7" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                              <span className="ml-2">{`Deshidratación 6-7%`}</span>
                            </label>
                            <label className='flex items-center ml-1 '>
                              <input type="radio" value="d_8_9" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                              <span className="ml-2">{`Deshidratación 8-9%`}</span>
                            </label>
                          </div>
                      </div>
                      <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="d_+10" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                          <span className="ml-2">{`Deshidratación +10%`}</span>
                        </label>
                      </div>
                    </section>
                </div>
              </div>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]'/>
              <div className=' flex flex-row ml-16 mt-16'>
                <section className=' flex flex-col'>
                  <label className='flex flex-row mb-6'>Mucosa Conjuntival <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Normal" name="mucosa_conjuntival" {...register('mucosa_conjuntival')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>

                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Alterada" name="mucosa_conjuntival" {...register('mucosa_conjuntival')} className='custom-radio' />
                          <span className="ml-2">Alterada</span>
                        </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_conjuntival" id="observation_mucosa_conjuntival" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_conjuntival')} />
                  </div>
                </section>
                <section className=' ml-6'>
                <label className='flex flex-row mb-6'>Mucosa Vulvar/Prepucial <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Normal" name="mucosa_vulvar_prepucial" {...register('mucosa_vulvar_prepucial')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>

                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Alterada" name="mucosa_vulvar_prepucial" {...register('mucosa_vulvar_prepucial')} className='custom-radio' />
                          <span className="ml-2">Alterada</span>
                        </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_vulvar_prepucial" id="observation_mucosa_vulvar_prepucial" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_vulvar_prepucial')} />
                  </div>
                </section>
                <section className=' ml-12'>
                <label className='flex flex-row mb-6'>Mucosa Rectal <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Normal" name="mucosa_rectal" {...register('mucosa_rectal')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>

                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Alterada" name="mucosa_rectal" {...register('mucosa_rectal')} className='custom-radio' />
                          <span className="ml-2">Alterada</span>
                        </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_rectal" id="observation_mucosa_rectal" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_rectal')} />
                  </div>
                </section>
              </div>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]'/>
              <div className=' flex flex-row ml-16 mt-16'>
              <section className=' flex flex-col'>
                  <label className='flex flex-row mb-6'>Nódulos linfáticos <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Normal" name="nodulos_linfaticos" {...register('nodulos_linfaticos')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>

                        <label className='flex items-center mr-5'>
                          <input type="radio" value="Alterada" name="nodulos_linfaticos" {...register('nodulos_linfaticos')} className='custom-radio' />
                          <span className="ml-2">Alterada</span>
                        </label>
                  </div>
                </section>
                  <div className=' ml-[150px]'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_nodulos_linfaticos" id="observation_nodulos_linfaticos" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_nodulos_linfaticos')} />
                  </div>
              </div>
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