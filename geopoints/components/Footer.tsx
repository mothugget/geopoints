import { useState, useContext } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { BsFillGeoFill } from 'react-icons/bs';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ListsSidebar from './ListsSidebar';
import { PointCreationContext } from '../contexts/PointCreationContext';

const Footer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
console.log('hello')
  const { centerCoordinates } = useContext(PointCreationContext)

function logCenter(params:type) {
  console.log(centerCoordinates)
}
  return (
    <>
      {showSidebar && <ListsSidebar showSidebar={showSidebar} />}
      <footer className="h-16 z-10 bg-white">
        <div className="p-4 flex justify-between text-gray-600 ">
          <BsFillGeoFill className="w-8 h-8" />
          <button onClick={logCenter}>
            <IoAddCircleOutline className="w-8 h-8" />
          </button>
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
