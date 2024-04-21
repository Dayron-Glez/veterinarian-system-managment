/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
// import { DevTool } from '@hookform/devtools';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import LogoComponent from '../components/LogoComponent'
import notificationIcon from '../assets/notificationIcon.svg'
import ECOP_IMG2 from '../assets/eccop_image_2.png'
import { toast, ToastContainer } from 'react-toastify'
import Select from 'react-select'
import CustomToast from '../components/ToastComponent';

const ReceptionPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState([]);
  const [inputData, setInputData] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState(null);
  const [clienteData, setClienteData] = useState(null);
  const [mascotasData, setMascotasData] = useState([]);
  const [inputValue, setInputValue] = useState(null);
  const [inputValueCitas, setInputValueCitas] = useState(null);
  const [arregloMascotasFiltradas, setArregloMascotasFiltradas] = useState([]);
  const [mascotaFiltrada, setMascotaFiltrada] = useState([])
  const [clicked, setIsClicked] = useState(false);
  const [tutorId, setTutorId] = useState(null)
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [AlertmodalOpen, setAlertModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [mascota, setMascota] = useState(null);
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('');
  const [postEnviado, setPostEnviado] = useState(true);
  const [filtrarStatus, setFiltrarStatus] = useState(null);



  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, formState: { errors }, reset, getValues, control } = useForm()
  const divRef = useRef(null);
  const modalRef = useRef(null);
  const [clickedButtons, setClickedButtons] = useState(() => {
    // Obtén el estado inicial de localStorage
    const saved = localStorage.getItem('clickedButtons');
    const initialValue = JSON.parse(saved);
    return initialValue || [{}];
  });

  useEffect(() => {
    if (location.pathname === '/ReceptionPage') {
      localStorage.removeItem('historia');
    }
  }, [location]);

  useEffect(() => {
    axios.get(`https://mascolive.onrender.com/recepcion/filtrar/tutor/${inputValue}/`)
      .then(res => {
        setInputData(res.data);
        // Asume que res.data es un array y accede al primer elemento
        if (res.data[0]) {
          setTutorId(res.data[0].id);
        }
      })
      .catch(err => { console.log(err); })
  }, [inputValue])

  useEffect(() => {
    const fechaActual = new Date().toLocaleDateString('en-CA');
    axios.get(`https://mascolive.onrender.com/doctor/searchagenda/${fechaActual}/${inputValueCitas}/`)
      .then(res => {
        console.log(res.data);
        setArregloMascotasFiltradas(res.data);
        setFiltrarStatus(res.status);
        console.log('arreglo de mascotas: ', arregloMascotasFiltradas);
        // console.log(inputValueCitas);
      })
      .catch(err =>
        setFiltrarStatus(404)
      )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueCitas])



  useEffect(() => {
    if (modalOpen) {
      // Restablece los campos del formulario de mascotas
      reset({
        nombre_mascota: '',
        especie: '',
        raza: '',
        edad: '',
        color: '',
        sexo: '',
        tipo_consulta: '',
        fecha_consulta: '',
        observacion_urgencia: '',
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const handleClick = mascota => {
    setMascotaSeleccionada(mascota);
    setAlertModalOpen(true);
  };

  useEffect(() => {
    // Almacena el estado de los botones en localStorage
    localStorage.setItem('clickedButtons', JSON.stringify(clickedButtons));
  }, [clickedButtons]);

  const handleRadioChange = (e) => {
    const observation_container = document.querySelector('#observation_container')
    const specializedSelect = document.querySelector('#specialized')

    if (e.target.value === "Urgencia" && e.target.checked) {
      setSelectedRadio('Urgencia')
      observation_container.classList.remove('hidden');
      specializedSelect.classList.add('hidden');

      if (divRef.current) {
        divRef.current.classList.add('hidden');
      }



      // Resetea los campos del formulario de la mascota
      reset({
        nombre_mascota: '',
        edad: '',
        color: '',
        sexo: '',
        raza: '',
        especie: '',
      });
    } else {
      setSelectedRadio(null)
      observation_container.classList.add('hidden');
      specializedSelect.classList.remove('hidden');

      // Remueve la clase 'hidden' de todos los inputs, labels y span seleccionados
      if (divRef.current) {
        divRef.current.classList.remove('hidden');
      }

    }
  };


  const handleCloseModal = () => {
    // Obtén una referencia al modal
    const modal = document.getElementById('modal');

    // Agrega la clase de animación de salida
    modal.classList.remove('animate__fadeIn');

    modal.classList.add('animate__fadeOut');

    // Espera la duración de la animación y luego quita la clase de animación y cierra el modal
    setTimeout(() => {
      modal.classList.remove('animate__fadeOut');
      setModalOpen(false);
    }, 900);  // Reemplaza DURACION_DE_TU_ANIMACION con el tiempo que dura tu animación en milisegundos
  };

  function obtenerHistoria(mascotaId) {
    axios.get(`https://mascolive.onrender.com/recepcion/historia/${mascotaId}/`)
      .then(response => {
        // Guarda los datos en el local storage en lugar de en el estado
        localStorage.setItem('historia', JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch(err => console.log(err));
  }


  const agregarMascota = (data) => {
    console.log("agregarMascota iniciado", data);
    const newMascota = {
      nombre_mascota: data.nombre_mascota,
      especie: data.especie,
      raza: data.raza,
      edad: data.edad,
      color: data.color,
      sexo: data.sexo,
      tipo_consulta: data.tipo_consulta,
      fecha_consulta: data.dateForm,
      observacion_urgencia: data.observation_text,

    };
    setMascotasData(prevMascotasData => [...prevMascotasData, newMascota]);

    console.log("agregarMascota terminado", newMascota);
    setModalOpen(false);

  };

  const MascotaAgregada = ({ nombre, especie }) => (
    <div className=' flex flex-col my-8 bg-[#eb5b27] py-2 rounded-md w-[12vw] items-center'>
      <p className=' my-1 text-white text-lg'>Nombre: {nombre}</p>
      <p className=' my-1 text-white text-lg'>Especie: {especie}</p>
    </div>
  );

  const onSubmit = (data) => {

    if (!clienteData) {
      console.log("setClienteData iniciado");
      setClienteData(data);
      console.log("setClienteData terminado");
    }
    enviarDatos();



  };

  const enviarDatos = () => {
    if (clienteData && mascotasData.length > 0) {
      const dataToSend = {
        nombre_tutor: clienteData.nombre_tutor,
        dni: clienteData.dni,
        telefono: clienteData.telefono,
        mascotas: mascotasData,
        direccion: clienteData.direccion,
      };

      console.log("axios.post iniciado", dataToSend);

      const toastId = toast.info(<CustomToast />, {
        position: 'top-center',
        autoClose: false
      });
      setLoading(true);

      axios.post('https://mascolive.onrender.com/recepcion/registrar/', dataToSend)
        .then(response => {
          console.log("Respuesta de axios.post", response);
          toast.dismiss(toastId);
          toast.success("Datos enviados correctamente", { position: 'top-center' });
          setClienteData(null);
          setMascotasData([]);
          reset();
          console.log('mascotasData', mascotasData);
          setPostEnviado(true);
        })
        .catch(error => {
          console.error("Error en axios.post", error);
          toast.dismiss(toastId);
          toast.error('Algo falló en la petición', { position: 'top-center' });
          setMascotasData([]);
          reset();
          setPostEnviado(true);

        })
        .finally(() => {
          setLoading(false);
          setPostEnviado(false);

        });
      console.log("axios.post terminado");
    }
  };

  useEffect(() => {
    if (clienteData && mascotasData.length > 0) {
      enviarDatos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clienteData, mascotasData]);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  useEffect(() => {
    const obtenerDatos = () => {
      const fechaActual = new Date().toLocaleDateString('en-CA');
      console.log(fechaActual);
      axios.get(`https://mascolive.onrender.com/doctor/agenda/${fechaActual}/`)
        .then(res => {
          setMascotas(res.data);
          setMascota(res.data[0]); // Guarda la primera mascota en el estado
        })
        .catch(err => console.error(err));
    };

    obtenerDatos(); // Ejecutar al montar el componente
   
  }, [postEnviado]);

  function filtrarMascotas() {
    setIsClicked(true);
    axios.get(`https://mascolive.onrender.com/recepcion/filtrar/mascota/${tutorId}/`)
      .then(res2 => {
        setMascotaFiltrada(res2.data);
        console.log(res2.data);
      })
      .catch(err2 => { console.log(err2); })
  }

  useEffect(() => {
    renderMascotas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mascotas]);

  const renderMascotas = () => {
    if (inputValueCitas !== '' && arregloMascotasFiltradas?.Mascotas?.[0] && filtrarStatus === 200) {
      return arregloMascotasFiltradas.Mascotas[0].map(pet => (
        !clickedButtons[pet.id] && (

        <button onClick={() => {handleClick(pet)}} key={pet.id} className='flex flex-col my-2 w-[85%]  h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
          <div className=' flex flex-col'>
            <p>Nombre:{pet.nombre_mascota}</p>
            <p>Especie:{pet.especie} </p>
          </div>
        </button>
        )
        
        
      ));
    } else  {
      return mascotas.map(mascota => (
        !clickedButtons[mascota.id] && (
          <button key={mascota.id} onClick={() => handleClick(mascota)} className='flex flex-col my-2 w-[85%]  h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
            <div className=' flex flex-col p-2'>
              <p className=' flex pl-2 text-md'>Nombre: {mascota.nombre_mascota}</p>
              <p className=' flex pl-2 text-md'>Especie:  {mascota.especie} </p>
            </div>
          </button>
        )
      ));
    }
  };
  
  // Luego puedes llamar a esta función en tu renderizado:
  {renderMascotas()}
  


  return (
    <>

      <nav className=' flex flex-col w-full'>
        <section className='flex flex-col h-[7vh] bg-white justify-center'>
          <div className='flex flex-row justify-between items-center'>
            <LogoComponent height={48} className=' mx-4 md:mx-8' />
            <img height={28} width={28} src={notificationIcon} alt="notification Icon" className='mx-4 md:mx-8' />
          </div>
        </section>
        <div className=' flex flex-row h-[4vh] place-items-center bg-[#eb5b27]' />
      </nav>

      <div className=' flex flex-row'>
        <aside className="flex flex-col justify-start w-[20vw]  sticky top-0 right-0 h-[85vh] ">
          <div className="absolute w-[2px] ml-64 border-[1px] inset-0 bg-[#a4a4a4]"></div>
          <h3 className=" mt-8 ml-6  text-[#344054]">Citas Programadas</h3>
          <div className=" mt-1 ml-6 border-[1px] border-solid border-[#a4a4a4] h-0 w-[85%]"></div>
          <div className="flex flex-col place-items-centers"></div>
          <input onChange={e => setInputValueCitas(e.target.value)} type="text" className=' w-[85%] h-6 my-4  ml-6 rounded-md border-[1px]' placeholder=' Buscar mascota' />
          <div className=' flex flex-col ml-6'>

            {
              renderMascotas()
              // inputValueCitas !== '' && arregloMascotasFiltradas?.Mascotas?.[0] && filtrarStatus !== '404' ? (
              //   arregloMascotasFiltradas.Mascotas[0].map(pet => (
              //     <button key={pet.id} className=' my-2 w-[50%]  h-14 rounded-md border-[1px] flex flex-col bg-[#eb5b27] py-2  items-center justify-center'>
              //       <div className=' flex flex-col'>
              //         <p>Nombre:{pet.nombre_mascota}</p>
              //         <p>Especie:{pet.especie} </p>
              //       </div>
              //     </button>
              //   ))
              // ) : (
              //   estadoRegistrado &&  mascotas.map(mascota => (
              //     !clickedButtons[mascota.id] && (
              //       <button key={mascota.id} onClick={() => handleClick(mascota)} className=' my-2 w-[50%]  h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
              //         <div className='grid grid-cols-2'>
              //           <p>{mascota.nombre_mascota}</p>
              //           <p> {mascota.especie} </p>
              //         </div>
              //       </button>
              //     )
              //   ))
                
              // )
            }



          </div>
        </aside>

        <div className=' flex flex-col w-[80vw] items-center'>

          <ToastContainer className=' w-72 text-xl' />
          {
            mascotaSeleccionada.nombre_mascota && AlertmodalOpen ? (
              <div className="fixed z-10 inset-0 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div id='modal' className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="modal bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mx-4" id="modal-title">
                        Desea pasar esta mascota con el doctor ?
                      </h3>
                      <div className=' flex flex-col'>
                        <p className=' text-lg mx-4 mt-4 mb-2'>Nombre de la mascota: {mascotaSeleccionada.nombre_mascota}</p>
                        <p className=' text-lg mx-4  my-2'> Especie: {mascotaSeleccionada.especie}</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row justify-between">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#eb5b27] text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          setClickedButtons(prevState => {
                            return { ...prevState, [mascotaSeleccionada.id]: true };
                          });
                          setAlertModalOpen(false);
                        }}
                      >
                        Si
                      </button>
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#eb5b27] text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          setAlertModalOpen(false);
                          
                        }}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : null
          }
          <div className=' flex flex-col justify-center place-items-center items-center w-[50%]'>

            <input type="text" onChange={e => setInputValue(e.target.value)} className=' w-full mt-4 h-10 rounded-md border-[1px]' placeholder='Buscar por usuario' disabled={modalOpen} />

            {inputValue && (
              <table className="table-auto w-full z-10 ">
                <thead className="bg-orange-600">
                  <tr className=' text-center'>
                    <th className="  place-self-center h-10 text-white">Nombre del tutor</th>
                    <th className=" place-self-center h-10 text-white">CI</th>
                    <th className="  place-self-center h-10 text-white">Telefono</th>
                  </tr>
                </thead>
                <tbody>
                  {inputData.map((d, i) => {
                    return (
                      <tr key={i} className=' bg-white text-center text-black h-8'>
                        <td>
                          <button className=' w-32 h-6 rounded-md border-none bg-[#eb5b27] hover:bg-[#f6622d] text-white text-md' onClick={() => { filtrarMascotas() }} disabled={!inputData}>
                            {d.nombre_tutor}
                          </button>
                        </td>
                        <td>{d.dni}</td>
                        <td>{d.telefono}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}

          </div>

          {clicked && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Listado de mascotas
                    </h3>
                    <div>
                    {mascotaFiltrada.map((d, i) => {
                          return (
                            <button
                              key={i}
                              className=" flex flex-col no-underline m-2 rounded-md border-solid border-[1px]  cursor-pointer border-[#eb5b27] hover:bg-[#eb5b27] hover:text-white"
                              onClick={(event) => obtenerHistoria(d.id, event)}
                            >
                              <div className=" flex flex-row">
                                <p className=" text-[16px] mx-4 font-medium">
                                  {d.nombre_mascota}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#eb5b27] text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2  sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                      onClick={(event) => {
                        event.stopPropagation();
                        setIsClicked(false);
                      }}
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className='client-pet-form '>
            {!inputValue && (

              <div className=' justify-center items-center fixed mt-8 z-0' id='client_form'>
                <h2 className='text-[#344054] mb-4'>Cliente</h2>
                <label className='flex flex-row mb-2'>Nombre del cliente<p className='text-red-500'>*</p> </label>
                <input className='shadow rounded-md resize-none h-8 w-80 border-[1px]' placeholder='Ej.texto' type="text" name="nombre_tutor" id="nombre_tutor"  {...register('nombre_tutor', {
                  required: {
                    value: true,
                    message: 'Nombre del cliente es un campo requerido'
                  },
                  minLength: {
                    value: 3,
                    message: 'Mínimo de 3 caracteres'
                  },
                  maxLength: {
                    value: 30,
                    message: 'Máximo de 20 caracteres'
                  },
                  autoComplete: {
                    value: 'off'
                  }
                })} />

                {errors.nombre_tutor && <span>{errors.nombre_tutor.message}</span>}

                <label className='flex flex-row mb-2'>Carnet de identidad<p className='text-red-500'>*</p> </label>
                <input className='shadow rounded-md resize-none h-8 w-80 border-[1px]' placeholder='Ej.texto' type="text" name="dni" id="dni"  {...register('dni', {
                  required: {
                    value: true,
                    message: 'CI es un campo requerido'
                  },
                  autoComplete: 'off'
                })} />

                {errors.dni && <span>{errors.dni.message}</span>}


                <label className='flex flex-row mb-2'>Número de teléfono<p className='text-red-500'>*</p> </label>
                <input className='shadow rounded-md resize-none h-8 w-80 border-[1px]' placeholder='Ej.texto' type="tel" name="telefono" id="telefono"  {...register('telefono', {
                  required: {
                    value: true,
                    message: 'EL número de teléfono es un campo requerido'
                  }
                })} />

                <label className='flex flex-row mb-2'>Dirección<p className='text-red-500'>*</p> </label>
                <input className='shadow rounded-md resize-none h-8 w-80 border-[1px]' placeholder='Ej.texto' type="text" name="direccion" id="direccion"  {...register('direccion', {
                  required: {
                    value: true,
                    message: 'La direccion es un campo requerido'
                  }
                })} />

                {errors.telefono && <span>{errors.telefono.message}</span>}

                <div className='flex flex-row max-w-80 justify-center gap-10'>
                  <button className="bg-orange-600 hover:bg-orange-500 my-10 text-white h-8 w-40 rounded-md border-none shadow-md focus:ring cursor-pointer" onClick={() => { setModalOpen(true) }} type='button' id='btn-open-modal'>Añadir Mascota</button>
                  <button className="bg-orange-600 hover:bg-orange-500 my-10 text-white h-8 w-40 rounded-md border-none shadow-md focus:ring cursor-pointer" type='submit'>Enviar</button>
                </div>
              </div>
            )}

            <div ref={modalRef} id='modal' className={`bg-white border-none w-[900px] rounded-md flex flex-col  z-20 px-10 absolute top-20 ${modalOpen ? 'flex animate__animated animate__fadeIn ' : 'hidden'}`}>
              <div>
                <h2 className='text-[#344054] py-10'>Motivo de llegada</h2>
                <ul className=' flex flex-row  gap-2 pl-0 list-none  text-[#344054] border-2 space-x-4 items-baseline'>

                  <label className='flex items-center mr-8'>
                    <input type="radio" value="Consulta" name="tipo_consulta" {...register('tipo_consulta')} className='custom-radio' />
                    <span className="ml-2">Consulta</span>
                  </label>
                  <label className='flex items-center mr-8'>
                    <input type="radio" value="Continuación" name="tipo_consulta" {...register('tipo_consulta')} className='custom-radio' onChange={handleRadioChange} />
                    <span className="ml-2">Continuación</span>
                  </label>
                  <label className='flex items-center mr-8'>
                    <input type="radio" value="Planificada" name="tipo_consulta" {...register('tipo_consulta')} className='custom-radio' onChange={handleRadioChange} />
                    <span className="ml-2">Planificada</span>
                  </label>
                  <label className='flex items-center mr-8'>
                    <input type="radio" value="Emergencia" name="tipo_consulta" {...register('tipo_consulta')} className='custom-radio' onChange={handleRadioChange} />
                    <span className="ml-2">Emergencia</span>
                  </label>
                  <label className='flex items-center mr-8'>
                    <input type="radio" value="Urgencia" name="tipo_consulta" {...register('tipo_consulta')} className='custom-radio' onChange={handleRadioChange} />
                    <span className="ml-2">Urgencia</span>
                  </label>
                  <Controller
                    name="specialized"
                    control={control}

                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={[
                          { value: 'cardiología', label: 'Cardiología' },
                          { value: 'cirugía', label: 'Cirugía' },
                          { value: 'oftalmología', label: 'Oftalmología' },
                          { value: 'dermatología', label: 'Dermatología' },
                          { value: 'nutrición', label: 'Nutrición' },
                          { value: 'ortopedia', label: 'Ortopedia' },
                          { value: 'neurología', label: 'Neurología' },
                          { value: 'neonatología', label: 'Neonatología' },
                          { value: 'reproducción', label: 'Reproducción' },
                          { value: 'exóticos', label: 'Exóticos' },
                          { value: 'gerontología', label: 'Gerontología' },
                          { value: 'odontología', label: 'Odontología' },
                        ]}
                        onChange={option => field.onChange(option)}
                        placeholder='Especializadas'
                        isSearchable
                        isClearable
                        noOptionsMessage={() => 'No existe esa opción'}
                        styles={{
                          clearIndicator: (baseStyles) => ({
                            ...baseStyles,
                            color: 'red',

                          }),

                        }}
                        isMulti
                        className=' w-[200px] text-orange-600 border-none'
                        id='specialized'
                      />
                    )}
                  />
                </ul>
              </div>
              <div className='  flex-col hidden ' id='observation_container'>
                <h2>Observación</h2>
                <textarea name="observation_text" id="observation_text" cols="106" rows="6" {...register('observation_text')}></textarea>
              </div>
              <div ref={divRef} className=' flex flex-col'>

                <h2 className='text-[#344054] py-10' id='pet_h2'>Mascota</h2>
                <div className=' grid-cols-3 flex space-x-40 p-0'>
                  <div>
                    <label className='flex flex-row mb-2'>Nombre de la mascota<p className='text-red-500'>*</p> </label>
                    <input className='shadow rounded-md resize-none h-6 w-50' placeholder='Nombre de la mascota' type="text" name="nombre_mascota" id="nombre_mascota"   {...register('nombre_mascota', {
                      required: selectedRadio !== 'Urgencia' ? {
                        value: true,
                        message: 'El nombre de la mascota es un campo requerido'
                      } : false
                    })} />
                    {errors.nombre_mascota && <span>{errors.nombre_mascota.message}</span>}
                  </div>

                  <div className='grid-cols-3 flex space-x-3'>
                    <div>
                      <label className='flex flex-row mb-2'>Edad<p className='text-red-500'>*</p> </label>
                      <input className='shadow rounded-md resize-none h-6 w-20' placeholder='Ej.texto' type='text' name="edad" id="edad"   {...register('edad', {
                        autoComplete: {
                          value: 'off'
                        },
                        required: selectedRadio !== 'Urgencia' ? {
                          value: true,
                          message: 'La edad es un campo requerido'
                        } : false
                      })} />

                      {errors.edad && <span>{errors.edad.message}</span>}
                    </div>

                    <div><label className='flex flex-row mb-2'>Color<p className='text-red-500'>*</p> </label>
                      <input className='shadow rounded-md resize-none h-6 w-20' placeholder='Ej.texto' type="text" name="color" id="color"   {...register('color', {
                        autoComplete: {
                          value: 'off'
                        },
                        required: selectedRadio !== 'Urgencia' ? {
                          value: true,
                          message: 'El color es un campo requerido'
                        } : false
                      })} />

                      {errors.color && <span>{errors.color.message}</span>}
                    </div>

                    <div><label className='flex flex-row mb-2'>Sexo<p className='text-red-500'>*</p> </label>
                      <input className='shadow rounded-md resize-none h-6 w-20' placeholder='Ej.texto' type="text" name="sexo" id="sexo"   {...register('sexo', {
                        autoComplete: {
                          value: 'off'
                        },
                        required: selectedRadio !== 'Urgencia' ? {
                          value: true,
                          message: 'EL sexo es un campo requerido'
                        } : false
                      })} />

                      {errors.sexo && <span>{errors.sexo.message}</span>}
                    </div>
                  </div>
                </div>


                <div className='flex grid-cols-2 space-x-40'><div>
                  <label className='flex flex-row mb-2'>Raza<p className='text-red-500'>*</p> </label>
                  <input className='shadow rounded-md resize-none h-6 w-50' placeholder='Ej.texto' type="text" name="raza" id="raza"   {...register('raza', {
                    autoComplete: {
                      value: 'off'
                    },
                    required: selectedRadio !== 'Urgencia' ? {
                      value: true,
                      message: 'La raza es un campo requerido'
                    } : false
                  })} />

                  {errors.raza && <span>{errors.raza.message}</span>}
                </div>

                  <div><label className='flex flex-row mb-2'>Especie<p className='text-red-500'>*</p> </label>
                    <input className='shadow rounded-md resize-none h-6 w-50' placeholder='Ej.texto' type="text" name="especie" id="especie"   {...register('especie', {
                      autoComplete: {
                        value: 'off'
                      },
                      required: selectedRadio !== 'Urgencia' ? {
                        value: true,
                        message: 'La especie es un campo requerido'
                      } : false
                    })} />

                    {errors.especie && <span>{errors.especie.message}</span>}
                  </div>
                </div>
              </div>
              <div className=' flex flex-row my-4'>
                <input type="datetime-local" name="datetime-local" id="datetime-local" {...register('dateForm')} className='shadow rounded-md resize-none h-6 w-[165.6px]' />
              </div>
              <div className='flex flex-row justify-between'>
                <button type='button' className=' bg-[#eb5b27] hover:bg-orange-500 text-white border-none rounded-3xl h-10 w-36 mb-8 cursor-pointer' onClick={() => { agregarMascota(getValues()) }}>Aceptar</button>
                <button type='button' className=' bg-[#eb5b27] hover:bg-orange-500 text-white border-none rounded-3xl h-10 w-36 mb-8 cursor-pointer' onClick={() => { handleCloseModal() }} id='btn-close-modal'>Cerrar</button>
              </div>

            </div>


          </form>
        </div>
        <div className=' flex flex-col'>
          <aside className="flex flex-col justify-start w-[20vw]  sticky top-0 right-0 h-[85vh] ">
            <div className="absolute w-[2px] ml-4 border-[1px] inset-0 bg-[#a4a4a4]"></div>
            <h3 className=" mt-8 ml-12 text-[#344054]">Mascotas Agregadas</h3>
            <div className=" ml-11 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[85%]"></div>
            <div className="flex flex-col place-items-centers"></div>
            <div className=' flex flex-col items-center'>
              {mascotasData.map((mascota, index) => (
                <MascotaAgregada
                  key={index}
                  nombre={mascota.nombre_mascota}
                  sexo={mascota.sexo}
                  raza={mascota.raza}
                  especie={mascota.especie}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
      {/* <DevTool control={control} /> */}


    </>
  )
}

export default ReceptionPage


