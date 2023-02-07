import { useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import Alerts from './Alerts';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';
import { Point } from '../../types/types';
import useDeletePoint from '../../hooks/useDeletePoint';
import { RoutesContext } from '../../contexts/RoutesContext';
import EditPointModal from '../PointEditing/EditPointModal';

export default function ClickedMarkerDialog() {
  const [showEditPoint, setShowEditPoint] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevClickedPoint, setPrevClickedPoint] = useState<Point | null>();
  const { clickedPoint, setClickedPoint } = useContext(ClickedMarkerContext);
  const { setDestinationService } = useContext(RoutesContext);
  const mutation = useDeletePoint();

  let pointWeAreGoingToEdit;
  if (clickedPoint) {
    pointWeAreGoingToEdit = clickedPoint;
  }

  if (prevClickedPoint?.id !== clickedPoint?.id) {
    setPrevClickedPoint(clickedPoint);
    setOpen(true);
  }

  const handleOpen = () => {
    setOpen(!open);
    setClickedPoint && setClickedPoint(null);
  };

  const handleEditClick = () => {
    setShowEditPoint(true);
    setOpen(false);
    // setClickedPoint && setClickedPoint(null);
  };

  const handleShowRoute = () => {
    if (clickedPoint && setDestinationService) {
      setDestinationService((setDestinationService) => ({
        ...setDestinationService,
        destination: {
          lat: clickedPoint.lat,
          lng: clickedPoint.lng,
        },
        showRoute: true,
      }));
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (clickedPoint) {
      mutation.mutate(clickedPoint.id!);
      setOpen(false);
    }
  };

  return (
    <>
      {pointWeAreGoingToEdit && (
        <EditPointModal
          showEditPoint={showEditPoint}
          setShowEditPoint={setShowEditPoint}
          pointData={pointWeAreGoingToEdit}
        />
      )}
      {mutation.isSuccess ? (
        <Alerts
          message="Point deleted correctly"
          color="green"
          mutation={mutation}
        />
      ) : mutation.isError ? (
        <Alerts
          message="Something went wrong deleting the point"
          color="red"
          mutation={mutation}
        />
      ) : null}
      <Dialog open={open} handler={handleOpen} className="w-96 flex flex-col">
        <DialogHeader className="text-xl mt-2">Point Options:</DialogHeader>
        <DialogFooter className="flex flex-col justify-center items-cente">
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="blue"
            onClick={handleShowRoute}
          >
            {'Show route'}
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="green"
            onClick={() => handleEditClick()}
          >
            Edit
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="red"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
