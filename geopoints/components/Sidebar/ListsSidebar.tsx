import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import GroupOfLists from './GroupOfLists';

interface ListsSidebarProps {
  showSidebar: boolean;
}

const ListsSidebar = ({ showSidebar }: ListsSidebarProps) => {
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  return (
    <div
      className={`${
        showSidebar ? 'translate-x-0 ' : 'translate-x-full'
      } fixed text-left h-full top-0 right-0 w-[70vw] bg-white shadow p-10 pl-10  text-white transition-all ease-in-out duration-600 z-30
      `}
    >
      <h2 className="w-full text-2xl font-bold text-gray-800">Map</h2>
      <div className="overflow-auto max-h-64">
        {data && (
          <GroupOfLists title="Your lists: " lists={data.ownLists} />
        )}
      </div>
      {data && <GroupOfLists title="Liked: " lists={data.likedLists} />}
    </div>
  );
};

export default ListsSidebar;
