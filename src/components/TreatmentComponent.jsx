/* eslint-disable no-unused-vars */
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import SystemDeseaseComponent from './SystemDeseaseComponent';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const TreatmentComponent = () => {
    const CharStyle = {margin: 'auto'}
    const defaultValue = dayjs('2022-04-17T15:30');
    
    return (
    <>  
    <LocalizationProvider dateAdapter={AdapterDayjs} style={CharStyle}>
      <DatePicker />
    
      
      <TimePicker
      style={CharStyle}
          label="With Time Clock"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
    
     
    </LocalizationProvider>

   

   

    
      
       
        <LineChart
          width={500}
          height={300}
          data={data}
        
        style={CharStyle}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      
          <SystemDeseaseComponent/>

          
    </>
    )
}

export default TreatmentComponent