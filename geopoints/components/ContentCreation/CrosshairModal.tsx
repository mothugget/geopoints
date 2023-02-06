import {Dispatch, SetStateAction} from 'react'

interface CrosshairModalProps {
    showCrosshairModal: boolean;
    setShowCrosshairModal: Dispatch<SetStateAction<boolean>>;
    setShowCreatePoint: Dispatch<SetStateAction<boolean>>;
}

export default function CrosshairModal({
    showCrosshairModal,
    setShowCrosshairModal,
    setShowCreatePoint,
}: CrosshairModalProps) {


  return (
      <div className={` fixed flex justify-center items-center h-fit bottom-0 inset-x-0 mx-auto w-fit ${showCrosshairModal ? 'translate-y-0 ' : 'translate-y-full'} transition-all ease-in-out duration-600 z-0`}>
          <div className='flex justify-center items-center h-fit w-fit p-4 bg-white text-gray-700 rounded-md  mb-20'>
        Hello
        </div>
        
        </div>
  )
}
