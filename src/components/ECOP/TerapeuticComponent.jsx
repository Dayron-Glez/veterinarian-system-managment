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
            width: '21rem',
            height: '2rem', // h-8
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
            <section className=' flex flex-row mt-8'>

                <div className=' flex flex-col'>
                    <label>Tipo de tratamiento</label>
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
                    </div>


                </div>

                <div className=' flex flex-col items-baseline'>
                    <label> Principio Activo</label>
                    <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[21rem] mt-4  ml-5 h-[38px] rounded-sm  border-[1px]  focus:rounded-sm' placeholder='Ej. Text' {...register(`principio_activo${index}`)} />
                </div>
                <div className=' flex flex-col items-baseline'>
                    <label>Presentación</label>
                    <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[21rem] mt-4 ml-6  h-[38px] rounded-sm  border-[1px] focus:rounded-sm' placeholder='Ej. Text' {...register(`presentacion${index}`)} />
                </div>
            </section>
            <section className=' flex flex-row mb-4'>
                <div className='flex flex-col items-baseline mt-4'>
                    <label>Posología</label>
                    <input type="number" className=' placeholder:font-bold placeholder:pl-4 w-[10rem] mt-4  h-[38px] rounded-sm  border-[1px]  focus:rounded-sm' placeholder='Ej. Text' {...register(`posologia${index}`)} />
                </div>
                <div className='flex flex-col items-baseline mt-4'>
                    <label>Dosis total</label>
                    <input type="number" className=' placeholder:font-bold placeholder:pl-4 w-[10rem] mt-4 ml-[1rem] h-[38px] rounded-sm  border-[1px]  focus:rounded-sm' placeholder='Ej. Text' {...register(`dosis_total${index}`)} />
                </div>
                <div className='flex flex-col items-baseline mt-4'>
                    <label>Vía</label>
                    <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[21rem] mt-4 ml-5  h-[38px] rounded-sm  border-[1px]  focus:rounded-sm' placeholder='Ej. Text' {...register(`via${index}`)} />
                </div>
                <div className='flex flex-col items-baseline mt-4'>
                    <label>Frecuencia</label>
                    <input type="number" className=' placeholder:font-bold placeholder:pl-4 w-[10rem] mt-4 ml-6  h-[38px] rounded-sm  border-[1px] focus:rounded-sm' placeholder='Ej. Text' {...register(`frecuencia${index}`)} />
                </div>
                <div className='flex flex-col items-baseline mt-4'>
                    <label>Duración</label>
                    <input type="text" className=' placeholder:font-bold placeholder:pl-4 w-[10rem] mt-4 ml-[1rem]  h-[38px] rounded-sm  border-[1px] focus:rounded-sm' placeholder='Ej. Text' {...register(`duracion${index}`)} />
                </div>
            </section>
            <div className=' border-[1px] border-solid border-[#b5b7ba] h-0  w-[100%]' />

        </>
    )
}