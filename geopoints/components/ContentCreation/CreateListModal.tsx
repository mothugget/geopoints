import React from "react";
import CreateListForm from "./CreateListForm";

interface CreateListModalProps {
  showCreateList: boolean;
  setShowCreateList: Dispatch<SetStateAction<boolean>>
}

export default function CreateListModal({
  showCreateList,
  setShowCreateList
}: CreateListModalProps) {

  return (
    <div className={`${showCreateList ? 'translate-x-0 ' : 'translate-x-full'} fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-30`}>
      <button className='h-full w-full z-20' onClick={() => setShowCreateList(!showCreateList)} />
      <div className='fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10 z-30'>
        <h2 className="w-full text-2xl font-bold text-gray-800">Create List</h2>
        <CreateListForm setShowCreateList={setShowCreateList} />
      </div>
    </div>
  );
  
}
