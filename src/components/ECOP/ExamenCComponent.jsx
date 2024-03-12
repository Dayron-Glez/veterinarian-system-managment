
// eslint-disable-next-line react/prop-types
export const ExamenCComponent = ({register}) => {
  return (
    <>
        <div className=' flex flex-col ml-16 mt-16'>
                <h3>EXAMEN CLÍNICO</h3>
                <div className=' flex flex-row '>
                  <section className=' flex flex-col  mt-8'>
                    <label className='flex flex-row mb-2'>Actitud <p className='text-red-500'>*</p> </label>
                    <div className='flex flex-row'>
                      <label className='flex items-center mr-11'>
                        <input type="radio" value="Alerta" name="Actitud" {...register('Actitud')} className='custom-radio' />
                        <span className="ml-2">Alerta</span>
                      </label>
                      <label className='flex items-center'>
                        <input type="radio" value="Agresivo" name="Actitud" {...register('Actitud')} className='custom-radio' />
                        <span className="ml-2">Agresivo</span>
                      </label>
                    </div>
                    <div className='flex flex-row'>
                      <label className='flex items-center mr-5'>
                        <input type="radio" value="Depresivo" name="Actitud" {...register('Actitud')} className='custom-radio' />
                        <span className="ml-2">Depresivo</span>
                      </label>
                      <label className='flex items-center'>
                        <input type="radio" value="Comatoso" name="Actitud" {...register('Actitud')} className='custom-radio' />
                        <span className="ml-2">Comatoso</span>
                      </label>
                    </div>
                  </section>

                  <section className=' flex flex-col  mt-8 ml-36'>
                    <label className='flex flex-row mb-2'>Condición corporal <p className='text-red-500'>*</p> </label>
                    <div className=' flex flex-col'>

                      <div className='flex flex-row'>
                        <label className='flex items-center mr-11'>
                          <input type="radio" value="Caquético" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                          <span className="ml-2">Caquético</span>
                        </label>
                        <label className='flex items-center'>
                          <input type="radio" value="Delgado" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                          <span className="ml-2">Delgado</span>
                        </label>
                      </div>
                      <div>
                        <label className='flex items-center'>
                          <input type="radio" value="Normal" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>
                      </div>
                    </div>
                    <div className='flex flex-row'>
                      <label className='flex items-center mr-5'>
                        <input type="radio" value="Sobrepeso" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                        <span className="ml-2">Sobrepeso</span>
                      </label>
                      <label className='flex items-center ml-[22px]'>
                        <input type="radio" value="Obeso" name="condicion_corporal" {...register('condicion_corporal')} className='custom-radio' />
                        <span className="ml-2">Obeso</span>
                      </label>
                    </div>
                  </section>

                  <section className=' flex flex-col  mt-8 ml-40'>
                    <label className='flex flex-row mb-2'>Hidratación <p className='text-red-500'>*</p> </label>
                    <div className=' flex flex-col'>

                      <div className='flex flex-row'>
                        <label className='flex items-center mr-11'>
                          <input type="radio" value="Normal" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                          <span className="ml-2">Normal</span>
                        </label>
                        <label className='flex items-center ml-[46px]'>
                          <input type="radio" value="d_0_5" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                          <span className="ml-2">{`Deshidratación 0-5%`}</span>
                        </label>
                      </div>
                      <div className=' flex flex-row'>
                        <label className='flex items-center'>
                          <input type="radio" value="d_6_7" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                          <span className="ml-2">{`Deshidratación 6-7%`}</span>
                        </label>
                        <label className='flex items-center ml-1 '>
                          <input type="radio" value="d_8_9" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                          <span className="ml-2">{`Deshidratación 8-9%`}</span>
                        </label>
                      </div>
                    </div>
                    <div className='flex flex-row'>
                      <label className='flex items-center mr-5'>
                        <input type="radio" value="d_+10" name="hidratacion" {...register('hidratacion')} className='custom-radio' />
                        <span className="ml-2">{`Deshidratación +10%`}</span>
                      </label>
                    </div>
                  </section>
                </div>
              </div>
    </>
  )
}
