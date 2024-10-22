/* eslint-disable react/prop-types */

export const ProblemComponent = ({register, index}) => {
    return (
        <>
            <div className='flex flex-row mt-4'>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none ml-6 w-72 h-8 border-none  outline-1 focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text' {...register(`problema${index}`)}/>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none w-80 ml-8 h-8 border-none  outline-1 focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text' {...register(`problema_maestra${index}`)}/>
                    <input  type="text" className=' placeholder:font-bold placeholder:pl-4 resize-none ml-14 w-72 h-8 border-none outline-1  focus:outline-[#eb5b27] focus:rounded-sm'placeholder='Ej. Text'{...register(`diagnostico_diferencial${index}`)}/>
            </div>
            <div className=' border-[1px] border-solid border-[#b5b7ba] h-0 ml-8 w-[95%]' />

        </>
    )
}
