import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { List, User } from '../../../types/types';
import PictureTitleAndDesc from '../../../components/PictureTitleAndDesc';
import PointUnderList from '../../../components/PointUnderList';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { UserDataContext } from '../../../contexts/UserDataContext';
import fetchUserData from '../../../util/fetchUserData';

const prisma = new PrismaClient();

function List({ listData, listOwner }: { listData: List; listOwner: User }) {
  const { userData, setUserData } = useContext(UserDataContext);
  const { user } = useUser();
  const { isError, isLoading, error } = useQuery(
    ['fectchUserData', user!],
    async () => {
      if (user) {
        const data = await fetchUserData(user);
        if (data && setUserData && !userData) {
          setUserData({ ...data }); // set user data to global context
          return data;
        }
      }
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  return (
    <div className="flex flex-col mt-20">
      <PictureTitleAndDesc
        imagePath={listData.imagePath}
        description={listData.description}
        title={listData.title}
      />
      {listData.points.map((point) => {
        return (
          <PointUnderList
            key={point.id}
            imagePath={point.imagePaths}
            title={point.title}
            description={point.description}
            tags={listData.tags}
          />
        );
      })}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userName = context.query.userName;
  const listId = Number(context.query.listId);

  let listData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      points: true,
      tags: true,
      liked_by: true,
    },
  });

  let listOwner;
  if (userName && typeof userName === 'string') {
    listOwner = await prisma.user.findUnique({
      where: { userName },
      include: {
        ownLists: true,
        likedLists: true,
        likedPoints: true,
      },
    });
  }

  listData = JSON.parse(JSON.stringify(listData));
  listOwner = JSON.parse(JSON.stringify(listOwner));
  // getServerSideProps errors when passing Date objects. In this case,
  // the createdAt property of listData.
  // this is a way of overcoming it.
  // check: https://github.com/vercel/next.js/issues/11993 for more info.
  return {
    props: { listData, listOwner },
  };
};

export default List;
