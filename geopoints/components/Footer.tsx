import { useContext, useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BsFillGeoFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListsSidebar from './Sidebar/ListsSidebar';
import AddContentModal from './ContentCreation/AddContentModal';
import { MapContext } from '../contexts/MapContext';
import Link from 'next/link';

const Footer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddContentModal, setShowAddContentModal] =
    useState<boolean>(false);

  return (
    <>
      <ListsSidebar showSidebar={showSidebar} />
      <footer className="h-16 z-10 bg-white">
        <div className="p-4 flex justify-between text-gray-600 fixed bottom-0 inset-x-0 z-50 bg-white">
          <Link href="/">
            <BsFillGeoFill className="w-8 h-8" />
          </Link>
          <button
            onClick={() => {
              setShowAddContentModal(!showAddContentModal);
            }}
          >
            <IoAddCircleOutline className="w-8 h-8" />
          </button>
          <AiOutlineUnorderedList
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-8 h-8"
          />
        </div>
          <AddContentModal showAddContentModal={showAddContentModal} />
      </footer>
    </>
  );
};

export default Footer;
