import { Fragment, useContext, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';

export default function ClickedMarkerDialog() {
  const [open, setOpen] = useState(false);
  // const [prevPointId, setPrevPointId] = useState(0);

  const { clickedPointId, setClickedPointId } =
    useContext(ClickedMarkerContext);

  const handleOpen = () => {
    console.log(
      "I'm in the modal dialog and the id of the point youclicked is: ",
      clickedPointId
    );
    setOpen(!open);
    setClickedPointId && setClickedPointId(null);
  };

  return (
    <Fragment>
      <Dialog
        open={clickedPointId === 0 ? true : Boolean(clickedPointId)}
        handler={handleOpen}
        className="w-96 flex flex-col"
      >
        <DialogHeader className="text-xl mt-2">Point Options:</DialogHeader>
        <DialogFooter className="flex flex-col justify-center items-cente">
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="blue"
            onClick={handleOpen}
          >
            Show route
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="green"
            onClick={handleOpen}
          >
            Edit
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="red"
            onClick={handleOpen}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
