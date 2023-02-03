import { useUser } from '@auth0/nextjs-auth0/client';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUserData } from '../../hooks/useUserData';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointUnderList from '../../components/PointUnderList';
import ProfileTab from '../../components/profileTabs/ProfileTab';
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
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people
    who are like offended by it, it doesn't matter.`,
  },
  {
    label: 'Points',
    value: 'Points',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },

  {
    label: 'Favourites',
    value: 'Favourites',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`,
  },

  {
    label: 'Profile',
    value: 'Profile',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`,
  },
];

export default function MyTabs() {
  const { user } = useUser();


  const { isError, isLoading, data, error, refetch } = useUserData(user!)

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
  // console.log({ data });

  return (
    <Tabs value="html" className="bg-transparent">
      <TabsHeader className="text-gray-800 bg-transparent">
        {tableData.map(({ label, value }) => (
          <Tab key={value} value={value} className="bg-transparent z-50">
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {tableData.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {value === 'Lists' ? (
              data?.ownLists.map((list: List) => {
                return (
                  <PictureTitleAndDesc
                    key={list.id}
                    imagePath={list.imagePath}
                    title={list.title}
                    description={list.description}
                  />
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
              <ProfileTab imagePath={data.imagePath} name={data.name} userName={data.userName} bio={data.bio} />
            ) : (
              <p>hello</p>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
