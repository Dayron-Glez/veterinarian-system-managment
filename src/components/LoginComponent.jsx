import React from 'react'
import { useNavigate } from "react-router-dom";
const LoginComponent = () => {
  const navigate = useNavigate();
  return (
    <>  
        <main className='main-container'>
          <form action="submit" className='form-container'>
              <input placeholder='Input your username' type="text" name="name" id="name" />
              <input placeholder='Input your password' type="password" name="password" id="password" />
              <button onClick={() => navigate('/ReceptionComponent')} type='submit'>Submit</button>
          </form>
        </main>
    </>
  )
}

export default LoginComponent