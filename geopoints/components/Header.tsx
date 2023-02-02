import Link from 'next/link';
import Image from 'next/image.js';
import { SearchBar } from './SearchBar/SearchBar';
import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext';
import SmallLoadingSpinner from './SmallLoadingSpinner';

const Header = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="z-40">
      <SearchBar />
      <Link href={`/${userData?.userName}/profile`}>
        {userData?.imagePath ? (
          <Image
            src={userData?.imagePath || '/favicon.ico'}
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
