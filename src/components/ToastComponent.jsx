import { ClockLoader } from 'react-spinners';


const CustomToast = () => (
    <div style={{ display: 'flex', alignItems: 'baseline' }}>
      <div>Enviando datos...</div>
      <div className=' self-end ml-2'>
        <ClockLoader color="#eb5b27" size={18}/>
      </div>
    </div>
  );

  export default CustomToast;