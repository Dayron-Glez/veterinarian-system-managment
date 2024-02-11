import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { systems } from './SystemDesease';

const SystemDeseaseComponent = () => {
  const { control } = useForm();
  const [enfermedades, setEnfermedades] = useState([]);

  const handleSystemChange = (selectedOption) => {
    const sistemaSeleccionado = systems.find(sistema => sistema.name === selectedOption.value);
    if (sistemaSeleccionado) {
      setEnfermedades(sistemaSeleccionado.enfermedades);
    } else {
      setEnfermedades([]);
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
          />
        )}
      />
    </div>
    </>
  )
}

export default SystemDeseaseComponent