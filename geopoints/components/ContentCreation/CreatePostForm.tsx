import React from 'react'


export default function CreatePostForm() {
  return (
    <form className='
    mt-10
    flex
    flex-col
    '>
      <label htmlFor="Title" className='
      w-full 
      text-base 
      font-bold 
      text-gray-800
      '>
        Title
      </label>
      <label htmlFor="Description" className='
      w-full 
      text-base 
      font-bold 
      text-gray-800
      '>
        Description
      </label>
      <label htmlFor="Public" className='
      w-full 
      text-base 
      font-bold 
      text-gray-800
      '>
        Make post public?
      </label>
      <label htmlFor="List" className='
      w-full 
      text-base 
      font-bold 
      text-gray-800
      '>
        List
      </label>
      <label htmlFor="Tags" className='
      w-full 
      text-base 
      font-bold 
      text-gray-800
      '>
        Tags
      </label>
     
    </form>
  )
}
