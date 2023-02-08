import React from 'react';
import Link from 'next/link';
import { BsInstagram, BsFacebook } from 'react-icons/bs';

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Button,
} from '@material-tailwind/react';

interface ProfileTabProps {
  name: string;
  imagePath: string;
  userName: string;
  bio: string;
}

const ProfileTab = ({ imagePath, name, userName, bio }: ProfileTabProps) => {
  return (
    <div>
      <Card className="h-auto w-auto object-contain bg-amber-50">
        <img src={imagePath} alt="profile-picture" className="p-6" />
      </Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name ? name : ''}
        </Typography>
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 font-medium text-gray-500"
        >
          {userName ? `@${userName}` : ''}
        </Typography>
        <Typography className="font-medium text-gray-300" textGradient>
          {bio ? bio : ''}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <BsFacebook className="h-7 w-7" />
        </Tooltip>
        <Tooltip content="Follow">
          <BsInstagram className="h-7 w-7" />
        </Tooltip>
      </CardFooter>
      {/* <Link className="fixed bottom-20 right-4" href={`../${userName}/edit`}>
        <Button>Edit Profile</Button>
      </Link> */}
    </div>
  );
};

export default ProfileTab;
