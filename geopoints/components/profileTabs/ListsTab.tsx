import React from "react";

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
}

const ListTab = ({
  imagePath,
  title,
  description
} : ListTabProps) => {
  return (
    <Card className="w-96 mt-10">
      <CardHeader color="blue" className="relative h-56">
        <img
          src={imagePath}
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
    </Card>
  )
}

export default ListTab;