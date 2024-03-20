/* eslint-disable react/prop-types */
import SignatureCanvas from 'react-signature-canvas'
import {useEffect, useRef, useState } from "react"

export const PasantesComponent = ({ register, index,setValue }) => {
  const [openModal1, setOpenModal1] = useState(false)
  const [openModal2, setOpenModal2] = useState(false)
  const firmaAuth1 = useRef({})
  const limpiarFirma1 = () => firmaAuth1.current.clear()
  const guardarFirma1 = () => {
    const dataUrl = firmaAuth1.current.getTrimmedCanvas().toDataURL('image/png');
    setValue(`firmaAuth${index}`, dataUrl);
    setOpenModal1(false);
  }

  useEffect(() => {
    register(`firmaAuth${index}`);
  }, [register, index]);

  const firmaAuth2 = useRef({})
  const limpiarFirma2 = () => firmaAuth2.current.clear()
  const guardarFirma2 = () => {
    const dataUrl2 = firmaAuth2.current.getTrimmedCanvas().toDataURL('image/png');
    setValue(`firmaMVZ${index}`, dataUrl2);
    setOpenModal2(false);
  }

  useEffect(() => {
    register(`firmaMVZ${index}`);
  }, [register, index]);


  return (
    <>
      <div className="flex flex-row">
        <input type="text" {...register(`nombre_y_apellidos${index}`)} className=" mb-0 ml-6 h-6" placeholder=" Ej.Text" />
        <input type="text" {...register(`documento${index}`)} className=" mb-0 ml-20 h-6" placeholder=" Ej.Text" />
        <input type="text" {...register(`semestre${index}`)} className=" mb-0 ml-9 h-6" placeholder=" Ej.Text" />
        <button type="button" onClick={() => setOpenModal1(true)}>
          Firmar Auth
        </button>
        <button type="button" onClick={() => setOpenModal2(true)}>
          Firmar MVZ
        </button>
        {openModal1 && (

          <div className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true" >

            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                  <div className="bg-white pb-4 pt-5 sm:pb-4">

                    <SignatureCanvas ref={firmaAuth1} penColor='black' canvasProps={{ width: 768, height: 194, className: 'sigCanvas' }} />
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button onClick={guardarFirma1} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Listo !</button>
                    <button onClick={limpiarFirma1} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Limpiar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

{openModal2 && (

<div className="relative z-10 " aria-labelledby="modal-title" role="dialog" aria-modal="true" >

  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
        <div className="bg-white pb-4 pt-5 sm:pb-4">

          <SignatureCanvas ref={firmaAuth2} penColor='black' canvasProps={{ width: 768, height: 194, className: 'sigCanvas' }} />
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={guardarFirma2} type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
          <button onClick={limpiarFirma2} type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Limpiar</button>
        </div>
      </div>
    </div>
  </div>
</div>
)}
      </div>
      <div className=' border-[1px] border-solid border-[#b5b7ba] h-0 w-[100%] my-4' />

    </>
  )
}
