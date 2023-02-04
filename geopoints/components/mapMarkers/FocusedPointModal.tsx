import { useContext } from 'react'

import { MapContext } from '../../contexts/MapContext';

export default function FocusedPointModal() {
    const { showPointModal, setShowPointModal, focusedPoint } = useContext(MapContext);
    console.log(focusedPoint?.title)
    return (
        <div className={`${showPointModal ? 'translate-x-0 ' : 'translate-x-full'} fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-50`}>
            <button className=' h-full w-full z-20' onClick={() => setShowPointModal&&setShowPointModal(false)} />
            <div className=' fixed h-52 w-52 bg-black text-white z-30 top-0 right-0'>
                {focusedPoint?.title}
            </div>
        </div>
    )
}
