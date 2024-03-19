/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'


export const TerapeuticComponent = ({ register, control, index, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const [tipoTratamiento, setTipoTratamiento] = useState('')
    const customStyles = {
        control: (provided) => ({
          ...provided,
          width: '8rem', // w-32
          height: '2rem', // h-8
          border: 'none', // border-none
          outline: 'none', // outline-1
          '&:focus': {
            outline: '#eb5b27', // focus:outline-[#eb5b27]
            borderRadius: '0.25rem' // focus:rounded-sm
          },
        }),
        
        placeholder: (provided) => ({
          ...provided,
          paddingLeft: '1rem', // placeholder:pl-4
        }),
      };
    const options = [
        {
            value: 'Terapia de sostén',
            label: 'Terapia de sostén'
        },
        {
            value: 'Tratamiento preventivo',
            label: 'Tratamiento preventivo'
        },
        {
            value: 'Tratamiento sintomático',
            label: 'Tratamiento sintomático'
        },
        {
            value: 'Tratamiento etológico',
            label: 'Tratamiento etológico'
        },
       
    ]
    const handleTipoTratamientoChange = (selectedOption) => {
        if (selectedOption) {
            setTipoTratamiento(selectedOption.value);
            props.onSubmit(selectedOption.value);
        }
        else {
            setTipoTratamiento([]);
            // eslint-disable-next-line react/prop-types
            props.onSubmit('', []);
          }
    };


    return (
        <>
            <div className='flex flex-row my-4'>
                <Controller
                    name={`tipo_tratamiento${index}`}
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            onChange={option => {
                                field.onChange(option || '');
                                handleTipoTratamientoChange(option || '');
                            }}
                            isSearchable
                            isClearable
                            noOptionsMessage={() => 'No existe esa opción'}
                            placeholder='Ej. Text'
                            styles={customStyles}
                        />
                    )}
                />





                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-36  ml-5 h-[38px] border-none  outline-1 focus:outline-[#eb5b27]  focus:rounded-sm' placeholder='Ej. Text' {...register(`principio_activo${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[120px] ml-6  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`presentacion${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-24 ml-5  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`posologia${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[98px] ml-5  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`dosis_total${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-28 ml-4  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`via${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[100px] ml-4  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`frecuencia${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-32 ml-10  h-[38px] border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`duracion${index}`)} />
            </div>
            <div className=' border-[1px] border-solid border-[#b5b7ba] h-0  w-[100%]' />

        </>
    )
}