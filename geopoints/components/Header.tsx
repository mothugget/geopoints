import Link from 'next/link';
import Image from 'next/image.js';
import SmallLoadingSpinner from './SmallLoadingSpinner';
import { SearchBar } from './SearchBar/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from '@material-tailwind/react';

const Header = () => {
  const { user } = useUser();
  const { data } = useUserData(user!);

  return (
    <div className="z-40">
      <SearchBar />
      <Link href={`/${data?.userName}/profile`}></Link>
      {data?.imagePath ? (
        <Menu>
          <MenuHandler>
            <Image
              src={data?.imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
              alt="Profile picture"
              width={40}
              height={40}
              priority={true}
              className="rounded-full fixed right-3 top-3 z-40 backdrop-blur-lg"
            />
          </MenuHandler>
          <MenuList>
            <Link href={`/${data?.userName}/profile`}>
              <MenuItem>Your profile</MenuItem>
            </Link>
            <Link href={`/api/auth/logout`}>
              <MenuItem className="bg-red-300 text-white">Logout</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      ) : (
        <div className="absolute right-4 top-4">
          <SmallLoadingSpinner size={30} />
        </div>
      )}
    </div>
  );
};

export default Header;
