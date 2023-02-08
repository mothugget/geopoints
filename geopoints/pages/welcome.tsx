import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/geopoints-logo.png';
import illustration from '../public/Girl-Planting-a-Tree-Illustration-1-1536x1106-removebg-preview.png';

const Welcome = () => {
  return (
    <main className="text-gray-900 bg-gray-50 h-screen">
      <header>
        <div className="p-4 flex justify-start items-center">
          <Image src={logo} alt="" className="w-12" />
        </div>
      </header>
      <section className="h-[calc(100%-80px)] flex flex-col justify-evenly items-center">
        <div className="flex justify-center items-center text-center">
          <h1 className="text-7xl font-bold">
            The World is <span className="text-green-600">Yours</span>
          </h1>
        </div>
        <article>
          <p className="px-5 mt-7 text-gray-500 text-center text-xl">
            Keep track of your favourite locations, and share them with your
            friends.
          </p>
        </article>
        <div className="mb-4">
          <Image src={illustration} alt="Girl plating a tree"></Image>
        </div>
        <div>
          <div className="">
            <Link
              href="/"
              className="rounded-md bg-green-600 px-5 py-3 text-base font-semibold leading-7 text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Get started
            </Link>
          </div>
        </div>
        {/* whitespace at the bottom */}
        <footer className="h-6"></footer>
      </section>
    </main>
  );
};

export default Welcome;
