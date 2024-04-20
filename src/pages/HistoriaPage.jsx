import { useEffect, useState } from "react";
import LogoComponent from "../components/LogoComponent";
import notificationIcon from "../assets/notificationIcon.svg";
import ECOP_IMG from "../assets/ecop_image.png";
import ADD_IMG from "../assets/añadir.png";
import { Link } from "react-router-dom";

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

function HistoriaPage() {
  const [historia, setHistoria] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("historia");
    if (data) {
      setHistoria(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const data = localStorage.getItem("historia");
      if (data) {
        setHistoria(JSON.parse(data));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // function descargarPDF() {
  //   const doc = new jsPDF();

  //   doc.text("Historia de la Mascota", 10, 10);
  //   doc.text(`Nombre de la Mascota: ${historia.mascota[0].nombre_mascota}`, 10, 20);
  //   doc.text(`Motivo: ${historia.general[0].motivo_consulta}`, 10, 30);
  //   doc.text(`Consulta: ${historia.general[0].consulta}`, 10, 40);
  //   doc.text(`Anamnesis: ${historia.general[0].anamnesis}`, 10, 50);
  //   doc.text(`Estado Reproductivo: ${historia.general[0].estado_reproductivo}`, 10, 60);
  //   doc.text(`Habitat: ${historia.general[0].habitat}`, 10, 70);
  //   doc.text(`Alimentación: ${historia.general[0].alimentacion}`, 10, 80);
  //   doc.text(`Alergia: ${historia.general[0].alergias}`, 10, 90);
  //   doc.text(`TLLC: ${historia.general[0].tllc}`, 10, 100);
  //   doc.text(`Pulso: ${historia.general[0].pulso}`, 10, 110);
  //   doc.text(`FC: ${historia.general[0].fc}`, 10, 120);
  //   doc.text(`FR: ${historia.general[0].fr}`, 10, 130);
  //   doc.text(`Temperatura: ${historia.general[0].temperatura}`, 10, 140);
  //   doc.text(`Peso: ${historia.general[0].peso}`, 10, 150);
  //   doc.text(`Fecha: ${new Date(historia.general[0].fecha_consulta).toLocaleDateString()}`, 10, 160);
  //   doc.text(`ID de la Mascota: ${historia.general[0].mascota}`, 10, 170);
  //   doc.text(`Especie: ${historia.mascota[0].especie}`, 10, 180);
  //   doc.text(`Raza: ${historia.mascota[0].raza}`, 10, 190);
  //   doc.text(`Edad: ${historia.mascota[0].edad}`, 10, 200);
  //   doc.text(`Color: ${historia.mascota[0].color}`, 10, 210);
  //   doc.text(`Sexo: ${historia.mascota[0].sexo}`, 10, 220);
  //   doc.text(`Nombre del Tutor: ${historia.tutor[0].nombre_tutor}`, 10, 230);
  //   doc.text(`DNI del Tutor: ${historia.tutor[0].dni}`, 10, 240);
  //   doc.text(`Teléfono del Tutor: ${historia.tutor[0].telefono}`, 10, 250);

  //   doc.save(`historia de ${historia.mascota[0].nombre_mascota}.pdf`);
  // }

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
        <li className=' flex flex-row list-none ml-12'>
              <Link to={'/DoctorPage'} className=' no-underline text-white text-lg'>Inicio</Link>
            </li>
        </div>
      </nav>
      <section className=" flex flex-row">
        <div className=" flex flex-col w-full ml-8">
          {historia && (
            <div className=" flex flex-col">
              <div className=" flex flex-row place-items-center">
                <img src={ECOP_IMG} alt="ECOP Image" className=" size-8" />
                <h2 className="text-[#344054] font-bold ml-1">
                  Historia Clínica
                </h2>
              </div>
              <div className=" ml-16">
                <div className=" flex flex-row mt-8 mb-4">
                  <div className=" flex flex-col">
                    <p className=" text-xl text-[#344054]">
                      Nombre del paciente
                    </p>
                    <p className=" text-lg">
                      {historia.mascota[0].nombre_mascota}
                    </p>
                  </div>
                  <div className=" flex flex-col ml-[210px] ">
                    <p className="text-xl text-[#344054]">Nombre del Tutor</p>
                    <p className="text-lg">{historia.tutor[0].nombre_tutor}</p>
                  </div>
                </div>
                <section className=" flex flex-row">
                  <div>
                    <p className=" text-lg text-[#344054] mb-1">Especie</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                      {historia.mascota[0].especie}
                    </p>
                  </div>
                  <div className=" ml-16">
                    <p className=" text-lg text-[#344054] mb-1">Raza</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                      {historia.mascota[0].raza}
                    </p>
                  </div>
                  <div className=" ml-16">
                    <p className=" text-lg text-[#344054] mb-1">Edad</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                      {historia.mascota[0].edad}
                    </p>
                  </div>
                  <div className=" ml-16">
                    <p className=" text-lg text-[#344054] mb-1">Color</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                      {historia.mascota[0].color}
                    </p>
                  </div>
                  <div className=" ml-16">
                    <p className=" text-lg text-[#344054] mb-1">Sexo</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                      {historia.mascota[0].sexo}
                    </p>
                  </div>
                  <div className=" ml-16">
                    <p className=" text-lg text-[#344054] mb-1">Estado</p>
                    <p className=" bg-[#eb5b27] rounded-md  pl-1 text-white w-[125px] text-lg">
                    {historia?.general?.[0]?.estado}
                    </p>
                  </div>
                </section>
                <div className=" mt-10 border-[1px] border-solid border-[#cdd2db] h-0  w-[100%]" />

                <section className=" flex flex-row justify-between my-8 ">
                  <div className=" flex flex-col ">
                    <h3 className="text-[#344054] mb-2 text-xl">
                      Vacunaciones
                    </h3>
                    <div className=" flex flex-row border-2 border-solid border-[#cdd2db] py-4 px-6 rounded-xl">
                      <div className=" flex flex-col">
                        <div className=" flex flex-row">
                          <div>
                            <p className=" text-xl text-[#344054] mb-1">
                              Tipo de vacuna
                            </p>
                            <p className=" pl-1 w-[125px] text-lg">
                              {historia?.vacunaciones?.[0][0]?.tipo_vacuna}
                            </p>
                          </div>
                          <div className=" ml-8">
                            <p className=" text-xl text-[#344054] mb-1">
                              Producto
                            </p>
                            <p className=" pl-1 w-[125px] text-lg">
                              {historia?.vacunaciones?.[0][0]?.producto}
                            </p>
                          </div>
                          <div className=" flex items-end ml-8">
                            {historia?.vacunaciones?.[0][0]?.fecha && (

                              <button className=" border-[1px] border-[#eb5b27]  hover:bg-[#eb5b27] hover:text-white hover:border-transparent text-center rounded-md h-7 px-4 text-[#eb5b27] w-24 bg-transparent">
                                {new Date(
                                  historia.vacunaciones[0][0].fecha
                                ).toLocaleDateString()}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className=" border-none flex items-end mt-4 bg-transparent"
                    >
                      <img src={ADD_IMG} alt="add image" className=" size-7" />
                    </button>
                  </div>

                  <div className=" flex flex-col min-w-[50%] pl-8">
                    <h3 className="text-[#344054] mb-2 text-xl">
                      Desparacitaciones
                    </h3>
                    <div className=" flex flex-row border-2 border-solid border-[#cdd2db] py-4 px-6 rounded-xl">
                      <div className=" flex flex-col">
                        <div className="flex flex-row">
                          <div className=" flex flex-col">
                            <p className=" text-xl text-[#344054] mb-1">
                              Producto
                            </p>
                            <p className=" pl-1 w-[125px]  text-lg max-w-[144px]">
                              {historia?.desparacitaciones?.[0][0]?.producto}
                            </p>
                          </div>
                          <div className=" flex items-end ml-8">
                            {
                              historia?.desparacitaciones?.[0][0]?.fecha && (

                              <button className="border-[1px] border-[#eb5b27] hover:bg-[#eb5b27] hover:text-white hover:border-transparent text-center text-sm rounded-md h-7 px-4 text-[#eb5b27] mt-2 w-24 bg-transparent">
                                {new Date(
                                  historia.desparacitaciones[0][0].fecha
                                ).toLocaleDateString()}
                              </button>
                              )
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className=" border-none flex items-end mt-4 bg-transparent"
                    >
                      <img src={ADD_IMG} alt="add image" className=" size-7" />
                    </button>
                  </div>
                </section>
                <div className=" my-10 border-[1px] border-solid border-[#cdd2db] h-0  w-[100%]" />

                <div className=" flex flex-col ">
                  <h3 className="text-[#344054] mb-2 text-xl">ECOP</h3>
                  <div className=" flex flex-row border-2 border-solid border-[#cdd2db] py-4 px-6 rounded-xl">
                    <div className=" flex flex-col">
                      <div className=" flex flex-row">
                        <div>
                          <p className=" text-xl text-[#344054]">
                            TLLC
                          </p>
                          <p className=" text-lg">{historia?.general?.[0]?.tllc}</p>
                        </div>
                        <div className=" ml-14">
                          <p className=" text-xl text-[#344054]">
                          Pulso
                          </p>
                          <p className=" text-lg">
                          {historia?.general?.[0]?.pulso}
                          </p>
                        </div>

                        <div className=" ml-14">
                          <p className=" text-xl text-[#344054]">
                          FC
                          </p>
                          <p className=" text-lg">{historia?.general?.[0]?.fc}</p>
                        </div>

                        <div className=" ml-14">
                          <p className=" text-xl text-[#344054]">
                          FR
                          </p>
                          <p className=" text-lg">{historia?.general?.[0]?.fr}</p>
                        </div>

                        <div className=" ml-14">
                          <p className=" text-xl text-[#344054]">
                          Temperaura
                          </p>
                          <p className=" text-lg">{historia?.general?.[0]?.temperatura}</p>
                        </div>

                        <div className=" ml-14">
                          <p className=" text-xl text-[#344054]">
                          Peso
                          </p>
                          <p className=" text-lg">{historia?.general?.[0]?.peso}</p>
                        </div>
                        <div className=" flex items-end ml-8">
                          {historia?.vacunaciones?.[0][0]?.fecha && (

                            <button className=" border-[1px] border-[#eb5b27]  hover:bg-[#eb5b27] hover:text-white hover:border-transparent text-center rounded-md h-7 px-4 text-[#eb5b27] w-24 bg-transparent">
                              {new Date(
                                historia.vacunaciones[0][0].fecha
                              ).toLocaleDateString()}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className=" border-none flex items-end mt-4 bg-transparent"
                  >
                    <img src={ADD_IMG} alt="add image" className=" size-7" />
                  </button>
                </div>     
              </div>
            </div>
          )}
        </div>
        <aside className="flex flex-col justify-start w-[30vw]  sticky top-0 h-screen ">
          <div className="absolute w-[2px] ml-4 border-[1px] inset-0 bg-[#a4a4a4]"></div>
          <h3 className=" mt-8 ml-12 text-[#344054]">Evolución del paciente</h3>
          <div className=" ml-11 mt-1 border-[1px] border-solid border-[#a4a4a4] h-0 w-[87%]"></div>
          <div className="flex flex-col place-items-centers"></div>
        </aside>
      </section>
    </div>
  );
}

export default HistoriaPage;
