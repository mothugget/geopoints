import React from 'react'
import CreatePostForm from './CreatePostForm';

interface CreatePostModalProps {
  showCreatePost: boolean;
}

export default function CreatePostModal({ showCreatePost }: CreatePostModalProps) {
  return (
    <div className={`
    ${showCreatePost ? 'translate-x-0 ' : 'translate-x-full'
      } fixed
      text-left 
      h-screen 
      top-0 
      right-0 
      w-[70vw] 
      bg-white shadow 
      p-10 
      pl-10  
      text-white 
      transition-all 
      ease-in-out 
      duration-600 
      z-30
      `}>
      <h2 className="w-full text-2xl font-bold text-gray-800">Create Post</h2>
      <CreatePostForm />
    </div>
  )
}
