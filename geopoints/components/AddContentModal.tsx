import { useState, useContext } from 'react';
import { PointCreationContext } from '../contexts/PointCreationContext';

export default function AddContentModal() {
    const { centerCoordinates } = useContext(PointCreationContext)
    function logCenter() {
        console.log(centerCoordinates)
    }
console.log('rerender')
  return (
      <button className='fixed top-20 left-20' onClick={logCenter}>Log Coordinates</button>
  )
}
