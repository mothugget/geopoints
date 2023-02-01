import Link from 'next/link';
import Image from 'next/image.js';
import { SearchBar } from './SearchBar/SearchBar';
import { useContext } from 'react';
import { UserDataContext } from '../contexts/UserDataContext';

const Header = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <div className="z-40">
      <SearchBar />
      <Link href={`/profile/${userData?.userName}`}>
        <Image
          src={userData?.imagePath || '/fake-user-profile-pic.png'}
          alt="Profile picture"
          width={40}
          height={40}
          priority={true}
          className="rounded-full fixed right-3 top-3 z-40 backdrop-blur-lg"
        />
      </Link>
    </div>
  );
};

export default Header;
