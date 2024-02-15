import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
// import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Select from 'react-select'

const ReceptionPage = () => {
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState([]);
  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [clienteData, setClienteData] = useState(null);
  const [mascotasData, setMascotasData] = useState([]);
  // const [mascotaActual, setMascotaActual] = useState(null);
  // const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  
  
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, getValues, control } = useForm()
  useEffect(() => {
    if (isSubmitting && selectedCheckbox !== null) {
      const formData = getValues();
      formData.consulta = selectedCheckbox;
      onSubmit(formData);
      setIsSubmitting(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCheckbox, isSubmitting, getValues]);

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      setSelectedCheckbox(e.target.name);
    } else if (selectedCheckbox === e.target.name) {
      setSelectedCheckbox(null);
    }
  };
  

  const handleUrgencyChange = (e) => {
    // Selecciona todos los inputs que no sean de tipo checkbox
    const inputs = document.querySelectorAll('input:not([type="checkbox"])');
    const pet_h2 = document.querySelector('#pet_h2')
    const observation_container = document.querySelector('#observation_container')
    const specializedSelect = document.querySelector('#specialized')
  
    if (e.target.checked) {
      setSelectedCheckbox(e.target.name);
  
      pet_h2.classList.add('hidden')
      observation_container.classList.remove('hidden')
      specializedSelect.classList.add('hidden')
  
      // Agrega la clase 'hidden' a todos los inputs seleccionados
      inputs.forEach(input => {
        input.classList.add('hidden');
      });
  
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
      setSelectedCheckbox(null); // Si "Urgencia" se deselecciona, borra el valor de selectedCheckbox
  
      pet_h2.classList.remove('hidden')
      observation_container.classList.add('hidden')
      specializedSelect.classList.remove('hidden')
  
      // Remueve la clase 'hidden' de todos los inputs seleccionados
      inputs.forEach(input => {
        input.classList.remove('hidden');
      });
    }
  };
  

  // eslint-disable-next-line no-unused-vars
  // const onSubmit = (formData) => {

  //   console.log('la form data es');
  //   console.log(formData);
  //   // reset()
  // };

  const agregarMascota = (data) => {
    console.log("agregarMascota iniciado", data);
    const newMascota = {
      nombre_mascota: data.nombre_mascota,
      especie: data.especie,
      raza: data.raza,
      edad: data.edad,
      color: data.color,
      sexo: data.sexo,
      historia: {
        consulta: selectedCheckbox, // Aquí se agrega el tipo de consulta seleccionado
        fecha: data.dateForm,
       
        observation_text: data.observation_text,
      },
    };
    setMascotasData(prevMascotasData => [...prevMascotasData, newMascota]);
  
    console.log("agregarMascota terminado");
  };
  
  const onSubmit = (data) => {
    const dataToSend = Object.keys(formData).reduce((obj, key) => {
      if (!['Consulta', 'Continuación', 'Planificada', 'Emergencia', 'Urgencia'].includes(key)) {
        obj[key] = formData[key];
      }
      return obj;
    }, {});
    console.log("Fecha enviada: ", data.dateForm);
  console.log("Hora enviada: ", data.HourForm);

    dataToSend.consulta = selectedCheckbox;
    console.log(dataToSend);
    console.log("onSubmit iniciado", data);
  
    if (!clienteData) {
      console.log("setClienteData iniciado");
      setClienteData(data);
      console.log("setClienteData terminado");
    }
  
    // reset();
  
    console.log("onSubmit terminado");
  };
  
  const enviarDatos = () => {
    if (clienteData && mascotasData.length > 0) {
      const dataToSend = {
        nombre_tutor: clienteData.nombre_tutor,
        dni: clienteData.dni,
        telefono: clienteData.telefono,
        mascotas: mascotasData,
      };
  
      console.log("axios.post iniciado", dataToSend);
  
      axios.post('https://g8k31qc7-8000.use.devtunnels.ms/recepcion/registrar/', dataToSend)
        .then(response => {
          console.log("Respuesta de axios.post", response);
          setClienteData(null);
          setMascotasData([]);
        })
        .catch(error => {
          console.error("Error en axios.post", error);
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
    const modal = document.querySelector('#modal');
    const btnOpenModal = document.querySelector("#btn-open-modal");
    const btnCloseModal = document.querySelector('#btn-close-modal');

    btnOpenModal.addEventListener('click', () => {
      modal.classList.remove('hidden')
    });

    btnCloseModal.addEventListener('click', () => {
      modal.classList.add('hidden')
    });
  }, []);

  // const handleAccept = () => {
  //   const data = getValues(); // Obtiene los valores actuales del formulario
  //   setFormData(prevData => [...prevData, data]);
  //   // eslint-disable-next-line no-undef
  //   modal.classList.add('hidden')


  // };
  useEffect(() => {
    console.log(formData);
  }, [formData]);



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='client-pet-form flex '>
        <div className=' flex flex-col' id='client_form'>
          <h2>Cliente</h2>
          <input placeholder='Nombre del cliente' type="text" name="nombre_tutor" id="nombre_tutor"  {...register('nombre_tutor', {
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

          <input placeholder='CI del cliente' type="text" name="dni" id="dni"  {...register('dni', {
            required: {
              value: true,
              message: 'CI es un campo requerido'
            },
            autoComplete: 'off'
          })} />

          {errors.dni && <span>{errors.dni.message}</span>}

          <input placeholder='Número de teléfono' type="tel" name="telefono" id="telefono"  {...register('telefono', {
            required: {
              value: true,
              message: 'EL número de teléfono es un campo requerido'
            }
          })} />

          {errors.telefono && <span>{errors.telefono.message}</span>}

          <div className=' flex flex-row w-full justify-center gap-2'>
            <button  type='button' id='btn-open-modal'>Añadir Mascota</button>
            <button onClick={() => { console.log("Botón Enviar clickeado"); enviarDatos(); }} type='submit'>Enviar</button>
          </div>
        </div>
        <div id='modal' className=' border-none w-[800px] rounded-md flex-col hidden z-20'>
          <div>
            <h2>Motivo de llegada</h2>
            <ul className=' flex flex-row list-none gap-2 pl-0'>

              <li>
                <label>
                  <input type="checkbox" name='Consulta' {...register('Consulta')} onChange={handleCheckboxChange} />Consulta
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name='Continuación' {...register('Continuación')} onChange={handleCheckboxChange} />Continuación
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name='Planificada' {...register('Planificada')} onChange={handleCheckboxChange} />Planificada
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name='Emergencia' {...register('Emergencia')} onChange={handleCheckboxChange} />Emergencia
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="Urgencia" id="Urgencia"{...register('Urgencia')} onChange={handleUrgencyChange} />Urgencia
                </label>
              </li>
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
                    className=' w-[200px]'
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
          <div className=' flex flex-col'>

            <h2 id='pet_h2'>Mascota</h2>
            <input placeholder='Nombre de la mascota' type="text" name="nombre_mascota" id="nombre_mascota"   {...register('nombre_mascota', {
              required: selectedCheckbox!=='Urgencia' ? {
                value: true,
                message: 'El nombre de la mascota es un campo requerido'
              } : false
            })} />
            {errors.nombre_mascota && <span>{errors.nombre_mascota.message}</span>}

            <input placeholder='Edad' type='number' name="edad" id="edad"   {...register('edad', {
              autoComplete: {
                value: 'off'
              },
              required:selectedCheckbox!=='Urgencia' ?  {
                value: true,
                message: 'La edad es un campo requerido'
              } : false
            })} />

            {errors.edad && <span>{errors.edad.message}</span>}

            <input placeholder='Color' type="text" name="color" id="color"   {...register('color', {
              autoComplete: {
                value: 'off'
              },
              required:selectedCheckbox!=='Urgencia' ?  {
                value: true,
                message: 'El color es un campo requerido'
              } : false
            })} />

            {errors.color && <span>{errors.color.message}</span>}

            <input placeholder='Sexo' type="text" name="sexo" id="sexo"   {...register('sexo', {
              autoComplete: {
                value: 'off'
              },
              required:selectedCheckbox!=='Urgencia' ?  {
                value: true,
                message: 'EL sexo es un campo requerido'
              } : false
            })} />

            {errors.sexo && <span>{errors.sexo.message}</span>}

            <input placeholder='Raza' type="text" name="raza" id="raza"   {...register('raza', {
              autoComplete: {
                value: 'off'
              },
              required:selectedCheckbox!=='Urgencia' ?  {
                value: true,
                message: 'La raza es un campo requerido'
              } : false
            })} />

            {errors.raza && <span>{errors.raza.message}</span>}

            <input placeholder='Especie' type="text" name="especie" id="especie"   {...register('especie', {
              autoComplete: {
                value: 'off'
              },
              required:selectedCheckbox!=='Urgencia' ?  {
                value: true,
                message: 'La especie es un campo requerido'
              } : false
            })} />

            {errors.especie && <span>{errors.especie.message}</span>}
          </div>
          <div className=' flex flex-row my-4'>
            <input type="datetime-local" name="datetime-local" id="datetime-local" {...register('dateForm')} />
            {/* <LocalizationProvider >
            <Controller
            name="dateForm"
            control={control}
            defaultValue={fecha} // Aquí establecemos el valor por defecto
            render={({ field }) => (
              <DatePicker
                label="Fecha"
                value={field.value} // Aquí utilizamos el valor del formulario
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
<Controller
  name="HourForm"
  control={control}
  defaultValue={hora} // Aquí establecemos el valor por defecto
  render={({ field }) => (
    <TimePicker
      label="Hora"
      viewRenderers={{
        hours: renderTimeViewClock,
        minutes: renderTimeViewClock,
        seconds: renderTimeViewClock,
      }}
      value={field.value} // Aquí utilizamos el valor del formulario
      onChange={(time) => field.onChange(time)}
    />
  )}
/>
            </LocalizationProvider> */}
          </div>



          <div className=' flex flex-row justify-between py-4'>
            <button type='button' className='ml-10' onClick={() => {agregarMascota(getValues())}}>Aceptar</button>
            <button type='button' className='mr-10' id='btn-close-modal'>Cerrar</button>
          </div>

        </div>
        {formData.map((data, index) => (
          <div key={index}>
            <h2>Datos de  {data.pet_name}</h2>
            <p>Nombre de la mascota: {data.pet_name} </p>
            <p>Raza: {data.race}</p>
          </div>
        ))}

      </form>
      <DevTool control={control} />
    </>
  )
}

export default ReceptionPage


