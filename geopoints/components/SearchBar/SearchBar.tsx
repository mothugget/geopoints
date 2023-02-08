import { useState } from 'react';
import Image from 'next/image.js';
import { AiOutlineSearch } from 'react-icons/ai';
import Search from './Search';
import mGlass from '../../public/mglass.png';

export const SearchBar = () => {
  const [showSearchInput, setShowSearchInput] = useState(false);

  function toggleSearch() {
    setShowSearchInput(!showSearchInput);
  }

  return (
    <div>
      <button
        onClick={toggleSearch}
        className="fixed left-0 top-0 flex z-20 justify-center items-center rounded-br-lg w-16 h-16"
      >
        <Image
          src={mGlass}
          onClick={toggleSearch}
          alt="Search icon"
          height={40}
          width={40}
          priority={true}
        />
      </button>
      {showSearchInput && (
        <div className="fixed flex shadow-none border-none top-0 z-10 pl-16 pr-16 h-16 w-screen">
          <Search />
        </div>
      )}
    </div>
  );
};
