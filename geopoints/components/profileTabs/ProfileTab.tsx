import React from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

interface ProfileTabProps {
  imagePath: string;
  userName: string;
  bio: string;
}

const ProfileTab = ({
  imagePath,
  userName,
  bio
}: ProfileTabProps) => {
  return (
    <div>
      <Card className="h-auto w-auto object-contain">
        <img src={imagePath} alt="profile-picture" className="p-6"  />
      </Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {userName}
        </Typography>
        <Typography className="font-medium text-black" textGradient>
          {bio}
        </Typography>

      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            Facebook
          </Typography>
        </Tooltip>

        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            Instagram
          </Typography>
        </Tooltip>
      </CardFooter>
    </div>
  )
}

export default ProfileTab;