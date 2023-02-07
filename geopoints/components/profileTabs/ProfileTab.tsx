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
      <Card className="h-auto w-auto object-contain">
        <img src={imagePath} alt="profile-picture" className="p-6" />
      </Card>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {name ? name : ''}
        </Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {userName ? userName : ''}
        </Typography>
        <Typography className="font-medium text-black" textGradient>
          {bio ? bio : ''}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <BsInstagram className="text-blue-500 w-7 h-7" />
        </Tooltip>
        <Tooltip content="Follow">
          <BsFacebook className="text-blue-500 w-7 h-7" />
        </Tooltip>
      </CardFooter>
      {/* <Link className="fixed bottom-20 right-4" href={`../${userName}/edit`}>
        <Button>Edit Profile</Button>
      </Link> */}
    </div>
  );
};

export default ProfileTab;
