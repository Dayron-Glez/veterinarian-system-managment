import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { systems } from './SystemDesease';

const SystemDeseaseComponent = (props) => {
  const { control } = useForm();
  const [enfermedades, setEnfermedades] = useState([]);
  const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState(null); 

  const handleSystemChange = (selectedOption) => {
    if (selectedOption) {
      const sistemaSeleccionado = systems.find(sistema => sistema.name === selectedOption.value);
      if (sistemaSeleccionado) {
        setEnfermedades(sistemaSeleccionado.enfermedades);
        // eslint-disable-next-line react/prop-types
        props.onSubmit(sistemaSeleccionado.name, sistemaSeleccionado.enfermedades);
      } else {
        setEnfermedades([]);
        // eslint-disable-next-line react/prop-types
        props.onSubmit(null, []);
      }
    } else {
      setEnfermedades([]);
      // eslint-disable-next-line react/prop-types
      props.onSubmit(null, []);
    }
  };

  const handleEnfermedadChange = (selectedOption) => {
    if (selectedOption) {
      setEnfermedadSeleccionada(selectedOption.value);
      // eslint-disable-next-line react/prop-types
      props.onEnfermedadChange(selectedOption.value);
    } else {
      setEnfermedadSeleccionada(null);
      // eslint-disable-next-line react/prop-types
      props.onEnfermedadChange(null);
    }
  };

  const systemOptions = systems.map(sistema => ({ value: sistema.name, label: sistema.name }));
  return (
    <>
        <h3>Selecciona el sistema y las enfermedades</h3>
    <div className=' flex flex-row justify-evenly'>
        <Controller
        name="sistema"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Select
            {...field}
            options={systemOptions}
            placeholder="---Sistemas---"
            onChange={option => {
              field.onChange(option);
              handleSystemChange(option);
            }}
            isSearchable
            isClearable
            noOptionsMessage={() => 'No existe esa opción'}
            styles={{
              clearIndicator: (baseStyles) => ({
                ...baseStyles,
                color: 'red',
               
              }),
             
            }}
            className=' w-[400px]'
          />
        )}
      />

<Controller
  name="enfermedad"
  control={control}
  defaultValue=""
  render={({ field }) => (
    <Select
      {...field}
      options={enfermedades.map(enfermedad => ({ value: enfermedad.name, label: enfermedad.name }))}
      placeholder="---Enfermedades---"
      isDisabled={!enfermedades.length}
      isSearchable
      isClearable
      noOptionsMessage={() => 'No existe esa opción'}
      styles={{
        clearIndicator: (baseStyles) => ({
          ...baseStyles,
          color: 'red',
         
        }),
       
      }}
      className=' w-[400px]'
      onChange={option => {
        field.onChange(option);
        handleEnfermedadChange(option); // Llama a handleEnfermedadChange cuando se selecciona una enfermedad
      }}
    />
  )}
/>
    </div>
    </>
  )
}

export default SystemDeseaseComponent;
