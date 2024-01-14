import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import visibleIcon from '../assets/visible.png';
import HideIcon from '../assets/hide.png';



const LoginComponent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (data.password === 'Dayronglez01*') {

      navigate("/ReceptionComponent")
    }
    else {
      alert('no puedes acceder')
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <main className='main-container'>

        <form onSubmit={onSubmit} className='form-container'>
          <input placeholder='Input your username' type="text" name="name" id="name" {...register('username', {
            required: {
              value: true,
              message: 'Username is required'
            },
            minLength: {
              value: 3,
              message: 'Minimun 3 characters in the username field'
            },
            maxLength: {
              value: 30,
              message: 'Maximum 30 characters int the username field'
            }
          })} autoComplete='off' className=" h-8 w-52 rounded-md border-[1px] " />


          {errors.username && <span>{errors.username.message}</span>}

          <button type="button" className=" border-none bg-transparent" onClick={() => setShowPassword(!showPassword)}>
            <img src={showPassword ? visibleIcon : HideIcon} alt={showPassword ? 'visibleIcon' : 'HideIcon'}
              className=" h-6 w-6 absolute pl-14 pt-2" />
          </button>
          <input className=" h-8 w-52 rounded-md border-[1px] focus:placeholder-orange-600" placeholder='Input your password' type={showPassword ? 'text' : 'password'} name="password" id="password" {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            pattern: {
              value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
              message: 'Wrong password format'
            }
          })} autoComplete='off' />

          {errors.password && <span>{errors.password.message}</span>}

          <button type='submit'>Enviar</button>
        </form>
      </main>

    </>
  )
}

export default LoginComponent