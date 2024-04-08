
// eslint-disable-next-line react/prop-types
export const MucosasComponent = ({register}) => {
  return (
    <>
        <div className=' flex flex-row ml-16 py-16'>
                <section className=' flex flex-col'>
                  <label className='flex flex-row mb-6'>Mucosa Conjuntival <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-5'>
                      <input type="radio" value="False" name="mucosa_conjuntival" {...register('mucosa_conjuntival')} className='custom-radio' />
                      <span className="ml-2">Normal</span>
                    </label>

                    <label className='flex items-center mr-5'>
                      <input type="radio" value="True" name="mucosa_conjuntival" {...register('mucosa_conjuntival')} className='custom-radio' />
                      <span className="ml-2">Alterada</span>
                    </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_conjuntival" id="observation_mucosa_conjuntival" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_conjuntival')} />
                  </div>
                </section>
                <section className=' ml-6'>
                  <label className='flex flex-row mb-6'>Mucosa Vulvar/Prepucial <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-5'>
                      <input type="radio" value="False" name="mucosa_vulvar_prepucial" {...register('mucosa_vulvar_prepucial')} className='custom-radio' />
                      <span className="ml-2">Normal</span>
                    </label>

                    <label className='flex items-center mr-5'>
                      <input type="radio" value="True" name="mucosa_vulvar_prepucial" {...register('mucosa_vulvar_prepucial')} className='custom-radio' />
                      <span className="ml-2">Alterada</span>
                    </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_vulvar_prepucial" id="observation_mucosa_vulvar_prepucial" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_vulvar_prepucial')} />
                  </div>
                </section>
                <section className=' ml-12'>
                  <label className='flex flex-row mb-6'>Mucosa Rectal <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-5'>
                      <input type="radio" value="False" name="mucosa_rectal" {...register('mucosa_rectal')} className='custom-radio' />
                      <span className="ml-2">Normal</span>
                    </label>

                    <label className='flex items-center mr-5'>
                      <input type="radio" value="True" name="mucosa_rectal" {...register('mucosa_rectal')} className='custom-radio' />
                      <span className="ml-2">Alterada</span>
                    </label>
                  </div>
                  <div className=' mt-8'>
                    <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                    <textarea name="observation_mucosa_rectal" id="observation_mucosa_rectal" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_mucosa_rectal')} />
                  </div>
                </section>
              </div>
              {/* <div className=' mt-10 border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' /> */}
              {/* <div className=' flex flex-row ml-16 mt-16'>
                <section className=' flex flex-col'>
                  <label className='flex flex-row mb-6'>Nódulos linfáticos <p className='text-red-500'>*</p> </label>
                  <div className='flex flex-row'>
                    <label className='flex items-center mr-5'>
                      <input type="radio" value="Normal" name="nodulos_linfaticos" {...register('nodulos_linfaticos')} className='custom-radio' />
                      <span className="ml-2">Normal</span>
                    </label>

                    <label className='flex items-center mr-5'>
                      <input type="radio" value="Alterada" name="nodulos_linfaticos" {...register('nodulos_linfaticos')} className='custom-radio' />
                      <span className="ml-2">Alterada</span>
                    </label>
                  </div>
                </section>
                <div className=' ml-[150px]'>
                  <label className='flex flex-row mb-2'>Observación <p className='text-red-500'>*</p> </label>
                  <textarea name="observation_nodulos_linfaticos" id="observation_nodulos_linfaticos" cols="" rows="5" className='shadow resize-none rounded-sm w-80'{...register('observation_nodulos_linfaticos')} />
                </div>
              </div> */}
    </>
  )
}
