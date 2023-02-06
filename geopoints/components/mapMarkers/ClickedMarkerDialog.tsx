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
import Link from 'next/link.js';

export default function ClickedMarkerDialog() {
  const [open, setOpen] = useState(false);
  const [prevClickedPoint, setPrevClickedPoint] = useState<Point | null>();
  const { clickedPoint, setClickedPoint } = useContext(ClickedMarkerContext);
  const { setDestinationService } = useContext(RoutesContext);
  const mutation = useDeletePoint();

  if (prevClickedPoint?.id !== clickedPoint?.id) {
    setPrevClickedPoint(clickedPoint);
    setOpen(true);
  }

  const handleOpen = () => {
    setOpen(!open);
    setClickedPoint && setClickedPoint(null);
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
          <Link href={'/points/'}>
            <Button
              className="my-1 w-24"
              variant="gradient"
              color="green"
              onClick={handleOpen}
            >
              Edit
            </Button>
          </Link>
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
