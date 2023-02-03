import Link from 'next/link';
import Image from 'next/image.js';
import SmallLoadingSpinner from './SmallLoadingSpinner';
import { SearchBar } from './SearchBar/SearchBar';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';

const Header = () => {
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  return (
    <div className="z-40">
      <SearchBar />
      <Link href={`/${data?.userName}/profile`}>
        {data?.imagePath ? (
          <Image
            src={data?.imagePath || '/favicon.ico'}
            alt="Profile picture"
            width={40}
            height={40}
            priority={true}
            className="rounded-full fixed right-3 top-3 z-40 backdrop-blur-lg"
          />
        ) : (
          <div className="absolute right-4 top-4">
            <SmallLoadingSpinner size={30} />
          </div>
        )}
      </Link>
    </div>
  );
};

export default Header;
