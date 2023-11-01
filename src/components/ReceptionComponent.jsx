import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
const ReceptionComponent = () => {
  const navigate = useNavigate();
  const {register,handleSubmit,formState:{errors}} = useForm()

  const onSubmit = handleSubmit((value) => {
    console.log(value);
  })
  
  return (
   <form onSubmit={onSubmit} className='client-pet-form'>
    <h2>Client</h2>
        <input placeholder='Input client name' type="text"  name="client_name" id="client_name"  {...register('client_name', {
          required: {
            value:true,
            message: 'client name is required'
          },
          minLength: {
            value:3,
            message: 'Minimun 3 characters in the client name field'
          },
          maxLength:{
            value:30,
            message: 'Maximum 30 characters int the client name field'
          },
          autoComplete: {
            value: 'off'
          }
        })}/>

        {errors.client_name && <span>{errors.client_name.message}</span>}

        <input placeholder='Input client DNI'   type="text" name="DNI" id="DNI"  {...register('DNI',{
          required: {
            value:true,
            message: 'client DNI is required'
          },
          autoComplete:'off'
        })} />

        {errors.DNI && <span>{errors.DNI.message}</span>}

        <input placeholder='Input client phone' type="text" name="phone" id="phone"  {...register('phone',{
          required: {
            value:true,
            message: 'The phone number is required'
          }
        })}/>

        {errors.phone && <span>{errors.phone.message}</span>}

    <h2>Pet</h2>
        <input placeholder='Input pet name' type="text"     name="pet_name" id="pet_name"   {...register('pet_name',{
          required: {
            value: true,
            message: 'Pet name is required'
          }
        })}/>
        {errors.pet_name && <span>{errors.pet_name.message}</span>}
        
        <input placeholder='Input pet race' type="text"     name="race" id="race"   {...register('race',{
          autoComplete: {
            value: 'off'
          }
        })} />
        <input placeholder='Input pet weight' type="number" name="weight" id="weight"  {...register('weight',{
          required: {
            value: true,
            message: "The pet's weight is required"
          }
        })}/>

        {errors.weight && <span>{errors.weight.message}</span>}

        <input placeholder='Input pet fur' type="text"      name="fur" id="fur" {...register('fur',{
          autoComplete: {
            value: 'off'
          }
        })} />
        <button type="submit">Add</button>
   </form>
  )
}

export default ReceptionComponent