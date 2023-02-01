// we use this function to fetch the user data client side only, for ease of development

import { UserProfile } from '@auth0/nextjs-auth0/client';

const fetchUserData = async (user: UserProfile) => {
  if (user) {
    console.log({ user });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/users/${user.email}`
    );
    if (!res.ok) throw new Error('Error fetching user data');
    console.log({ res });
    let data = await res.json();

    if (data.error) {
      // if user not found create a new one
      console.log('im here on conditional');
      data.userData = await createNewUser(user);
    }
    return data.userData;
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

/**{user: {…}}
user:email:
"presabeats@gmail.com"
email_verified
:
false
name
:
"presabeats@gmail.com"
nickname
:
"presabeats"
picture
:
"https://s.gravatar.com/avatar/add459f7b217fa85b57102a97c5fe759?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpr.png"
sid
:
"cOcasVYjnqZ-SrBPSnTXZNBfrmwEVo7r"
sub
:
"auth0|63da54fcc3c606d2ca47ea44"
updated_at
:
"2023-02-01T12:03:08.133Z" */
export default fetchUserData;
