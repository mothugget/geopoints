import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUserData } from '../../hooks/useUserData';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointUnderList from '../../components/PointUnderList';
import ProfileTab from '../../components/profileTabs/ProfileTab';
import ListsTab from '../../components/profileTabs/ListsTab';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from '@material-tailwind/react';
import { List, Point } from '../../types/types';
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

export default function MyTabs({ profileUser }) {
  const { user } = useUser();
  console.log('User: ',user)
  const router = useRouter();
  // const userProfile = router.query.userName
  console.log('UserProfile: ',profileUser)
  const [tabDefault, setTabDefault] = useState(router.query.tabDefault || 'Lists')
  // const [tabDefault, setTabDefault] = useState('Lists')

  const { isError, isLoading, data, error, refetch } = useUserData(profileUser!)
  console.log('Data: ', data)
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
  // console.log({ data });

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
              data?.ownLists.map((list: List) => {
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
                // console.log({ point });
                return (
                  <PointUnderList
                    key={point.id}
                    title={point.title}
                    imagePath={point.imagePath}
                    description={point.description}
                    // tags={point.tags?.at(0)}
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
                  <div className="flex justify-center">
                    <ListsTab
                      key={list.id}
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

export async function getServerSideProps({ query }) {
  const username = query.userName;
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
