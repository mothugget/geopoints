import { Dispatch, SetStateAction } from 'react';
import CreatePostForm from './CreatePointForm';

interface CreatePointModalProps {
  showCreatePoint: boolean;
  setShowCreatePoint: Dispatch<SetStateAction<boolean>>;
}

export default function CreatePointModal({
  showCreatePoint,
  setShowCreatePoint,
}: CreatePointModalProps) {
  return (
    <div
      className={`${
        showCreatePoint ? 'translate-x-0 ' : 'translate-x-full'
      } fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-30`}
    >
      <button
        className="h-full w-full z-20"
        onClick={() => setShowCreatePoint(!showCreatePoint)}
      />
      <div className="fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10 z-30">
        <h2 className="w-full text-2xl font-bold text-gray-800">Create Point</h2>
        <CreatePostForm setShowCreatePoint={setShowCreatePoint}/>
      </div>
    </div>
  );
}
