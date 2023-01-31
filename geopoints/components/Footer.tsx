import { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BsFillGeoFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListsSidebar from './Sidebar/ListsSidebar';

import AddContentModal from './AddContentModal';
const Footer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState<Boolean>(false);
  console.log(showAddContentModal)

console.log('hello')

  return (
    <>
      {showSidebar && <ListsSidebar showSidebar={showSidebar} />}
      <footer className="h-16 z-10 bg-white">
        <div className="p-4 flex justify-between text-gray-600 fixed bottom-0 inset-x-0 z-50 bg-white">
          <BsFillGeoFill className="w-8 h-8" />
          <button onClick={()=>{ setShowAddContentModal(!showAddContentModal)}}>
            <IoAddCircleOutline className="w-8 h-8" />
          </button>
          <AiOutlineUnorderedList
            onClick={() => setShowSidebar(!showSidebar)}
            className="w-8 h-8"
          />
        </div>
        {showAddContentModal&&<AddContentModal/>}
      </footer>
    </>
  );
};

export default Footer;
