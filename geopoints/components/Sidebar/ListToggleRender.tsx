//@ts-nocheck

import { useContext, useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import Link from 'next/link';
import { DisplayedPointsContext } from '../../contexts/DisplayedPointsContext';
import { List } from '../../types/types';
import { Point } from '../../types/types';
import { useUserData } from '../../hooks/useUserData';
import { useUser } from '@auth0/nextjs-auth0/client';

interface ListToggleProps {
  list: List;
}

const ListToggle = ({ list }: ListToggleProps) => {
  const [enabled, setEnabled] = useState(false);
  const [rerender, setRerender] = useState(false)

  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);
  const { displayedPoints, setDisplayedPoints } = useContext(
    DisplayedPointsContext
  );

  function sendListPointsToMap(pointArray) {
    setDisplayedPoints(prevPoints=>[...prevPoints,...pointArray])
  }

  function removeListPointsFromMap(listId) {
    setDisplayedPoints(prevPoints=>{
      return prevPoints.filter(point => (point.listId !== listId))
    })
  }


  useEffect(() => {
    const toggleState = window.localStorage.getItem(list.title + list.id)
    if (toggleState !== null) {
      const toggleStateBool = JSON.parse(toggleState)
      setEnabled(toggleStateBool)
      if (toggleStateBool) {
        sendListPointsToMap(list.points)
      } else {
        removeListPointsFromMap(list.id)
      }
    }
  }, [])



  function mockSetEnabled(value: any) {
    window.localStorage.setItem(list.title + list.id, value)
    setEnabled(value);
    if (value) {
      sendListPointsToMap(list.points)
    } else {
      removeListPointsFromMap(list.id)
    }
  } 

  return (
    <>

      <div className="mt-5 flex justify-between">
        <Switch
          checked={enabled}
          onChange={mockSetEnabled}
          className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full mr-6`}
        >
          <span
            className={`${enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>

        {data && (
          <Link href={`/${data.userName}/lists/${list.id}`}>
            <p className="w-32 text-sm text-gray-700 underline hover:text-blue-900">
              {list.title}
            </p>
          </Link>
        )}
      </div>

    </>
  );
};

export default ListToggle;

//todo test toggle on one list, then refresh ,toggle on the next list, refresh, toggle off, refresh, toggle off refresh