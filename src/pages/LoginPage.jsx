import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import visibleIcon from '../assets/visible.png';
import HideIcon from '../assets/hide.png';
import LogoComponent from '../components/LogoComponent'
import {motion} from 'framer-motion'


const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    if (data.password === 'Dayronglez01*') {

      navigate("/ReceptionPage")
    }
    else if (data.password === 'LeoGlez01*') {
      navigate("/DoctorPage")

    }
    else {
      alert('no puedes acceder')
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
      transition={{duration: 0.75}}
    >
      <main className=' flex items-center justify-center  content-center "h-56  grid-cols-3 gap-4'>


        <LogoComponent height={48} className=" absolute top-0 left-0 mx-4 md:mx-8" />


        <form onSubmit={onSubmit} className='form-container w-60 mx-40 my-20'>
          <h1 className="form-container my-2 text-textcolor1 "> Mi Cuenta </h1>
          <h4 className="text-textcolor2 form-container">Registrar para iniciar sesión</h4>
          <div className=" flex flex-col">
            <label className="text-textcolor1 mt-20 font-semibold mb-2">Nombre de usuario</label>
            <input placeholder='Ej. texto' type="text" name="name" id="name" {...register('username', {
              required: {
                value: true,
                message: 'Usuario requerido'
              },
              minLength: {
                value: 3,
                message: 'Minimo 3 caracteres'
              },
              maxLength: {
                value: 30,
                message: 'Maximo 30 caracteres'
              }
            })} autoComplete='off' className=" h-8 w-80 rounded-md border-[1px] " />
            {errors.username && <span>{errors.username.message}</span>}
          </div>
          <div className=" flex flex-col">

            <label htmlFor="password" className="text-textcolor1 font-semibold mb-2">Contraseña</label>
            <button type="button" className=" border-none bg-red-500 z-10 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? visibleIcon : HideIcon} alt={showPassword ? 'visibleIcon' : 'HideIcon'}
                className="  ml-28 h-6 w-6 absolute mt-1" />
            </button>
            <input className=" h-8 w-80 rounded-md border-[1px]" placeholder='Ej.texto' type={showPassword ? 'text' : 'password'} name="password" id="password" {...register('password', {
              required: {
                value: true,
                message: 'Contraseña requerida',
              },
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/,
                message: 'Contraseña incorecta'
              }
            })} autoComplete='off' />

            {errors.password && <span>{errors.password.message}</span>}
          </div>



          <button className="bg-orange-600 my-10 text-white h-8 w-80 rounded-md border-none shadow-md focus:ring cursor-pointer hover:bg-orange-500 " type='submit'>registrarse</button>
        </form>
      </main>

    </motion.div>
  )
}

export default LoginPage