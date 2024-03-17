/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'


export const TerapeuticComponent = ({ register, control, index, ...props }) => {
    // eslint-disable-next-line no-unused-vars
    const [tipoTratamiento, setTipoTratamiento] = useState('')
    const options = [
        {
            name: '1',
            label: '1'
        },
        {
            name: '2',
            label: '2'
        },
        {
            name: '3',
            label: '3'
        },
        {
            name: '4',
            label: '4'
        },
        {
            name: '5',
            label: '5'
        },
    ]
    const handleTipoTratamientoChange = (selectedOption) => {
        if (selectedOption) {
            setTipoTratamiento(selectedOption.name);
            props.onSubmit(selectedOption.name);
        }
        else {
            setTipoTratamiento('');
            props.onSubmit('');
        }
    };


    return (
        <>
            <div className='flex flex-row my-4'>
                <Controller
                    name={`tipo_tratamiento${index}`}
                    control={control}
                    defaultValue={null}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            onChange={option => {
                                field.onChange(option || null);
                                handleTipoTratamientoChange(option || null);
                            }}
                            isSearchable
                            isClearable
                            noOptionsMessage={() => 'No existe esa opción'}
                            className=' placeholder:font-bold placeholder:pl-4 w-32  h-8 border-none  outline-1 focus:outline-[#eb5b27]  focus:rounded-sm'
                            placeholder='Ej. Text'
                        />
                    )}
                />





                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-36  ml-5 h-8 border-none  outline-1 focus:outline-[#eb5b27]  focus:rounded-sm' placeholder='Ej. Text' {...register(`principio_activo${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[120px] ml-6  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`presentacion${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-24 ml-5  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`posologia${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[98px] ml-5  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`dosis_total${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-28 ml-4  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`via${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[100px] ml-4  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`frecuencia${index}`)} />
                <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-32 ml-10  h-8 border-none  outline-1  focus:outline-[#eb5b27] focus:rounded-sm' placeholder='Ej. Text' {...register(`duracion${index}`)} />
            </div>
            <div className=' border-[1px] border-solid border-[#b5b7ba] h-0  w-[100%]' />

        </>
    )
}