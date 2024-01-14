import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Select from 'react-select'

const ReceptionComponent = () => {
  const [formData, setFormData] = useState([]);


  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, getValues, control } = useForm()


  const handleUrgencyChange = (e) => {
    if (e.target.checked) {
      // Selecciona todos los inputs que no sean de tipo checkbox
      const inputs = document.querySelectorAll('input:not([type="checkbox"])');
      const pet_h2 = document.querySelector('#pet_h2')
      const observation_container = document.querySelector('#observation_container')
      observation_container.classList.remove('hidden')
      pet_h2.classList.add('hidden')
      // Agrega la clase 'hidden' a todos los inputs seleccionados
      inputs.forEach(input => {
        input.classList.add('hidden');
        input.required = false;
      });
    }
    else {
      // Selecciona todos los inputs que no sean de tipo checkbox
      const pet_h2 = document.querySelector('#pet_h2')
      const observation_container = document.querySelector('#observation_container')
      observation_container.classList.add('hidden')
      pet_h2.classList.remove('hidden')
      const inputs = document.querySelectorAll('input:not([type="checkbox"])');

      // Remueve la clase 'hidden' a todos los inputs seleccionados
      inputs.forEach(input => {
        input.classList.remove('hidden');
        input.required = true;
      });
    }
  }

  const onSubmit = (data) => {
    // setFormData(prevData => [...prevData, data]);
    // console.log(data)
    reset()
  };

  useEffect(() => {
    const modal = document.querySelector('#modal');
    const btnOpenModal = document.querySelector("#btn-open-modal");
    const btnCloseModal = document.querySelector('#btn-close-modal');

    btnOpenModal?.addEventListener('click', () => {
      modal.classList.remove('hidden')
    });

    btnCloseModal?.addEventListener('click', () => {
      modal.classList.add('hidden')
    });
  }, []);

  const handleAccept = () => {
    const data = getValues(); // Obtiene los valores actuales del formulario
    setFormData(prevData => [...prevData, data]);
    modal.classList.add('hidden')


  };
  useEffect(() => {
    console.log(formData);
  }, [formData]);



  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='client-pet-form flex flex-col'>
        <div className=' flex flex-col '>
          <h2>Cliente</h2>
          <input placeholder='Nombre del cliente' type="text" name="client_name" id="client_name"  {...register('client_name', {
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

          {errors.client_name && <span>{errors.client_name.message}</span>}

          <input placeholder='CI del cliente' type="text" name="DNI" id="DNI"  {...register('DNI', {
            required: {
              value: true,
              message: 'CI es un campo requerido'
            },
            autoComplete: 'off'
          })} />

          {errors.DNI && <span>{errors.DNI.message}</span>}

          <input placeholder='Número de teléfono' type="text" name="phone" id="phone"  {...register('phone', {
            required: {
              value: true,
              message: 'EL número de teléfono es un campo requerido'
            }
          })} />

          {errors.phone && <span>{errors.phone.message}</span>}

          <div className=' flex flex-row w-full justify-center gap-2'>
            <button type='button' id='btn-open-modal'>Añadir Mascota</button>
            <button type='submit'>Enviar</button>
          </div>
        </div>
        <div id='modal' className=' border-none w-[800px] rounded-md flex-col hidden z-50 absolute'>
          <div>
            <h2>Motivo de llegada</h2>
            <ul className=' flex flex-row list-none gap-2 pl-0'>

              <li>
                <label>
                  <input type="checkbox" name="Consulta" id="Consulta"{...register('Consulta')} />Consulta
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="Continuación" id="Continuación"{...register('Continuación')} />Continuación
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="Planificada" id="Planificada"{...register('Planificada')} />Planificada
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="Emergencia" id="Emergencia"{...register('Emergencia')} />Emergencia
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" name="urgency" id="urgency"{...register('urgency')} onChange={handleUrgencyChange} />Urgencia
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
                  />
                )}
              />
            </ul>
          </div>
          <div className='  flex-col hidden ' id='observation_container'>
            <h2>Observación</h2>
            <textarea name="observation_text" id="observation_text" cols="58" rows="6" {...register('observation_text')}></textarea>
          </div>
          <div className=' flex flex-col'>

            <h2 id='pet_h2'>Mascota</h2>
            <input placeholder='Nombre de la mascota' type="text" name="pet_name" id="pet_name"   {...register('pet_name', {
              required: {
                value: true,
                message: 'El nombre de la mascota es un campo requerido'
              }
            })} />
            {errors.pet_name && <span>{errors.pet_name.message}</span>}

            <input placeholder='Edad' type="text" name="age" id="age"   {...register('age', {
              autoComplete: {
                value: 'off'
              },
              required: {
                value: true,
                message: 'La edad es un campo requerido'
              }
            })} />

            {errors.age && <span>{errors.age.message}</span>}

            <input placeholder='Color' type="text" name="color" id="color"   {...register('color', {
              autoComplete: {
                value: 'off'
              },
              required: {
                value: true,
                message: 'El color es un campo requerido'
              }
            })} />

            {errors.color && <span>{errors.color.message}</span>}


            <input placeholder='Peso' type="number" name="weight" id="weight"  {...register('weight', {
              required: {
                value: true,
                message: "El peso es un campo requerido"
              }
            })} />

            {errors.weight && <span>{errors.weight.message}</span>}

            <input placeholder='Sexo' type="text" name="sex" id="sex"   {...register('sex', {
              autoComplete: {
                value: 'off'
              },
              required: {
                value: true,
                message: 'EL sexo es un campo requerido'
              }
            })} />

            {errors.sex && <span>{errors.sex.message}</span>}

            <input placeholder='Raza' type="text" name="race" id="race"   {...register('race', {
              autoComplete: {
                value: 'off'
              },
              required: {
                value: true,
                message: 'La raza es un campo requerido'
              }
            })} />

            {errors.race && <span>{errors.race.message}</span>}

            <input placeholder='Especie' type="text" name="species" id="species"   {...register('species', {
              autoComplete: {
                value: 'off'
              },
              required: {
                value: true,
                message: 'La especie es un campo requerido'
              }
            })} />

            {errors.species && <span>{errors.species.message}</span>}
          </div>
          <div className=' flex flex-row my-4'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="dateForm"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Controlled picker"
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
              <Controller
                name="HourForm"
                control={control}
                render={({ field }) => (
                  <TimePicker
                    label="With Time Clock"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    value={field.value}
                    onChange={(time) => field.onChange(time)}
                  />
                )}
              />
            </LocalizationProvider>
          </div>



          <div className=' flex flex-row justify-between py-4'>
            <button type='button' className='ml-10' onClick={handleAccept}>Aceptar</button>
            <button type='button' className='mr-10' id='btn-close-modal'>Cerrar</button>
          </div>

        </div>
        {formData.map((data, index) => (
          <div key={index}>
            <h2>Datos de  {data.pet_name}</h2>
            <p>Nombre de la mascota: {data.pet_name} </p>
            <p>Raza: {data.race}</p>
            <p>Peso: {data.weight} Kg</p>
          </div>
        ))}

      </form>
      <DevTool control={control} />
    </>
  )
}

export default ReceptionComponent