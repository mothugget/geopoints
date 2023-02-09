import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image.js';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MapContext } from '../contexts/MapContext';
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
  const { destinationService, setDestinationService } =
    useContext(RoutesContext);
  const { map, currentUserPosition } = useContext(MapContext);

  const cameraOptions: google.maps.CameraOptions = {
    center: currentUserPosition,
  };

  const { user } = useUser();
  const { data } = useUserData(user!);

  if (router.pathname !== prevRoute) {
    setPrevRoute(router.pathname);
    setShowSidebar(false);
  }

  function logoHandler() {
    map?.moveCamera(cameraOptions);
    router.push('/');
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
      <footer className="h-16 z-10 bg-light-green-200 ">
        <div className="p-4 flex justify-between text-gray-600 fixed bottom-0 inset-x-0 z-50 bg-light-green-400">
          <button onClick={logoHandler}>
            <Image
              src={"/geopoints-logo-white.png"}
              alt="home logo"
              width={40}
              height={40}
              priority={true}
            />
          </button>
          <TbRoute
            onClick={handleRouteClick}
            className={`w-6 h-8 mt-1 ${
              destinationService.showRoute ? `text-white` : `text-gray-600`
            }`}
          />
          <New showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
          <Link href={`/${data?.userName}/profile?tabDefault=Favourites`}>
            <BsBookmarkHeart className="w-6 h-8 mt-1 text-white" />
          </Link>
          <AiOutlineUnorderedList
            onClick={() => {
              if (router.pathname === "/") {
                setShowSidebar(!showSidebar);
              }
            }}
            className={`w-9 h-9 ${
              router.pathname === "/" ? `text-white` : `text-gray-600`
            }`}
          />
        </div>
      </footer>
    </>
  );
};

export default Footer;
