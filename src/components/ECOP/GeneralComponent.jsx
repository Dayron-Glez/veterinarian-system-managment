// eslint-disable-next-line react/prop-types
export const GeneralComponent = ({register}) => {
  return (
    <>
        <section className=' flex flex-col'>
                <h3 className='  ml-16'>GENERAL</h3>
                <div className='flex flex-row ml-16 mt-4'>
                  <div className='flex flex-col'>
                    <label className='flex flex-row mb-2'>Motivo de consulta <p className='text-red-500'>*</p> </label>
                    <textarea name="motivo" id="motivo" cols="64" rows="5" className='shadow rounded-sm resize-none' {...register('motivo')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>Anamnesis <p className='text-red-500'>*</p> </label>
                    <textarea name="anamnesis" id="anamnesis" cols="64" rows="5" className='shadow rounded-sm resize-none' {...register('anamnesis')} />
                  </div>
                </div>
                <section className=' flex flex-row ml-16'>

                  <div className='flex flex-col mt-4'>
                    <div>
                      <h3 className=' mt-16 mb-8'>&Uacute;LTIMA VACUNACIÓN</h3>
                    </div>
                    <div className=' flex flex-row ml-[-14px]'>
                      <div className='flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Tipo de vacuna</label>
                        <textarea name="tipo_vacuna" id="tipo_vacuna" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Producto</label>
                        <textarea name="producto" id="producto" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Fecha</label>
                        <textarea name="fecha" id="fecha" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>
                    </div>
                  </div>


                  <div className=' flex flex-col mt-4 ml-10'>

                    <div>
                      <h3 className=' ml-[15px] mt-16 mb-8'>&Uacute;LTIMA DESPARACITACIÓN</h3>
                    </div>
                    <div className=' flex flex-row'>

                      <div className=' flex flex-col items-baseline'>
                        <label className='flex flex-row mb-2'>Producto</label>
                        <textarea name="producto" id="producto" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>

                      <div className=' flex flex-col  items-baseline'>
                        <label className='flex flex-row mb-2'>Fecha</label>
                        <textarea name="fecha" id="fecha" cols="18" rows="1" className='shadow ml-4 rounded-sm h-8 resize-none' placeholder=' Ej. Text' />
                      </div>
                    </div>
                  </div>

                </section>
              </section>
              <div className='flex flex-row ml-16 mt-16'>
                <section className=' flex flex-col  mt-8'>
                  <label className='flex flex-row mb-2'>Estado reproductivo <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-8'>
                      <input type="radio" value="Castrado" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Castrado</span>
                    </label>
                    <label className='flex items-center'>
                      <input type="radio" value="Gestación" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Gestación</span>
                    </label>
                  </div>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-12'>
                      <input type="radio" value="Entero" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Entero</span>
                    </label>
                    <label className='flex items-center'>
                      <input type="radio" value="Lactancia" name="estado_reproductivo" {...register('estado_reproductivo')} className='custom-radio' />
                      <span className="ml-2">Lactancia</span>
                    </label>
                  </div>

                </section>
                <section className=' flex flex-col ml-[136px] mt-8'>
                  <label className='flex flex-row mb-2'>Alimentación <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center'>
                      <input type="radio" value="Balanceada" name="Alimentación" {...register('Alimentación')} className='custom-radio' />
                      <span className=' ml-2'>Balanceada</span>
                    </label>
                    <label className=' flex items-center'>
                      <input type="radio" value="Mixta" name="Alimentación" className='ml-8 custom-radio' {...register('Alimentación')} />
                      <span className=' ml-2'>Mixta</span>
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <label className='flex items-center'>
                      <input type="radio" value="Casera" name="Alimentación" {...register('Alimentación')} className='custom-radio' />
                      <span className=' ml-2'>Casera</span>
                    </label>
                    <div className='flex flex-row mt-4'>
                      <label className=' flex items-center'>
                        <input type="radio" value="Otro1" name="Alimentación" {...register('Alimentación')} className=' custom-radio' />
                        <span>Otro</span>
                      </label>
                      <textarea name="otro1" id="otro1" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto' {...register('otro1')} />
                    </div>
                  </div>
                </section>
                <section className=' flex flex-col ml-[165px] mt-8'>
                  <label className='flex flex-row mb-2'>Hábitat <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className=' flex items-center'>
                      <input type="radio" value="Casa" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                      <span className=' ml-2'>Casa</span>
                    </label>
                    <label className=' flex items-center'>
                      <input type="radio" value="Lote" name="Hábitat" className='ml-8 custom-radio' {...register('Hábitat')} />
                      <span className=' ml-2'>Lote</span>
                    </label>
                  </div>
                  <div className='flex flex-col'>
                    <div className='flex flex-row'>
                      <label className='flex items-center'>
                        <input type="radio" value="Finca" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                        <span className=' ml-2'>Finca</span>
                      </label>
                      <label className='flex items-center'>
                        <input type="radio" value="Tráiler" name="Hábitat" className='ml-7 custom-radio' {...register('Hábitat')} />
                        <span className=' ml-2'>Tráiler</span>
                      </label>
                    </div>
                    <div className='flex flex-row mt-4'>
                      <label className=' flex items-center'>
                        <input type="radio" value="Otro2" name="Hábitat" {...register('Hábitat')} className='custom-radio' />
                        <span className=' ml-2'>Otro</span>
                      </label>
                      <textarea name="otro2" id="otro2" cols="15" rows="1" className='shadow ml-4 rounded-sm resize-none' placeholder='Ej. texto'{...register('otro2')} />
                    </div>
                  </div>
                </section>
              </div>
              <div className=' flex flex-row flex-wrap ml-12 mt-16'>
                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Alergias <p className='text-red-500'>*</p> </label>
                  <textarea name="alergias" id="alergias" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('alergias')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Enfermedades anteriores <p className='text-red-500'>*</p> </label>
                  <textarea name="enfermedades" id="enfermedades" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('enfermedades')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Antecedentes familiares <p className='text-red-500'>*</p> </label>
                  <textarea name="antecedentes" id="antecedentes" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('antecedentes')} />
                </section>

                <section className=' flex flex-col ml-5 mt-8'>
                  <label className='flex flex-row mb-2'>Cirugías <p className='text-red-500'>*</p> </label>
                  <textarea name="cirugías" id="cirugías" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('cirugías')} />
                </section>
              </div>
    </>
  )
}
