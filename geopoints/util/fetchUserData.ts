// we use this function to fetch the user data client side only, for ease of development

import { UserProfile } from '@auth0/nextjs-auth0/client';

const fetchUserData = async (user: UserProfile) => {
  if (user) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${user.email}`
    );
    if (!res.ok) throw new Error('Error fetching user data');
    let userData = await res.json();

    if (userData === null) {
      userData = await createNewUser(user);
    }

    return userData;
  }
};

const createNewUser = async (user: UserProfile) => {
  const parsedUser = parseUser(user);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parsedUser),
    }
  );

  if (!res.ok) throw new Error('Error creating a new user');
  const newUser = await res.json();
  return newUser;
};

const parseUser = (user: UserProfile) => {
  // raname variables to match backend schema
  const { picture, nickname } = user;
  delete user.picture;
  delete user.nickname;
  user.imagePath = picture;
  user.userName = nickname;
  return user;
};

export default fetchUserData;
