import React from "react";
import Link from "next/link";
import RouteToListAuthor from "../RouteToListAuthor/RouteToListAuthor";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

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
      <Card className="mt-0 mb-2 bg-white w-screen rounded-none shadow-none">
        <CardHeader
          className="relative h-56 mt-6 flex justify-center items-center bg-light-green-100"
        >
          {imagePath ? (
            <img
              src={imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
              alt=""
              className="h-full w-full"
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
