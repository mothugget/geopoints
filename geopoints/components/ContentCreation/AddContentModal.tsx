import { useState, useContext } from 'react';
import Link from 'next/link'


import CreatePostModal from './CreatePostModal';
import { MapContext } from '../../contexts/MapContext';

interface AddContentModalProps {
  showAddContentModal: boolean;
}

export default function AddContentModal({ showAddContentModal }: AddContentModalProps) {
  const [showCreatePost, setShowCreatePost] = useState<boolean>(false)
  const [showCreateList, setShowCreateList] = useState<boolean>(false)

  const { map } = useContext(MapContext);
  const lat = map?.getCenter()?.lat();
  const lng = map?.getCenter()?.lng();
  console.log(`lat: ${lat} lng: ${lng}`);




  return (
    <div className={
      `${
        showAddContentModal ? 'translate-y-0 ' : 'translate-y-full'
      }
      flex  
      flex-col
      justify-end
      items-center
      fixed 
      h-screen
      mb-16
      inset-x-0 
      mx-auto 
      transition-all 
      ease-in-out 
      duration-600 
      z-20  
    `}>
      <button className="
      bg-white 
      rounded-md 
      text-gray-600
      p-1
      mb-1
      w-20
      " onClick={() => { setShowCreatePost(!showCreatePost) }}>
        New post
      </button>
      <button className="
      bg-white 
      rounded-md 
      text-gray-600
      p-1
      mb-[4.24rem]
      w-20
      " >
        New list
      </button>
      {showCreatePost && <CreatePostModal showCreatePost={showCreatePost} />}
    </div>

  )
}
