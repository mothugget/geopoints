import { useUser } from '@auth0/nextjs-auth0/client';
// import { Tab } from '@headlessui/react';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../components/LoadingSpinner';
import { UserDataContext } from '../../contexts/UserDataContext';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointUnderList from '../../components/PointUnderList';
import fetchUserData from '../../util/fetchUserData';

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react';

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

const categories = ['Lists', 'Points', 'Favourites', 'Profile'];
export default function MyTabs() {
  const { user } = useUser();
  const { userData, setUserData } = useContext(UserDataContext);

  const { isError, isLoading, data, error, refetch } = useQuery(
    ['fectchUserData', user?.email],
    async () => {
      try {
        const data = await fetchUserData(user!);
        if (data && setUserData) {
          setUserData({ ...data }); // set user data to global context
          return data;
        }
      } catch (error) {
        console.log({ error });
        throw new Error('Error fetching data');
      }
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }
  console.log({ userData });

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
              userData?.ownLists.map((list) => {
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
              userData?.ownLists[0].points.map((point) => {
                console.log({ point });
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
            ) : (
              <p>hello</p>
            )}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
