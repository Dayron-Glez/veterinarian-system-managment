import React from 'react'
import { useNavigate } from "react-router-dom";

const ReceptionComponent = () => {
  const navigate = useNavigate();

  return (
   <form action="submit" >
    <h2>Client</h2>
        <input type="text" name="name" id="name" />
        <input type="text" name="DNI" id="DNI" />
        <input type="text" name="phone" id="phone" />

    <h2>Pet</h2>
        <input type="text" name="name" id="name" />
        <input type="text" name="race" id="race" />
        <input type="number" name="weight" id="weight"/>
        <input type="text" name="fur" id="fur" />
        <button onClick={() => navigate('/DoctorComponent')} type="submit">Add</button>
   </form>
  )
}

export default ReceptionComponent