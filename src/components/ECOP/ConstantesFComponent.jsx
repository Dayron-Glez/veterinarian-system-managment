
// eslint-disable-next-line react/prop-types
export const ConstantesFComponent = ({register}) => {
  return (
    <>
        <section className='flex flex-col ml-8 mt-8'>
                <h4 className='text-[#344054] ml-8'>CONSTANTES FISIOLÓGICAS</h4>
                <div className='flex flex-row justify-start  mt-8'>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>TLLC <p className='text-red-500'>*</p> </label>
                    <input type="number" name="TLLC" id="TLLC" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('TLLC')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>Pulso <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Pulso" id="Pulso" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Pulso')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>FC <p className='text-red-500'>*</p> </label>
                    <input type="number" name="FC" id="FC" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FC')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>FR <p className='text-red-500'>*</p> </label>
                    <input type="number" name="FR" id="FR" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('FR')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>{`Temperatura [C`}&deg;{`]`} <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Temperatura" id="Temperatura" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Temperatura')} />
                  </div>
                  <div className='flex flex-col ml-6'>
                    <label className='flex flex-row mb-2'>{`Peso [kg/lbs]`} <p className='text-red-500'>*</p> </label>
                    <input type="number" name="Peso" id="Peso" className=' w-[153px] shadow h-8 rounded-md border-[1px]' placeholder='Ej. text' {...register('Peso')} />
                  </div>
                </div>

              </section>
    </>
  )
}
