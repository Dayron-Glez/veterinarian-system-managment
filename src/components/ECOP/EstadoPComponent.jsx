/* eslint-disable react/prop-types */

export const EstadoPComponent = ({ register }) => {
    return (
        <>
            <section className=" flex flex-col ml-16">
                <div className='flex flex-row my-16 justify-center'>
                    <div className='flex flex-col ml-[-64px]'>
                        <label className='flex flex-row mb-2'>Interpretación de resultados <p className='text-red-500'>*</p> </label>
                        <textarea name="motivo" id="motivo" cols="71" rows="5" className='shadow rounded-sm resize-none' {...register('interpretacion_resultados')} />
                    </div>
                    <div className='flex flex-col ml-6'>
                        <label className='flex flex-row mb-2'>Impresión diagnóstica <p className='text-red-500'>*</p> </label>
                        <textarea name="anamnesis" id="anamnesis" cols="71" rows="5" className='shadow rounded-sm resize-none' {...register('impresion_diagnostica')} />
                    </div>
                </div>
                <h3>ESTADO DEL PACIENTE</h3>
                <div className=" flex flex-row pl-8 my-8">
                    <div className="radio-button pl-24">
                        <input type="radio" id="option1" value="Alta médica" name="estado_paciente" {...register('estado_paciente')} />
                        <label htmlFor="option1">Alta médica</label>
                    </div>
                    <div className="radio-button pl-24">
                        <input type="radio" id="option2" value="En tratamiento" name="estado_paciente" {...register('estado_paciente')} />
                        <label htmlFor="option2">En tratamiento</label>
                    </div>
                    <div className="radio-button pl-24">
                        <input type="radio" id="option3" value="Eutanasiado" name="estado_paciente" {...register('estado_paciente')} />
                        <label htmlFor="option3">Eutanasiado</label>
                    </div>
                    <div className="radio-button pl-24">
                        <input type="radio" id="option4" value="Fallecido" name="estado_paciente" {...register('estado_paciente')} />
                        <label htmlFor="option4">Fallecido</label>
                    </div>
                </div>
            </section>
        </>
    )
}
