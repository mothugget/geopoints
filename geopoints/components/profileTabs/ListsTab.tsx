import React from "react";
import Link from 'next/link';

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
  userName
} : ListTabProps) => {
  return (
    <Link href={`../${userName}/lists/${listId}`}>
      <Card className="w-96 mt-10 mb-10 bg-amber-50">
        <CardHeader color="blue" className="relative h-56">
          <img
            src={imagePath}
            alt="img-blur-shadow"
            className="h-full w-full"
          />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h5" className="mb-2">
            {title ? title : ""}
          </Typography>
          <Typography>{description ? description : ""}</Typography>
        </CardBody>
      </Card>
    </Link>
  );
}

export default ListTab;