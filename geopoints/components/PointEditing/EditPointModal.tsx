import { Dispatch, SetStateAction } from 'react';

import { Point } from '../../types/types';
import EditPointForm from './EditPointForm';

interface EditPointModalProps {
  showEditPoint: boolean;
  setShowEditPoint: Dispatch<SetStateAction<boolean>>;
  pointData: Point | null;
}

export default function EditPointModal({
  showEditPoint,
  setShowEditPoint,
  pointData,
}: EditPointModalProps) {
  return (
    pointData && (
      <div
        className={`${
          showEditPoint ? 'translate-x-0 ' : 'translate-x-full'
        } fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-30`}
      >
        <button
          className="h-full w-full z-20"
          onClick={() => setShowEditPoint(!showEditPoint)}
        />
        <div className="fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10 z-30">
          <h2 className="w-full text-2xl font-bold text-gray-800">
            Edit Point
          </h2>
          <EditPointForm
            setShowEditPoint={setShowEditPoint}
            pointData={pointData}
          />
        </div>
      </div>
    )
  );
}
