/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select'


export const DiagnosticComponent = ({ register, index, control, ...props }) => {
    // eslint-disable-next-line no-undef, no-unused-vars
    const [tipoExamen, setTipoExamen] = useState('')

   
    const options = [
        {
            value: 'Biometría hemática',
            label: 'Biometría hemática'
        },
        {
            value: 'Urianalisis',
            label: 'Urianalisis'
        },
        {
            value: 'Coproparasitoscópico',
            label: 'Coproparasitoscópico'
        },
        {
            value: 'Química sanguínea',
            label: 'Química sanguínea'
        },
        {
            value: 'Raspado',
            label: 'Raspado'
        },
        {
            value: 'Tricograma',
            label: 'Tricograma'
        },
        {
            value: 'P. Oftálmicas',
            label: 'P. Oftálmicas'
        },
        {
            value: 'Citología',
            label: 'Citología'
        },
        {
            value: 'Rayos X ',
            label: 'Rayos X '
        },
        {
            value: 'Us',
            label: 'Us'
        },
        {
            value: 'Cultivo',
            label: 'Cultivo'
        },
        {
            value: 'Antibiograma',
            label: 'Antibiograma'
        },
        {
            value: 'Cirugías',
            label: 'Cirugías'
        },
        {
            value: 'Otro',
            label: 'Otro'
        },
       
    ]
    const handleTipoExamenChange = (selectedOption) => {
        if (selectedOption) {
            setTipoExamen(selectedOption.value);
            props.onSubmit(selectedOption.value);
        }
        else {
            setTipoExamen([]);
            // eslint-disable-next-line react/prop-types
            props.onSubmit('', []);
          }
    };
    return (
        <>
            <div className=' flex flex-row '>
                <div className=' mt-[27px]'>
                    {/* <div className='flex flex-col'>
                        <label className='flex flex-row mb-2'>Tipo de examen <p className='text-red-500'>*</p> </label>
                        <input type="text" name="tipo_examen" id="tipo_examen" className=' w-80 shadow h-8 rounded-sm border-[1px]' placeholder='Ej. text' {...register(`tipo_examen${index}`)} />
                    </div> */}
                    <Controller
                    name={`tipo_examen${index}`}
                    control={control}
                    defaultValue={''}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={options}
                            onChange={option => {
                                field.onChange(option || '');
                                handleTipoExamenChange(option || '');
                            }}
                            isSearchable
                            isClearable
                            noOptionsMessage={() => 'No existe esa opción'}
                            placeholder='Ej. Text'
                    
                        />
                    )}
                />
                    <label className='flex items-center mt-6 mb-8 w-28'>
                        <input type="checkbox" value="Autorizacion" {...register(`autorizacion_examen${index}`)} className='custom-radio' />
                        <span className="ml-2">Autorización</span>
                    </label>
                    <div className=' flex flex-row'>
                        <div className='flex flex-col'>
                            <label className='flex flex-row mb-2'>Fecha <p className='text-red-500'>*</p> </label>
                            <input type="date" name="fecha_pland" id="fecha_pland" className=' w-[170px] shadow h-8 rounded-sm border-[1px]' placeholder='Ej. text' {...register(`fecha_pland${index}`)} />
                        </div>
                        <div className='flex flex-col ml-6'>
                            <label className='flex flex-row mb-2'>Laboratorio <p className='text-red-500'>*</p> </label>
                            <input type="text" name="laboratorio" id="laboratorio" className=' w-80 shadow h-8 rounded-sm border-[1px]' placeholder='Ej. text' {...register(`laboratorio${index}`)} />
                        </div>
                    </div>
                </div>

                <div>
                    <div className='flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2 ml-8'>Resultados <p className='text-red-500'>*</p> </label>
                        <textarea name="resultados_lab" id="resultados_lab" cols="60" className='shadow ml-4 rounded-sm h-[183px] resize-none' placeholder=' Ej. Text' {...register(`resultados_lab${index}`)} />
                    </div>
                </div>

            </div>
            
                <div className=' flex  border-[1px]  border-[#d6d7d8] h-0 w-[98%] border-dashed mt-4' />
            

        </>
    )
}
