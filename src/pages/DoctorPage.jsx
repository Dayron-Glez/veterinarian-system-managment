import axios from 'axios'
import { useForm } from 'react-hook-form';

import LogoComponent from '../components/LogoComponent'
import notificationIcon from '../assets/notificationIcon.svg'
import {  useEffect } from 'react'
const DoctorPage = () => {
  const { register, handleSubmit, reset, getValues, control } = useForm()
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

  
  
  async function getPets() {


    try {
      const response = await axios.get('https://g8k31qc7-8000.use.devtunnels.ms/api/historia')
      console.log(response);
    } catch (error) {
      console.error(error);
    }

  }
  function onSubmit(data) {
    console.log(data);
    reset()
  }
  return (
    <>
      <div className='flex flex-col'>
        <nav className=' flex flex-col h-[14vh] w-full'>
          <section className='flex flex-col h-[7vh] bg-white justify-center'>
            <div className='flex flex-row justify-between'>
              {/* <img height={40} width={40} src={Logo} alt="Logo icon" className='mx-4 md:mx-8' /> */}
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
                  <textarea name="motivo" id="motivo" cols="70" rows="4" className='shadow rounded-md resize-none' {...register('motivo')}/>
                </div>
                <div className='flex flex-col'>
                  <label className='flex flex-row mb-2'>Anamnesis <p className='text-red-500'>*</p> </label>
                  <textarea name="anamnesis" id="anamnesis" cols="70" rows="4" className='shadow rounded-md resize-none' {...register('anamnesis')}/>
                </div>
              </section>
              <div className='flex flex-row'>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Estado reproductivo <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=' mx-8'>
                      <input type="radio" value="Castrado"  name="Estado-reproductivo" {...register('Estado-reproductivo')}/>
                      Castrado
                    </label>
                    <label>
                      <input type="radio" value="Gestación"  name="Estado-reproductivo" {...register('Estado-reproductivo')}/>
                      Gestación
                    </label>
                  </div>
                  <div className='flex flex-row'>
                    <label className=' mx-8'>
                      <input type="radio" value="Entero"  name="Estado-reproductivo" {...register('Estado-reproductivo')}/>
                      Entero
                    </label>
                    <label>
                      <input type="radio" value="Lactancia" name="Estado-reproductivo" {...register('Estado-reproductivo')}/>
                      Lactancia
                    </label>
                  </div>
                </section>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Alimentación <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=''>
                      <input type="radio" value="Balanceada"  name="Alimentación" {...register('Alimentación')}/>
                      Balanceada
                    </label>
                    <label>
                      <input type="radio" value="Mixta"  name="Alimentación" className='ml-4' {...register('Alimentación')}/>
                      Mixta
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className='flex'>
                      <input type="radio" value="Casera"  name="Alimentación" {...register('Alimentación')}/>
                      Casera
                    </label>
                    <div className='flex flex-row'>
                      <label>
                        <input type="radio" value="Otro"  name="Alimentación" {...register('Alimentación')}/>
                        Otro
                      </label>
                      <textarea name="otro1" id="otro1" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto' {...register('otro1')}/>
                    </div>
                  </div>
                </section>
                <section className=' flex flex-col ml-8 mt-8'>
                  <label className='flex flex-row mb-2'>Hábitat <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=''>
                      <input type="radio" value="Casa"  name="Hábitat" {...register('Hábitat')}/>
                      Casa
                    </label>
                    <label>
                      <input type="radio" value="Lote"  name="Hábitat" className='ml-4' {...register('Hábitat')}/>
                      Lote
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <label className='flex'>
                        <input type="radio" value="Finca" name="Hábitat" {...register('Hábitat')}/>
                        Finca
                      </label>
                      <label className='flex'>
                        <input type="radio" value="Tráiler"  name="Hábitat" className='ml-3' {...register('Hábitat')}/>
                        Tráiler
                      </label>
                    </div>
                    <div className='flex flex-row'>
                      <label>
                        <input type="radio" value="Otro"  name="Hábitat" {...register('Hábitat')}/>
                        Otro
                      </label>
                      <textarea name="otro2" id="otro2" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto'{...register('otro2')}/>
                    </div>
                  </div>
                </section>
              </div>
              <section className=' flex flex-col ml-5 mt-8'>
                <label className='flex flex-row mb-2'>Alergias <p className='text-red-500'>*</p> </label>
                <textarea name="alergias" id="alergias" cols="" rows="4" className='shadow resize-none rounded-md w-80'{...register('alergias')}/>
              </section>
              <section className='flex flex-col ml-5 mt-8'>
                <h4 className='text-[#344054] ml-8'>Constantes Fisiológicas</h4>
                <div className='flex flex-row justify-start  mt-8'>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>TLLC <p className='text-red-500'>*</p> </label>
                    <input type="text" name="TLLC" id="TLLC" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('TLLC')}/>
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Pulso <p className='text-red-500'>*</p> </label>
                    <input type="text" name="Pulso" id="Pulso" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Pulso')}/>
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>FC <p className='text-red-500'>*</p> </label>
                    <input type="text" name="FC" id="FC" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FC')}/>
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>FR <p className='text-red-500'>*</p> </label>
                    <input type="text" name="FR" id="FR" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FR')}/>
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Temperatura <p className='text-red-500'>*</p> </label>
                    <input type="text" name="Temperatura" id="Temperatura" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Temperatura')}/>
                  </div>
                  <div className='flex flex-col ml-8'>
                    <label className='flex flex-row mb-2'>Peso <p className='text-red-500'>*</p> </label>
                    <input type="text" name="Peso" id="Peso" className=' w-32 shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Peso')}/>
                  </div>
                </div>
              </section>
              <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[90%]'></div>
              <div className='flex flex-row justify-around mt-8'>
                <button className=' rounded-3xl h-10 w-36 mb-8'>Cancelar</button>
                <button type='submit' className=' bg-[#eb5b27] text-white border-none rounded-3xl h-10 w-36 mb-8'>Guardar</button>
              </div>
            </form>
          </main>
          <aside className=' w-[25vw]  sticky top-0 h-screen '>Aside</aside>
        </div>
      </div>
      {/* <button type="button" onClick={getPets}> get pet</button> */}
    </>
  )
}

export default DoctorPage