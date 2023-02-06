import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DisplayedPointsContext } from '../contexts/DisplayedPointsContext';

const useDeletePoint = () => {
  const queryClient = useQueryClient();
  const { setDisplayedPoints } = useContext(DisplayedPointsContext);

  return useMutation(
    (pointId: number) => {
      return deletePoint(pointId);
    },
    {
      onSuccess: (deletedPoint) => {
        queryClient.invalidateQueries('fectchUserData');
        setDisplayedPoints &&
          setDisplayedPoints((displayedPoints) =>
            displayedPoints.filter((point) => point.id !== deletedPoint.id)
          );
      },
    }
  );
};

async function deletePoint(pointId: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/points/delete`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pointId }),
    }
  );

  if (!response.ok) {
    throw new Error('Error deleting point');
  }
  const data = await response.json();
  console.log('The point was deleted succesfully', data.deletedPoint);
  return data.deletedPoint;
}

export default useDeletePoint;
