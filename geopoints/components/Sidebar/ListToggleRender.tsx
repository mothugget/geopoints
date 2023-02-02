import { useContext, useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { UserDataContext } from "../../contexts/UserDataContext";
import { DisplayedPointsContext } from "../../contexts/DisplayedPointsContext";
import { List } from "../../types/types";
import { Point } from '../../types/types';

interface ListToggleProps {
  list: List;
}

const ListToggle = ({ list }: ListToggleProps) => {
  const [enabled, setEnabled] = useState(false);
  const { userData } = useContext(UserDataContext);
  const { displayedPoints, setDisplayedPoints } = useContext(
    DisplayedPointsContext
  );


  useEffect(() => {
    const allPoints = [displayedPoints, list.points]
    if (enabled) {
      setDisplayedPoints!(allPoints.flat())
    } else {
      const allPoints: Point[] = []
      displayedPoints.forEach(point => {
        (point.listId !== list.id)&&allPoints.push(point)
      })
      setDisplayedPoints!(allPoints)
    }

  }, [enabled])




  // if (enabled && setDisplayedPoints) {
  //    list.points.forEach((point) =>{
  //   if(displayedPoints===null){

  //       setDisplayedPoints([point])

  //   } else {

  //       setDisplayedPoints([...displayedPoints!, point])

  //   }}
  //   );

  // } else if (displayedPoints && setDisplayedPoints) {
  //   let cachePoints = displayedPoints;
  //   setDisplayedPoints([]);
  //   cachePoints.forEach((point) => {
  //     if (point.listId !== list.id) {
  //       setDisplayedPoints([...displayedPoints!, point]);
  //     }
  //   });
  // }

  return (
    <div className="mt-5 flex justify-between">
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full mr-6`}
      >
        <span
          className={`${enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>

      {userData && (
        <Link href={`/${userData.userName}/lists/${list.id}`}>
          <p className="w-32 text-sm text-gray-700 underline hover:text-blue-900">
            {list.title}
          </p>
        </Link>
      )}
    </div>
  );
};

export default ListToggle;
