import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUserData } from '../../hooks/useUserData';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointUnderList from '../../components/PointUnderList';
import ProfileTab from '../../components/profileTabs/ProfileTab';
import ListsTab from '../../components/profileTabs/ListsTab';
import React from 'react';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';
import { List, Point } from '../../types/types';

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

export default function MyTabs() {
  const { user } = useUser();
  // console.log('Profile page, user: ', user)

  const { isError, isLoading, data, error, refetch } = useUserData(user!)

  // console.log('Profile page, data: ', data)
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
  console.log({ data });

  return (
    <Tabs value={'Lists'} className="bg-transparent">
      <TabsHeader className="text-gray-800 bg-transparent z-10">
        {tableData.map(({ label, value }) => (
          <Tab key={value} value={value} className="bg-transparent z-50">
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tableData.map(({ value }) => (
          <TabPanel key={value} value={value}>
            {value === 'Lists' ? (
              data?.ownLists.map((list: List) => {
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
                <ProfileTab imagePath={data.imagePath} name={data.name} userName={data.userName} bio={data.bio} />
              ) : (
                <LoadingSpinner />
              )
            ) : (
              <p>hello</p>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
