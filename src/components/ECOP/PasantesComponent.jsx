/* eslint-disable react/prop-types */

export const PasantesComponent = ({register,index}) => {
  return (
    <>
        <div className="flex flex-row">
            <input type="text" {...register(`nombre_y_apellidos${index}`)} className=" mb-0 ml-6 h-6" placeholder=" Ej.Text"/>
            <input type="text" {...register(`documento${index}`)} className=" mb-0 ml-20 h-6" placeholder=" Ej.Text"/>
            <input type="text" {...register(`semestre${index}`)} className=" mb-0 ml-9 h-6" placeholder=" Ej.Text"/>
        </div>
        <div className=' border-[1px] border-solid border-[#b5b7ba] h-0 w-[100%] my-4' />

    </>
  )
}
