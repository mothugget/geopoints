import React from 'react';
import Link from 'next/link';

import { Card, CardBody, Typography } from '@material-tailwind/react';

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
        <img
          src={imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
          alt="point-picture"
          className="p-36"
        />
      </Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title ? title : 'Untitled'}
        </Typography>
        <Typography className="font-medium" color="blue-gray" textGradient>
          {desc ? desc : 'No description'}
        </Typography>
      </CardBody>
    </div>
  );
};

export default PointDisplay;
