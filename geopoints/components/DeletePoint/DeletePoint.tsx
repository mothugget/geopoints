import { useRouter } from "next/router";
import useDeletePoint from "../../hooks/useDeletePoint";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import {useState} from 'react';
import Link from "next/link";

//DELETE POINT --> UPDATE LIST

function DeletePoint({ pointId }: { pointId: number | undefined}) {
    const [open, setOpen] = useState(false);
  const router = useRouter();
  const {mutate} = useDeletePoint();

    const handleOpen = () => {
      setOpen(!open);
    };


  return (
    <div>
      <Button
        ripple={false}
        onClick={() => {
          handleOpen();
        }}
        className="fixed bottom-20 left-4 bg-light-green-700"
      >
        Delete Point
      </Button>

      <Dialog open={open} handler={handleOpen} className="w-96 flex flex-col">
        <DialogHeader className="text-xl mt-2">
          Are you sure you want to delete the list?
        </DialogHeader>
        <DialogFooter className="flex flex-col justify-center items-center">
          <Link href="/">
            <Button
              className="my-1 w-24"
              variant="gradient"
              color="green"
              onClick={() => mutate(pointId!)}
            >
              Yes
            </Button>
          </Link>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="red"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default DeletePoint;
