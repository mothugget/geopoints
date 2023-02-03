import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { useContext, Dispatch, SetStateAction } from 'react';
import GroupOfLists from './GroupOfLists';

interface ListsSidebarProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>
}

const ListsSidebar = ({ showSidebar, setShowSidebar }: ListsSidebarProps) => {
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  return (
    <div className={`${showSidebar ? 'translate-x-0 ' : 'translate-x-full'} fixed text-left h-full top-0 right-0 w-screen transition-all ease-in-out duration-600 z-30`}>
      <button className='h-full w-full z-20' onClick={()=> setShowSidebar(!showSidebar)}/>
      <div
        className={'fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10 z-30'}
      >
        <h2 className="w-full text-2xl font-bold text-gray-800">Map</h2>
        <div className="overflow-auto max-h-64">
          {data && (
            <GroupOfLists title="Your lists: " lists={data.ownLists} />
          )}
        </div>
        {data && <GroupOfLists title="Liked: " lists={data.likedLists} />}
      </div>
    </div>
  );
};

export default ListsSidebar;
