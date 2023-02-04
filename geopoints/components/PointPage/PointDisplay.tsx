import React from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from "@material-tailwind/react";

interface PointDisplayProps {
  imagePath: string;
  // userName: string;
  desc: string;
  title: string;
}

const PointDisplay = ({
  imagePath,
  // userName,
  desc,
  title,
}: PointDisplayProps) => {
  return (
    <div>
      <Card className="h-auto w-auto object-contain">
        <img src={imagePath} alt="point-picture" className="p-6" />
      </Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="font-medium" color="blue-gray" textGradient>
          {desc}
        </Typography>
      </CardBody>
    </div>
  );
}

export default PointDisplay;