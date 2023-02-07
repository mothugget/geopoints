import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image.js';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { TbRoute } from 'react-icons/tb';
import { BsBookmarkHeart } from 'react-icons/bs';
import ListsSidebar from './Sidebar/ListsSidebar';
import Link from 'next/link';
import New from './ContentCreation/New';
import { RoutesContext } from '../contexts/RoutesContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../hooks/useUserData';

const Footer = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [prevRoute, setPrevRoute] = useState('');
  const router = useRouter();
  const { destinationService, setDestinationService } = useContext(RoutesContext);

  const { user } = useUser();
  const { data } = useUserData(user!);

  if (router.pathname !== prevRoute) {
    setPrevRoute(router.pathname);
    setShowSidebar(false);
  }

  const handleRouteClick = () => {
    setDestinationService &&
      setDestinationService((destinationService) => ({
        ...destinationService,
        showRoute: !destinationService.showRoute,
      }));
  };

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
          <TbRoute
            onClick={handleRouteClick}
            className={`w-6 h-8 mt-1 ${
              destinationService.showRoute ? `text-green-400` : `text-gray-600`
            }`}
          />
          <New showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <Link href={`/${data?.userName}/profile`}>
            <BsBookmarkHeart className="w-6 h-8 mt-1" />
          </Link>
          <AiOutlineUnorderedList
            onClick={() => {
              if (router.pathname === '/') {
                setShowSidebar(!showSidebar);
              }
            }}
            className={`w-9 h-9 ${
              router.pathname === '/' ? `text-gray-600` : `text-gray-200`
            }`}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
