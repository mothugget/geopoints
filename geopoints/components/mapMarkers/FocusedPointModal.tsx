import { useContext } from 'react'

import { MapContext } from '../../contexts/MapContext';

export default function FocusedPointModal() {
    const { showPointModal, setShowPointModal, focusedPoint } = useContext(MapContext);

    return (
        <>
            <button className='fixed top-0 left-0 h-full w-full z-20' onClick={() => setShowPointModal(!showPointModal)} />
            {showPointModal &&
                <div className='fixed h-52 w-52 bg-black z-50 top-0 right-0'>
                    {focusedPoint?.title}
                </div>}
        </>
    )
}
