import { useState } from 'react';
import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import {
  Button,
} from '@material-tailwind/react';
import { useUser } from '@auth0/nextjs-auth0/client';

import { List, User } from '../../../types/types';
import PictureTitleAndDesc from '../../../components/PictureTitleAndDesc';
import PointUnderList from '../../../components/PointUnderList';
import { useUserData } from '../../../hooks/useUserData';
import LoadingSpinner from '../../../components/LoadingSpinner';
import EditListModal from '../../../components/ListEditing/EditListModal';

const prisma = new PrismaClient();

function List({ listData, listOwner }: { listData: List; listOwner: User }) {
  const [showEditList, setShowEditList] = useState(false)

  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);

  const [liked, setLiked] = useState(false);

  //wrap in useEffect
  // ALWAYS HANDLE ERRORS USING CATCH
  data && listData && handleIfLiked(data.id, listData.id!)
    .then((res) => {
      console.log(res)
      setLiked(res.isLiked)
    })

  // console.log('Data: ', data)
  // console.log('ListData: ', listData)

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  return (
    listData &&
    data && (
      <>
        <div className="flex flex-col pt-8">
          <PictureTitleAndDesc
            imagePath={listData?.imagePath}
            description={listData?.description}
            title={listData?.title}
            points={listData.points}
            tags={listData.tags}
          />
        </div>
        {data.id == listData.authorId ? (
          <div>
            <Button
              ripple={false}
              className="fixed bottom-20 right-4"
              onClick={() => {
                handleDeleteList(data.id, listData.id!);
              }}
            >
              Delete List
            </Button>
            <Button
              ripple={false}
              className="fixed bottom-20 left-4"
              onClick={() => setShowEditList(!showEditList)}
            >
              Edit list
            </Button>
            <EditListModal
              showEditList={showEditList}
              setShowEditList={setShowEditList}
              listData={listData}
            />
          </div>
        ) : liked ? (
          <Button
            ripple={false}
            className="fixed bottom-20 right-4"
            onClick={() => {
              handleToggleFavourites(data.id, listData.id!, liked); // move to modal: Confirm Delete? Yes/No -> redirect to Home
              setLiked(false);
            }}
          >
            Liked
          </Button>
        ) : (
          <Button
            ripple={false}
            className="fixed bottom-20 right-4"
            onClick={() => {
              handleToggleFavourites(data.id, listData.id!, liked);
              setLiked(true);
            }}
          >
            Like
          </Button>
        )}
      </>
    )
  );
}

const handleToggleFavourites = async (userId: Number, listId: Number, liked: Boolean) => {
  const response = await fetch('/api/lists/favourite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId, listId: listId, liked: liked })
  })
  const data = await response.json()
  // console.log(data)
}

const handleIfLiked = async (userId: Number, listId: Number) => {
  const response = await fetch('/api/lists/checkIfLiked', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId, listId: listId })
  })
  const data = await response.json()
  // console.log(data)
  return data;
}

const handleDeleteList = async (userId: Number, listId: Number) => {
  const response = await fetch('/api/lists/deleteList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId: userId, listId: listId })
  })
  const data = await response.json()
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userName = context.query.userName;
  const listId = Number(context.query.listId);

  let listData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      points: true,
      tags: true,
      likedBy: true,
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
  return {
    props: { listData, listOwner },
  };
};

export default List;
