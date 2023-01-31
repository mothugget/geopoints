import Footer from '../../components/Footer';
import React from "react";

import Link from 'next/link';
import Image from 'next/image.js';

import { useContext } from 'react';
import { UserDataContext } from '../../contexts/UserDataContext';

import { useState } from 'react'
import { Tab } from '@headlessui/react'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useQuery } from 'react-query';
import fetchUserData from '../../util/fetchUserData';
import LoadingSpinner from '../../components/LoadingSpinner';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const User = () => {
  const [openTab, setOpenTab] = React.useState(1);
  // const { user } = useUser();
  // console.log('User data: ',userData);


  const { userData, setUserData } = useContext(UserDataContext);
  const Auth = useUser();

  // fetch the user data with ReactQuery using the user email from auth0
  // const { isError, isLoading, data, error, refetch } = useQuery(
  //   ['fectchUserData', Auth.user?.email],
  //   async () => {
  //     try {
  //       const data = await fetchUserData(Auth.user?.email!);
  //       if (data && setUserData) {
  //         setUserData({ ...data }); // set user data to global context
  //         return data;
  //       }
  //     } catch (error) {
  //       console.log(error)
  //       throw new Error('Error fetching data');
  //     }
  //   },
  //   {
  //     enabled: false,
  //   }
  // );

  // if (Auth.isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (Auth.error) {
  //   return <span className="text-black">Error on Auth</span>;
  // }

  // if (!data) {
  //   refetch();
  //   return null;
  // }

  // if (isLoading) {
  //   return <LoadingSpinner />;
  // }

  // if (isError && error instanceof Error) {
  //   return <span className="text-black">Error: {error.message}</span>;
  // }

  // console.log(userData)


  let [categories] = useState({
    Lists: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Points: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Favourites: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
    Profile: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  })

  return (
    <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {/* <Footer/> */}
    </div>
  )


}

export default User;