import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { systems } from './SystemDesease';

const SystemDeseaseComponent = (props) => {
  const { control } = useForm();
  const [enfermedades, setEnfermedades] = useState([]);
  const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState(null);
  const { register } = useForm()

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
      <section className=' flex flex-row mt-8'>
        <div className=' flex-col'>
          <label className='flex flex-row mb-2'>Sistema de órgano <p className='text-red-500'>*</p> </label>
          <Controller
            name="sistema"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                options={systemOptions}
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
                className=' w-80'
              />
            )}
          />
        </div>
        <div className=' flex flex-col'>
          <div className=' flex-col ml-6 '>
            <label className='flex flex-row mb-2'>&Oacute;rgano afectado <p className='text-red-500'>*</p> </label>
            <input type="text" className=' w-80 h-9 ' />
          </div>
          <div className=' flex-col ml-6 my-4'>
            <label className='flex flex-row mb-2'>Enfermedad del órgano <p className='text-red-500'>*</p> </label>
            <Controller
              name="enfermedad"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  options={enfermedades.map(enfermedad => ({ value: enfermedad.name, label: enfermedad.name }))}

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
                  className=' w-80'
                  onChange={option => {
                    field.onChange(option);
                    handleEnfermedadChange(option); // Llama a handleEnfermedadChange cuando se selecciona una enfermedad
                  }}
                />
              )}
            />
          </div>
        </div>
        <div className=' ml-12'>
          <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
          <textarea name="observation_mucosa_rectal" id="observation_mucosa_rectal" className='shadow resize-none rounded-sm w-80 h-32'{...register('observation_mucosa_rectal')} />
        </div>
      </section>
    </>
  )
}

export default SystemDeseaseComponent;
