import { useState } from 'react';
import { Switch } from '@headlessui/react';

const ListToggle = ({ listTitle }: { listTitle: string }) => {
  const [enabled, setEnabled] = useState(false);

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
      <p className="w-32 text-sm text-gray-700">{listTitle}</p>
    </div>
  );
};

export default ListToggle;
