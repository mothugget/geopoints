import React from "react";
import CreateListForm from "./CreateListForm";

interface CreateListModalProps {
  showCreateList: boolean;
}

export default function CreateListModal({
  showCreateList,
}: CreateListModalProps) {

  return (
    <div
      className={`
    ${showCreateList ? "translate-x-0 " : "translate-x-full"} fixed
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
      `}
    >
      <h2 className="w-full text-2xl font-bold text-gray-800">List</h2>
      <CreateListForm />
    </div>
  );
}
