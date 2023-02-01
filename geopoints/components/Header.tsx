import Link from 'next/link';
import Image from 'next/image.js';
import { SearchBar } from './SearchBar/SearchBar';
import Search from './SearchBar/Search';
import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext';

const Header = () => {
  const { userData } = useContext(UserDataContext);
  function redirectProfile() {}

  return (
    <div className="z-40">
      <SearchBar />
      <Link
        href=""
        className="fixed
            right-0
            top-0
            flex
            z-40
            justify-center
            items-center
            overflow-hidden
            rounded-bl-lg
            backdrop-blur-lg
            w-16
            h-16"
      >
        <Image
          src={userData?.imagePath || '/fake-user-profile-pic.png'}
          alt="Profile picture"
          width={40}
          height={40}
          priority={true}
          className="rounded-full"
        />
      </Link>
    </div>
  );
};

export default Header;
