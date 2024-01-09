import  { useState } from 'react'
import {systems} from './SystemDesease'
const SystemDeseaseComponent = () => {

    // eslint-disable-next-line no-unused-vars
    const [sistema, setSistema] = useState()
    const [enfermedadess, setEnfermedadess] = useState([])

    function handleChange(event) {
        setSistema(event.target.value)
        setEnfermedadess(systems.find(sist => sist.name === event.target.value).enfermedades)
    }

  return (
    <>
        <h3>Selecciona el sistema y las enfermedades</h3>
       <select onChange={handleChange} placeholder='Sistemas' className=''>
        <option >---Sistemas---</option>
        {systems.map((s, index) => {
            return (
                <option value={s.name} key={index}>{s.name}</option>
            )
        })}
       </select>

       <select >
       <option >---Enfermedades---</option>
        {enfermedadess.map((e, index) => {
            return (
                <option value={e.name} key={index}>{e.name}</option>
            )
        })}
       </select>
    </>
  )
}

export default SystemDeseaseComponent