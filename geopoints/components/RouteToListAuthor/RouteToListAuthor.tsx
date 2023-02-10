import {useRouter} from 'next/router.js';
import Link from 'next/link';
import { Typography } from '@material-tailwind/react';


function RouteToListAuthor({userName}: {userName: string}) {
  const router = useRouter();

  return (
    <Link href={`/${userName}/profile`}>
      <Typography className="text-cyan-500 flex z-10">List's Author</Typography>
    </Link>
  );
};

export default RouteToListAuthor;