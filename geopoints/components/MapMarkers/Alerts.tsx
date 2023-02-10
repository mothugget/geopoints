import { useState } from 'react';
import { Alert } from '@material-tailwind/react';
import { UseMutationResult } from 'react-query/types/react/types';
import type { AlertProps } from '@material-tailwind/react';

interface MyAlertProps {
  message: string;
  color: AlertProps['color'];
  mutation: UseMutationResult<any, unknown, number, unknown>;
}

export default function Alerts({ message, color, mutation }: MyAlertProps) {
  const [show, setShow] = useState(true);

  return (
    <div className="">
      <Alert
        show={show}
        color={color}
        className="absolute z-40 bottom-20"
        dismissible={{
          onClose: () => {
            mutation.reset();
            setShow(false);
          },
        }}
      >
        {message}
      </Alert>
    </div>
  );
}
