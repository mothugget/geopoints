import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUserData } from '../../hooks/useUserData';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointUnderList from '../../components/PointUnderList';
import ProfileTab from '../../components/profileTabs/ProfileTab';
import ListsTab from '../../components/profileTabs/ListsTab';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext, NextApiRequest } from 'next';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { List, Point, User } from '../../types/types';


const prisma = new PrismaClient();

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from '@material-tailwind/react';
import Link from 'next/link';

const tableData = [
  {
    label: 'Lists',
    value: 'Lists',
  },
  {
    label: 'Points',
    value: 'Points',
  },

  {
    label: 'Favourites',
    value: 'Favourites',
  },

  {
    label: 'Profile',
    value: 'Profile',
  },
];

export default function MyTabs({ profileUser }: { profileUser: User }) {
  const { user } = useUser();
  const router = useRouter();
  const [tabDefault, setTabDefault] = useState(
    router.query.tabDefault || 'Lists'
  );

  const { isError, isLoading, data, error, refetch } = useUserData(profileUser!)
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  return (
    <Tabs value={tabDefault} className="bg-transparent">
      <TabsHeader className="text-gray-800 bg-transparent z-10">
        {tableData.map(({ label, value }) => (
          <Tab key={value} value={value} className="bg-transparent z-50">
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tableData.map(({ value }) => (
          <TabPanel key={value} value={value} className="mb-20">
            {value === 'Lists' ? (
              data?.ownLists.slice(1).map((list: List) => {
                return (
                  <div key={list.id} className="flex justify-center">
                    <ListsTab
                      imagePath={list.imagePath}
                      title={list.title}
                      description={list.description}
                      userName={data.userName}
                      listId={list.id!}
                    />
                  </div>
                );
              })
            ) : value === 'Points' ? (
              data?.ownLists[0].points.map((point: Point) => {
                return (
                  <PointUnderList
                    key={point.id}
                    title={point.title}
                    imagePath={point.imagePath}
                    description={point.description}
                  />
                );
              })
            ) : value === 'Profile' ? (
              data && data.imagePath ? (
                <>
                <ProfileTab imagePath={data.imagePath} name={data.name} userName={data.userName} bio={data.bio} />
                {user && user.email === profileUser.email && (
                  <Link className="fixed bottom-20 right-4" href={`../${data.userName}/edit`}>
                    <Button>Edit Profile</Button>
                  </Link>
                )}
                </>
              ) : (
                <LoadingSpinner />
              )
            ) : value === 'Favourites' ? (
              data?.likedLists.map((list: List) => {
                return (
                  <div className="flex justify-center" key={list.id}>
                    <ListsTab
                      imagePath={list.imagePath}
                      title={list.title}
                      description={list.description}
                      userName={data.userName}
                      listId={list.id!}
                    />
                  </div>
                );
              })
            ) : (
              <p>No data found</p>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}

// MyTabs.getInitialProps = async (ctx: NextPageContext) => {
//   const { query } = ctx;
//   return { tabDefault: query.tabDefault || 'Lists' };
// };

export async function getServerSideProps({ query }: { query: NextApiRequest['query']}) {
  const username = typeof query.userName === 'string' ? query.userName : query.userName![0];
  const profileUser = await prisma.user.findUnique({
    where: {
      userName: username
    }
  });

  return{
    props: {
      profileUser
    }
  }
}
