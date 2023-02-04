import { useContext } from 'react'

import { MapContext } from '../../contexts/MapContext';

export default function FocusedPointModal() {
    const { showPointModal, focusedPoint } = useContext(MapContext);

    return (
        <>
            {showPointModal &&
                <div className='fixed h-500 w-500 bg-white z-50 top-0 l-0'>
                    {focusedPoint?.title}
                </div>}
        </>
    )
}
