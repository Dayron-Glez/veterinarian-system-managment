/* eslint-disable react/prop-types */

export const NódulosComponent = ({register}) => {
  return (
    <>  
         <div className='  border-[1px] border-solid border-[#344054] h-0 ml-8 w-[95%]' />
        <div className=' flex flex-row ml-16 mt-16'>
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
              </div>
    </>
  )
}
