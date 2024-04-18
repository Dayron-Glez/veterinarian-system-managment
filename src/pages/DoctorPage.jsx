import LogoComponent from "../components/LogoComponent";
import notificationIcon from "../assets/notificationIcon.svg";
import { Link } from "react-router-dom";
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

  function filtrarMascotas() {
    setIsClicked(true);
    axios
      .get(
        `https://h3h9qmcq-8000.use2.devtunnels.ms/recepcion/filtrar/mascota/${tutorId}/`
      )
      .then((res2) => {
        setMascotaFiltrada(res2.data);
        console.log(res2.data);
      })
      .catch((err2) => {
        console.log(err2);
      });
  }

  function obtenerHistoria(mascotaId) {
    axios
      .get(
        `https://h3h9qmcq-8000.use2.devtunnels.ms/recepcion/historia/${mascotaId}/`
      )
      .then((response) => {
        // Guarda los datos en el local storage en lugar de en el estado
        localStorage.setItem("historia", JSON.stringify(response.data));
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    axios
      .get(
        `https://h3h9qmcq-8000.use2.devtunnels.ms/recepcion/filtrar/tutor/${inputValue}/`
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

  return (
    <div className="">
      <nav className=" flex flex-col h-[14vh] w-full">
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
          <div className=" flex flex-row h-full items-center">
            <Link className=" ml-8 no-underline text-md text-white cursor-pointer">
              Ruta 1
            </Link>
            <Link className=" ml-8 no-underline text-md text-white cursor-pointer">
              Ruta 2
            </Link>
            <Link className=" ml-8 no-underline text-md text-white cursor-pointer">
              Ruta 3
            </Link>
            <Link className=" ml-8 no-underline text-md text-white cursor-pointer">
              Ruta 4
            </Link>
          </div>
        </div>
      </nav>
      <div className=" flex flex-row">
        <main className=" flex flex-col w-full ml-8 items-center">
          <div className=" flex flex-col justify-center place-items-center items-center w-[50%]">
            <input
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
              className=" w-full mt-4 h-10 rounded-md"
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
                            <Link
                              key={i}
                              to="/detalleHistoria"
                              target="_blank"
                              className=" flex flex-col"
                              onClick={() => obtenerHistoria(d.id)}
                            >
                              <div className=" flex flex-row">
                                <p className=" text-lg mx-4">
                                  {d.nombre_mascota}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="button"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsClicked(false);
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
        <aside className="flex flex-col justify-start w-[30vw]  sticky top-0 h-screen ">
          <div className="absolute w-[2px] ml-4 border-[1px] inset-0 bg-[#a4a4a4]"></div>
          <h3 className=" mt-8 ml-12 text-[#344054]">Evolución del paciente</h3>
          <div className=" ml-11 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[87%]"></div>
          <div className="flex flex-col place-items-centers"></div>
        </aside>
      </div>
    </div>
  );
};

export default DoctorPage;
