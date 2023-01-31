import { useContext, useState } from 'react';
import { Switch } from '@headlessui/react';
import Link from 'next/link';
import { UserDataContext } from '../contexts/UserDataContext';

interface ListToggleProps {
  listTitle: string;
  listId: number;
}

const ListToggle = ({ listTitle, listId }: ListToggleProps) => {
  const [enabled, setEnabled] = useState(false);
  const { userData } = useContext(UserDataContext);

  return (
    <div className="mt-5 flex justify-between">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full mr-6`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>

      {userData && (
        <Link href={`/${userData.userName}/lists/${listId}`}>
          <p className="w-32 text-sm text-gray-700 underline hover:text-blue-900">{listTitle}</p>
        </Link>
      )}
    </div>
  );
};

export default ListToggle;
