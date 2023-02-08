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
  const toggleState = window.localStorage.getItem('list' + list.id)
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);
  const { displayedPoints, setDisplayedPoints } = useContext(
    DisplayedPointsContext
  );

  function ensureUniquePoints(pointArray: Point[]) {
    return pointArray.filter((point, index) => {
      return pointArray.indexOf(point) === index;
    });
  }

  function sendListPointsToMap(pointArray: Point[]) {
    const allPoints = [...displayedPoints, ...pointArray]
    if (setDisplayedPoints) setDisplayedPoints(prevPoints => ensureUniquePoints(allPoints))
  }

  function removeListPointsFromMap(listId: number | undefined) {
    if (setDisplayedPoints) setDisplayedPoints(prevPoints => {
      return prevPoints.filter(point => (point.listId !== listId))
    })
  }


  useEffect(() => {
    if (toggleState !== null) {
      const toggleStateBool = JSON.parse(toggleState)
      setEnabled(toggleStateBool)
      if (toggleStateBool) {
        list.points && sendListPointsToMap(list.points)
      } else {
        removeListPointsFromMap(list.id)
      }
    }
  }, [toggleState])


  function makeListVisible(value: boolean) {
    window.localStorage.setItem('list' + list.id, JSON.stringify(value))
    setEnabled(value);
    if (value) {
      list.points && sendListPointsToMap(list.points)
    } else {
      removeListPointsFromMap(list.id)
    }
  }

  return (
    <>

      <div className="mt-5 flex justify-between">
        <Switch
          checked={enabled}
          onChange={makeListVisible}
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