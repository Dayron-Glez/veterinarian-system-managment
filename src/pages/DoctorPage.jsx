import LogoComponent from "../components/LogoComponent";
import notificationIcon from "../assets/notificationIcon.svg";
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

let fecha = new Date();
let horas = fecha.getHours();
let minutos = fecha.getMinutes();
let ampm = horas >= 12 ? "PM" : "AM";
let opciones = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
let strFecha = fecha.toLocaleDateString("es-ES", opciones);

let partes = strFecha.split(" ");

partes = partes.map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1));

strFecha = partes.join(" ");

horas = horas % 12;
horas = horas ? horas : 12;
minutos = minutos < 10 ? "0" + minutos : minutos;
let strTiempo = horas + ":" + minutos + " " + ampm;

const DoctorPage = () => {
  const [inputData, setInputData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [clicked, setIsClicked] = useState(false);
  const [mascotaFiltrada, setMascotaFiltrada] = useState([]);
  const [tutorId, setTutorId] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [inputValueCitas, setInputValueCitas] = useState(null);
  const [arregloMascotasFiltradas, setArregloMascotasFiltradas] = useState([]);
  const [clickedButtonsDoctor, setClickedButtonsDoctor] = useState(() => {
    // Obtén el estado inicial de localStorage
    const saved2 = localStorage.getItem('clickedButtonsDoctor');
    const initialValue = JSON.parse(saved2);
    return initialValue || [{}];
  });
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState('');
  const [AlertmodalOpen, setAlertModalOpen] = useState(false);
  const [filtrarStatus, setFiltrarStatus] = useState(null);
  const navigate = useNavigate();
  function filtrarMascotas() {
    setIsClicked(true);
    axios
      .get(
        `https://mascolive.onrender.com/recepcion/filtrar/mascota/${tutorId}/`
      )
      .then((res2) => {
        setMascotaFiltrada(res2.data);
        console.log(res2.data);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }

  const  obtenerHistoria = (mascotaId, event) => {
    event.preventDefault();
    axios
      .get(
        `https://mascolive.onrender.com/recepcion/historia/${mascotaId}/`
      )
      .then((response) => {
        // Guarda los datos en el local storage en lugar de en el estado
        localStorage.setItem("historia", JSON.stringify(response.data));
        navigate('/detalleHistoria');
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
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
      .catch(err =>{
        console.log(err);
        setFiltrarStatus(404);
      }
      )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValueCitas])
  useEffect(() => {
    axios
      .get(
        `https://mascolive.onrender.com/recepcion/filtrar/tutor/${inputValue}/`
      )
      .then((res) => {
        setInputData(res.data);
        console.log(inputData);
        // Asume que res.data es un array y accede al primer elemento
        if (res.data[0]) {
          setTutorId(res.data[0].id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [inputValue]);

  useEffect(() => {
    // Almacena el estado de los botones en localStorage
    localStorage.setItem('clickedButtonsDoctor', JSON.stringify(clickedButtonsDoctor));
  }, [clickedButtonsDoctor]);
  useEffect(() => {
    const obtenerDatos = () => {
      const fechaActual = new Date().toLocaleDateString('en-CA');
      console.log(fechaActual);
      axios.get(`https://mascolive.onrender.com/doctor/agenda/${fechaActual}/`)
        .then(res => {
          setMascotas(res.data);
        })
        .catch(err => console.error(err));
    };

    obtenerDatos(); // Ejecutar al montar el componente
   
  }, []);
  useEffect(() => {
    // Navega a EcopPage cuando clickedButtonsDoctor se actualice
    if (clickedButtonsDoctor[mascotaSeleccionada.id]) {
      navigate('/EcopPage');
    }
  }, [clickedButtonsDoctor, mascotaSeleccionada, navigate]);

  const handleClick = mascota => {
    setMascotaSeleccionada(mascota);
    setAlertModalOpen(true);
  }; 
  const renderMascotas = () => {
    if (inputValueCitas !== '' && arregloMascotasFiltradas?.Mascotas?.[0] && filtrarStatus === 200) {
      return arregloMascotasFiltradas.Mascotas[0].map(pet => (
        !clickedButtonsDoctor[pet.id] && (

        <button onClick={() => {handleClick(pet)}} key={pet.id} className='flex flex-col my-2 w-[85%]  h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
          <div className=' flex flex-col p-2'>
            <p className=" flex  text-left">Nombre:{pet.nombre_mascota}</p>
            <p className=" flex  text-left">Especie:{pet.especie} </p>
          </div>
        </button>
        )
        
        
      ));
    } else  {
      return mascotas.map(mascota => (
        !clickedButtonsDoctor[mascota.id] && (
          <button key={mascota.id} onClick={() => handleClick(mascota)} className='flex flex-col my-2 w-[85%]  h-14 rounded-md border-[1px] border-solid border-[#eb5b27] bg-transparent hover:bg-[#eb5b27] hover:text-white outline-none'>
            <div className=' flex flex-col p-2'>
              <p className=' flex  text-md text-left'>Nombre: {mascota.nombre_mascota}</p>
              <p className=' flex  text-md text-left'>Especie:  {mascota.especie} </p>
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
      <nav className=" flex flex-col w-full">
        <section className="flex flex-col h-[7vh] bg-white justify-center">
          <div className="flex flex-row justify-between">
            <LogoComponent height={48} className=" mx-4 md:mx-8" />
            <div className="flex flex-col justify-center place-items-center">
              <p className="flex text-lg font-semibold">{strTiempo}</p>
              <p className="flex">{strFecha}</p>
            </div>
            <img
              height={32}
              width={32}
              src={notificationIcon}
              alt="notification Icon"
              className="mx-4 md:mx-8"
            />
          </div>
        </section>
        <div className="h-[4vh] bg-[#eb5b27]">
          
        </div>
      </nav>
      <div className=" flex flex-row">
      <aside className="flex flex-col justify-start w-[20vw]  sticky top-0 right-0 h-[85vh] ">
          <div className="absolute w-[2px] ml-64 border-[1px] inset-0 bg-[#a4a4a4]"></div>
          <h3 className=" mt-8 ml-6  text-[#344054]">Citas Programadas</h3>
          <div className=" mt-1 ml-6 border-[1px] border-solid border-[#a4a4a4] h-0 w-[85%]"></div>
          <div className="flex flex-col place-items-centers"></div>
          <input onChange={e => setInputValueCitas(e.target.value)} type="text" className=' w-[85%] h-6 my-4  ml-6 rounded-md border-[1px]' placeholder=' Buscar mascota' />
          <div className=' flex flex-col ml-6 w-[100%]'>

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
        <main className=" flex flex-col w-[80vw] items-center">
        {
            mascotaSeleccionada.nombre_mascota && AlertmodalOpen ? (
              <div className="fixed z-10 inset-0 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                  <div id='modal' className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden  transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="modal bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mx-4" id="modal-title">
                        Desea atender a esta mascota ?
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
                          setClickedButtonsDoctor(prevState => {
                            return { ...prevState, [mascotaSeleccionada.id]: true };
                          });
                          localStorage.setItem('mascotaSeleccionada', JSON.stringify(mascotaSeleccionada));
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
          <div className=" flex flex-col justify-center place-items-center items-center w-[50%]">
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              className=" w-full mt-4 h-10 rounded-md border-[1px]"
              placeholder="Buscar por usuario"
            />

            {inputValue && (
              <table className="table-auto w-full z-10 ">
                <thead className="bg-orange-600">
                  <tr className=" text-center">
                    <th className="  place-self-center h-10 text-white">
                      Nombre del tutor
                    </th>
                    <th className=" place-self-center h-10 text-white">CI</th>
                    <th className="  place-self-center h-10 text-white">
                      Telefono
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inputData.map((d, i) => {
                    return (
                      <tr
                        key={i}
                        className=" bg-white text-center text-black h-8"
                      >
                        <td>
                          <button
                            className=" w-32 h-6 rounded-md border-none bg-[#eb5b27] hover:bg-[#f6622d] text-white text-md"
                            onClick={() => {
                              filtrarMascotas();
                            }}
                            disabled={!inputData}
                          >
                            {d.nombre_tutor}
                          </button>
                        </td>
                        <td>{d.dni}</td>
                        <td>{d.telefono}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

            {clicked && (
              <div
                className="fixed z-10 inset-0 overflow-y-auto"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
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
          </div>
        </main>
        <aside className="flex flex-col justify-start w-[20vw]  sticky top-0  ">
          <div className="absolute w-[2px] border-[1px] inset-0 bg-[#a4a4a4]"></div>
          <h3 className=" mt-8 ml-12 text-[#344054]">Mascotas Atendidas</h3>
          <div className=" ml-11 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[87%]"></div>
          <div className="flex flex-col place-items-centers"></div>
        </aside>
      </div>
    </>
  );
};

export default DoctorPage;
