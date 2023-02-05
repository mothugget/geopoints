import { useMutation, useQueryClient } from 'react-query';
import { CreatePointData } from '../types/types';
import { createPoint } from '../util/createPoint';
import { useContext } from 'react';
import { DisplayedPointsContext } from '../contexts/DisplayedPointsContext';

const useCreatePoint = () => {
  const queryClient = useQueryClient();
  const { setDisplayedPoints } = useContext(DisplayedPointsContext);

  return useMutation(
    (pointData: CreatePointData) => {
      return createPoint(pointData, pointData.listId);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('fectchUserData');
        if (setDisplayedPoints) {
          window.localStorage.setItem('list' + data.newPoint.listId, 'true');
          setDisplayedPoints((samePoints) => [...samePoints, data.newPoint]);
        }
      },
    }
  );
};

export default useCreatePoint;
