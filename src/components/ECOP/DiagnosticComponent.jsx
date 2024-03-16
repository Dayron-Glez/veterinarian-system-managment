/* eslint-disable react/prop-types */


export const DiagnosticComponent = ({ register, index }) => {
    return (
        <>
            <div className=' flex flex-row mt-4'>
                <div>
                    <div className='flex flex-col'>
                        <label className='flex flex-row mb-2'>Tipo de examen <p className='text-red-500'>*</p> </label>
                        <input type="text" name="tipo_examen" id="tipo_examen" className=' w-80 shadow h-8 rounded-sm border-[1px]' placeholder='Ej. text' {...register(`tipo_examen${index}`)} />
                    </div>
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
            <div className=" flex w-full justify-center">
                <div className=' flex  border-[1px] border-solid border-[#b5b7ba] h-0 mr-24 w-[700px] mt-4' />
            </div>

        </>
    )
}
