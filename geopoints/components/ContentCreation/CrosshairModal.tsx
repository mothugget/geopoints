import { Dispatch, SetStateAction } from 'react'

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
            <div className='flex flex-col justify-center items-start h-fit w-48 p-4 bg-white text-gray-600 rounded-md  mb-16 drop-shadow-md'>
                <button className='py-2' onClick={() => setShowCrosshairModal(false)}>
                    Create point at <br/> current location
                </button>
                <button className='py-2' onClick={() => setShowCrosshairModal(false)}>
                    Cancel
                </button>
            </div>

        </div>
    )
}
