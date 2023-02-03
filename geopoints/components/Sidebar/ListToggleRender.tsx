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

  function sendPointsToMap() {
    const allPoints = [displayedPoints, list.points]
    if (enabled) {
      setDisplayedPoints!(allPoints.flat())
    } else {
      const allPoints: Point[] = []
      displayedPoints.forEach(point => {
        (point.listId !== list.id) && allPoints.push(point)
      })
      setDisplayedPoints!(allPoints)
    }
  }

  useEffect(() => {
    console.log(list.id) //107
    console.log(window.localStorage[list.title + list.id]) //false
    if (list.id && window.localStorage[list.title + list.id]) {
      console.log('HELLO I AM HERE ', list.title, ' ', list.id, ' enabled ', enabled, ' localstorage ', window.localStorage[list.title + list.id], '\n \t type ', typeof window.localStorage[list.title + list.id]) 
      setEnabled(JSON.parse(window.localStorage[list.title + list.id]))
      
      setRerender(true)
    }
  }, [])


  useEffect(() => {
    sendPointsToMap();
    list.id && (window.localStorage[list.title + list.id] = enabled);
  }, [enabled])



  return (
    <>
     
        <div className="mt-5 flex justify-between">
          <Switch
            checked={enabled}
            onChange={setEnabled}
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
