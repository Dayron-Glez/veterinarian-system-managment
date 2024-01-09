import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';





const LoginComponent = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors },reset } = useForm()
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
    navigate("/TreatmentComponent")
  })
  
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
          })} autoComplete='off' className=" " />


          {errors.username && <span>{errors.username.message}</span>}

          <input placeholder='Input your password' type="password" name="password" id="password" {...register('password', {
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

          <button type='submit'>Submit</button>
        </form>
      </main>
     
    </>
  )
}

export default LoginComponent