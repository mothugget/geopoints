import Footer from '../../components/Footer';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from 'react-query';

import Link from 'next/link';
import Image from 'next/image.js';



const User = () => {
  const { user } = useUser();
  // const { data } = useQuery(

  // )

  return (
    <main className="flex flex-col h-screen justify-between">
      <nav className="container mx-auto flex items-center justify-between px-4">
    <h1 className="w-full text-2xl font-bold text-gray-800">
      Profile
    </h1>
    <div className="flex">
    <Link href='' className='fixed
            right-0
            top-0
            flex
            z-20
            justify-center
            items-center
            overflow-hidden
            rounded-bl-lg
            bg-white
            w-16
            h-16'>
          <Image
            src="/fake-user-profile-pic.png"
            alt="Profile picture"
            width={64}
            height={64}
          />
        </Link>
    </div>
  </nav>
      <Footer />
    </main>
  )
}

export default User;