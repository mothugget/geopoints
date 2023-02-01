import { UserProfile } from '@auth0/nextjs-auth0/client';
import { Dispatch, SetStateAction } from 'react';
import fetchUserData from './fetchUserData';

const fetchDataAndSetContext = async (
  user: UserProfile,
  setUserData: Dispatch<SetStateAction<null>> | null
) => {
  try {
    const data = await fetchUserData(user);
    if (data && setUserData) {
      setUserData({ ...data }); // set user data to global context
      return data;
    }
  } catch (error) {
    console.log({ error });
    throw new Error('Error fetching data');
  }
};

export default fetchDataAndSetContext;
