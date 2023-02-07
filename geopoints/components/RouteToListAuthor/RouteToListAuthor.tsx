import {useRouter} from 'next/router.js';
import Link from 'next/link';
import { Typography } from '@material-tailwind/react';

interface RouteToListAuthorProps {
  userName: string
}

function RouteToListAuthor({userName}: RouteToListAuthorProps) {
  const router = useRouter();

  return (
    <>
      <Link href={`${userName}/profile`} >
        <Typography clasName="text-cyan-500"> List's Author</Typography>
      </Link>
    </>
  )
};

export default RouteToListAuthor;