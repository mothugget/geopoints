import {Dispatch, SetStateAction} from "react";

import { List} from '../../types/types';
import EditListForm from "./EditListForm";

interface EditListModalProps {
  showEditList: boolean;
  setShowEditList: Dispatch<SetStateAction<boolean>>
  listData: List;
}

export default function EditListModal({
  showEditList,
  setShowEditList,
  listData
}: EditListModalProps) {
console.log(listData)
  return (
    <div className={`${showEditList ? 'translate-x-0 ' : 'translate-x-full'} fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-30`}>
      <button className='h-full w-full z-20' onClick={() => setShowEditList(!showEditList)} />
      <div className='fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10 z-30'>
        <h2 className="w-full text-2xl font-bold text-gray-800">Edit List</h2>
        {/* <EditListForm setShowEditList={setShowEditList} /> */}
      </div>
    </div>
  );
  
}
