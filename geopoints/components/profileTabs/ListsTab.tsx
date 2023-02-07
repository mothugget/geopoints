import React from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';

interface ListTabProps {
  imagePath: string;
  title: string;
  description: string;
  listId: number;
  userName: string;
}

const ListTab = ({
  imagePath,
  title,
  description,
  listId,
  userName,
}: ListTabProps) => {
  return (
    <Link href={`../${userName}/lists/${listId}`}>
      <Card className="w-80 mt-10 mb-10 pt-14">
        <CardHeader
          color="white"
          className="relative h-56 flex justify-center items-center"
        >
          {imagePath ? (
            <img
              src={imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
              alt=""
              className="w-45 rounded"
            />
          ) : (
            <img
              src={process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
              alt=""
              className="w-10"
            />
          )}
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {title ? title : 'Untitled'}
          </Typography>
          <Typography>
            {description ? description : 'No description'}
          </Typography>
        </CardBody>
      </Card>
    </Link>
  );
};

export default ListTab;
