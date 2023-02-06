import { Dispatch, SetStateAction, useContext } from 'react'

import { MapContext } from '../../contexts/MapContext';

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
    const { setShowCrosshair } = useContext(MapContext);


    function createHandler() {
        setShowCrosshair && setShowCrosshair(false);
        setShowCrosshairModal(false);
        setShowCreatePoint(true);
    }

    function cancelHandler() {
        setShowCrosshair && setShowCrosshair(false);
        setShowCrosshairModal(false);
    }



    return (
        <div className={` fixed flex justify-center items-center h-fit bottom-0 inset-x-0 mx-auto w-fit ${showCrosshairModal ? 'translate-y-0 ' : 'translate-y-full'} transition-all ease-in-out duration-600 z-0`}>
            <div className='flex flex-col justify-center items-start h-fit w-fit p-4 bg-white text-gray-600 rounded-md  mb-16 drop-shadow-md'>
                <button className='text-left py-2 w-44' onClick={createHandler}>
                    Create point at <br /> current location
                </button>
                <button className='text-left py-2 w-44' onClick={cancelHandler}>
                    Cancel
                </button>
            </div>

        </div>
    )
}
