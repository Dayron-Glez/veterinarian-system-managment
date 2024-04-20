import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ECOP_IMG from '../assets/ecop_image.png'
import ECOP_IMG2 from '../assets/eccop_image_2.png'
import ADD_IMG from '../assets/añadir.png'
import LogoComponent from '../components/LogoComponent'
import notificationIcon from '../assets/notificationIcon.svg'
import SystemDeseaseComponent from '../components/SystemDeseaseComponent'
import { GeneralComponent } from '../components/ECOP/GeneralComponent'
import { ConstantesFComponent } from '../components/ECOP/ConstantesFComponent';
import { ExamenCComponent } from '../components/ECOP/ExamenCComponent';
import { MucosasComponent } from '../components/ECOP/MucosasComponent';
import { ProblemComponent } from '../components/ECOP/ProblemComponent';
import { DiagnosticComponent } from '../components/ECOP/DiagnosticComponent';
import { TerapeuticComponent } from '../components/ECOP/TerapeuticComponent';
import {
handleButtonClickDesease,
handleButtonClickProblem,
handleButtonClickDiagnostic,
handleButtonClickTerapeutic,
handleButtonClickPasantes
} from '../components/utils/buttonHandlers';
import { onSubmit } from '../components/utils/formHandler';
import { NódulosComponent } from '../components/ECOP/NódulosComponent';
import { EstadoPComponent } from '../components/ECOP/EstadoPComponent';
import { PasantesComponent } from '../components/ECOP/PasantesComponent';
import { ToastContainer} from 'react-toastify'
import { Link } from 'react-router-dom';

const EcopPage = () => {
  // const [mascotas, setMascotas] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [mascota, setMascota] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const { register, handleSubmit, reset, watch, control,setValue } = useForm()
  // eslint-disable-next-line no-unused-vars
  const [sistema, setSistema] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [treatment, setTreatment] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [exam, setExam] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [enfermedad, setEnfermedad] = useState(null);
  const [deseaseComponents, setDeseaseComponents] = useState([{}]);
  const [problemsComponents, setProblemsComponents] = useState([{}]);
  const [diagnosticComponents, setDiagnosticComponents] = useState([{}]);
  const [terapeuticComponents, setTerapeuticComponents] = useState([{}]);
  const [pasantesComponents, setPasantesComponents] = useState([{}]);

  const handleSystemChange = (sistemaSeleccionado) => {
    setSistema(sistemaSeleccionado);
  };
  const handleTreatmentChange = (sistemaSeleccionado) => {
    setTreatment(sistemaSeleccionado);
  };
  const handleExamChange = (sistemaSeleccionado) => {
    setExam(sistemaSeleccionado);
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

  // useEffect(() => {
  //   const obtenerDatos = () => {
  //     const fechaActual = new Date().toLocaleDateString('en-CA');
  //     console.log(fechaActual);
  //     axios.get(`https://h3h9qmcq-8000.use2.devtunnels.ms/doctor/agenda/${fechaActual}/`)
  //       .then(res => {
  //         setMascotas(res.data);
  //         setMascota(res.data[0]); // Guarda la primera mascota en el estado
  //       })
  //       .catch(err => console.error(err));
  //   };

  //   obtenerDatos(); // Ejecutar al montar el componente
    
  // }, []);

  useEffect(() => {
    const mascotaStorage = localStorage.getItem('mascotaSeleccionada');
    if (mascotaStorage) {
      setMascotaSeleccionada(JSON.parse(mascotaStorage));
    }
  }, []);
  const onSubmitHandler = (data) => {
    const sistemas = deseaseComponents.map((_, index) => {
      return {
        sistema: data[`sistema${index}`].value,
        enfermedad: data[`enfermedad${index}`].value,
        organo: data[`organoAfectado${index}`],
        observacion: data[`observation_enfermedad_organo${index}`],
      };
    });

    const problemas = problemsComponents.map((_, index) => {
      return {
        problema: data[`problema${index}`],
        maestra: data[`problema_maestra${index}`],
        diagnostico_diferencial: data[`diagnostico_diferencial${index}`],
      };
    });

    const diagnosticos = diagnosticComponents.map((_, index) => {
      return {
        tipo_examen: data[`tipo_examen${index}`] ? data[`tipo_examen${index}`].value : null,
        autorizado: data[`autorizacion_examen${index}`],
        fecha: data[`fecha_pland${index}`],
        laboratorio: data[`laboratorio${index}`],
        resultados: data[`resultados_lab${index}`],
      };
    });

    const planes_terapeuticos = terapeuticComponents.map((_, index) => {
      return {
        tratamiento: data[`tipo_tratamiento${index}`] ? data[`tipo_tratamiento${index}`].value : null,
        principio_activo: data[`principio_activo${index}`],
        presentacion: data[`presentacion${index}`],
        posologia: data[`posologia${index}`],
        dosis_total: data[`dosis_total${index}`],
        via: data[`via${index}`],
        frecuencia: data[`frecuencia${index}`],
        duracion: data[`duracion${index}`],
      };
    });

    const pasantes = pasantesComponents.map((_, index) => {
      return {
        nombre: data[`nombre_y_apellidos${index}`],
        dni: data[`documento${index}`], //era documento
        semestre: data[`semestre${index}`],
        // firmaAuth: data[`firmaAuth${index}`],
        // firmaMVZ: data[`firmaMVZ${index}`],
        
      };
    });

    onSubmit(data, watchAlimentacion, watchHabitat, mascotaSeleccionada, sistemas, problemas, diagnosticos, planes_terapeuticos,pasantes, reset);
    setDeseaseComponents([{}]);
    setProblemsComponents([{}]);
    setDiagnosticComponents([{}]);
    setTerapeuticComponents([{}]);
    setPasantesComponents([{}]);
  }
  const onButtonClickDesease = () => handleButtonClickDesease(deseaseComponents, setDeseaseComponents, handleSystemChange, handleEnfermedadChange);
  const onButtonClickProblem = () => handleButtonClickProblem(problemsComponents, setProblemsComponents);
  const onButtonClickDiagnostic = () => handleButtonClickDiagnostic(diagnosticComponents, setDiagnosticComponents);
  const onButtonClickTerapeutic = () => handleButtonClickTerapeutic(terapeuticComponents, setTerapeuticComponents);
  const onButtonClickPasantes = () => handleButtonClickPasantes(pasantesComponents, setPasantesComponents);

  return (
    <>
      <div className='flex flex-col'>
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
          <div className='flex flex-row h-[5vh] bg-[#eb5b27] items-center'>
            <li className=' flex flex-row list-none ml-12'>
              <Link to={'/DoctorPage'} className=' no-underline text-white text-lg'>Inicio</Link>
            </li>
            
          </div>
        </nav>
        <ToastContainer/>
        <div className='flex flex-row h-full w-full '>
          <main className='flex flex-col h-[100vh] w-[77vw] overflow-auto scrollbar scrollbar-thumb-gray-500 scrollbar-thin scrollbar-thumb-rounded'>
            <section className='  flex flex-col mt-8 ml-8'>
              <div className=' flex flex-row place-items-center'>
                <img src={ECOP_IMG} alt="ECOP Image" className=' size-8' />
                <h2 className='text-[#344054] font-bold ml-1'>ECOP</h2>
              </div>
              <div className=' mt-4 border-[1px] border-solid border-[#344054] h-0 w-[98%]'></div>
            </section>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <section className='fondo py-16'>
                <GeneralComponent register={register} />
              </section>
              <section className=' fondo'>
                <div className=' border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
                <ConstantesFComponent register={register} />
              </section>
              <section className='fondo'>
                <div className=' border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
                <ExamenCComponent register={register} />
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              </section>
              <section className='fondo'>
                <MucosasComponent register={register} />
              </section>
              <section className='fondo'>
                <NódulosComponent register={register} />
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              </section>
              <section className=' fondo py-8'>
                <div className=' ml-16'>
                  {deseaseComponents.map((_, index) => (
                    <SystemDeseaseComponent
                      key={index}
                      index={index}
                      onSubmit={handleSystemChange}
                      onEnfermedadChange={handleEnfermedadChange}
                      register={register}
                      control={control}
                    />
                  ))}
                  <button type='button' onClick={onButtonClickDesease} className=' mt-4 bg-transparent border-none '>
                    <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none' />
                  </button>
                </div>
              </section>
              <section className=' fondo'>
                <div className=' border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
                <section className=' flex flex-col ml-16 mt-16'>
                  <h3>LISTA DE PROBLEMAS</h3>
                  <div className=' flex flex-row mt-4'>
                    <p className=' font-semibold text-[#eb5b27]  pl-2 ml-4 w-80'>Lista de problemas</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-2 w-80'>Lista Maestra</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-14'>{`Diagnóstico Diferencial (DAMNVVIT)`}</p>
                  </div>

                  {problemsComponents.map((_, index) => (
                    <ProblemComponent
                      key={index}
                      index={index}
                      register={register}
                    />
                  ))}
                  <button type='button' onClick={onButtonClickProblem} className=' bg-transparent border-none place-self-start mt-8  '>
                    <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none' />
                  </button>
                </section>
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              </section>
              <section className=' fondo'>
                <section className='flex flex-col ml-16 py-8'>
                  <h3 className=' mb-4'>PLAN DIAGN&Oacute;STICO</h3>
                  {diagnosticComponents.map((_, index) => (
                    <DiagnosticComponent
                      key={index}
                      index={index}
                      register={register}
                      onSubmit={handleExamChange}
                      control={control}
                    />
                  ))}
                  <button type='button' onClick={onButtonClickDiagnostic} className=' bg-transparent border-none place-self-start mt-8  '>
                    <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none' />
                  </button>
                </section>
              </section>
              <section className=' fondo'>
                <div className=' border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
                <section className=' flex flex-col ml-16 mt-8'>
                  <h3 className=' mb-8'>PLAN TERAP&Eacute;UTICO</h3>
                  <div className=' border-[1px] border-solid border-[#b5b7ba] h-0 my-2 w-[100%]' />


                  {terapeuticComponents.map((_, index) => (
                    <TerapeuticComponent
                      key={index}
                      index={index}
                      register={register}
                      control={control}
                      onSubmit={handleTreatmentChange}
                    />
                  ))}
                  <button type='button' onClick={onButtonClickTerapeutic} className=' bg-transparent border-none place-self-start mt-8  '>
                    <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none' />
                  </button>
                </section>
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              </section>
              <section className=' fondo'>
                <EstadoPComponent register={register} />
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />

              </section>
              <section className=' fondo'>
                <section className=' flex flex-col ml-16 '>
                  <h3 className=' py-8'>{`Pasantes / Auxiliares / Rotantes`}</h3>

                  <div className=' flex flex-row mt-4'>
                    <p className=' font-semibold text-[#eb5b27]  pl-2 ml-4'>Nombre y apellidos</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-28'>Documento</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-28'>Semestre</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-28'>Firma del autorizado</p>
                    <p className=' font-semibold text-[#eb5b27] border-solid border-y-0 border-r-0 pl-2 ml-28'>Firma del MVZ</p>
                  </div>
        <div className=' border-[1px] border-solid border-[#b5b7ba] h-0  w-[100%] my-4' />

                  {pasantesComponents.map((_, index) => (
                    <PasantesComponent
                      key={index}
                      index={index}
                      register={register}
                      setValue={setValue}
                    />
                  ))}
                  <button type='button' onClick={onButtonClickPasantes} className=' bg-transparent border-none place-self-start mt-8  '>
                    <img src={ADD_IMG} alt="add iamge" className='size-8 bg-none' />
                  </button>
                </section>
                <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
              </section>
              <div className='flex flex-row justify-around mt-8'>
                <button onClick={() => { 
                  reset();
                  localStorage.removeItem('mascotaSeleccionada')
                
                }} className=' rounded-3xl h-10 w-36 mb-8'>Cancelar</button>
                <button type='submit' className=' bg-[#eb5b27] hover:bg-orange-500 text-white border-none rounded-3xl h-10 w-36 mb-8'>Guardar</button>
              </div>
            </form>
          </main>
          <aside className='flex flex-col justify-start w-[23zvw]  sticky top-0 h-screen '>
          <div className="absolute w-[2px] ml-4 border-[1px] inset-0 bg-[#a4a4a4]"></div>
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
            {/* <div className=' mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[95%] ml-4'></div>
            <h3 className=' mt-8 ml-12 text-[#344054]'>Citas programadas</h3>
            <div className=' ml-11 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[87%]'></div>
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

                      {mascota.edad}
                    </p>
                    <p>

                      {mascota.id + ' id'}
                    </p>
                  </div>
                </button>
              ))}
            </div> */}
          </aside>
        </div>
      </div>
    </>
  )
}

export default EcopPage