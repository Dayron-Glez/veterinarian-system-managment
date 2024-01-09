import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useNavigate } from "react-router-dom";
const ReceptionComponent = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, reset, getValues, control } = useForm()

  const [formData, setFormData] = useState([]);

  const onSubmit = (data) => {
    // setFormData(prevData => [...prevData, data]);
    console.log(data)
    reset()
  };

  useEffect(() => {
    const btnOpenModal = document.querySelector("#btn-open-modal");
    const btnCloseModal = document.querySelector('#btn-close-modal');
    const modal = document.querySelector('#modal');
  
    btnOpenModal?.addEventListener('click', () => {
      modal.showModal();
    });
  
    btnCloseModal?.addEventListener('click', () => {
      modal.close();
    });
  }, []);
  const handleAccept = () => {
    const data = getValues(); // Obtiene los valores actuales del formulario
    setFormData(prevData => [...prevData, data]);
    modal.close()
    
    
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='client-pet-form flex flex-col'>
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
          <button type='button' id='btn-open-modal'>Add Pet</button>
          <button type='submit'>Submit</button>
        </div>
        <dialog id='modal' className=' border-none w-[500px]'>
          <div className=' flex flex-col'>

            <h2>Mascota</h2>
            <input placeholder='Nombre de la mascota' type="text" name="pet_name" id="pet_name"   {...register('pet_name', {
              required: {
                value: true,
                message: 'El nombre de la mascota es un campo requerido'
              }
            })} />
            {errors.pet_name && <span>{errors.pet_name.message}</span>}

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
            <div>

            </div>
            <input placeholder='Peso' type="number" name="weight" id="weight"  {...register('weight', {
              required: {
                value: true,
                message: "El peso es un campo requerido"
              }
            })} />

            {errors.weight && <span>{errors.weight.message}</span>}


          </div>
          <div className=' flex flex-row justify-between py-4'>
            <button type='button' className='ml-10' onClick={handleAccept}>Aceptar</button>
            <button type='button' className='mr-10' id='btn-close-modal'>Cerrar</button>
          </div>
        </dialog>
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