import axios from 'axios'
const DoctorPage = () => {

  async function getPets() {
    
    
    try {
      const response = await axios.get('https://g8k31qc7-8000.use.devtunnels.ms/api/historia')
      console.log(response);
    } catch (error) {
      console.error(error);
    }
    
  }
  return (
    <>
      <div>Doctor Component</div>
  <button type="button" onClick={getPets}> get pet</button>
    </>
  )
}

export default DoctorPage