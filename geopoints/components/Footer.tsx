import { useState } from 'react';

import Image from 'next/image.js';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListsSidebar from './Sidebar/ListsSidebar';
import Link from 'next/link';
import New from './ContentCreation/New';

const Footer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);

  return (
    <>
      <ListsSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <footer className="h-16 z-10 bg-white">
        <div className="p-4 flex justify-between text-gray-600 fixed bottom-0 inset-x-0 z-50 bg-white">
          <Link href="/">
            <Image
              src={'/geopoints-logo.png'}
              alt="home logo"
              width={40}
              height={40}
              priority={true}
            />
          </Link>
          <New
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            showAddContentModal={showAddContentModal}
            setShowAddContentModal={setShowAddContentModal}
          />
          <AiOutlineUnorderedList
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-8 h-8"
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
