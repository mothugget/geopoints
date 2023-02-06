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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError && error instanceof Error) {
    return <span className="text-black">Error: {error.message}</span>;
  }

  return (
    listData && 
      <>
        <div className="flex flex-col mt-8 mb-20">
          <PictureTitleAndDesc
            imagePath={listData?.imagePath}
            description={listData?.description}
            title={listData?.title}
            points={listData.points}
          />
          <Button size="sm" variant="gradient" className="w-32" onClick={()=> setShowEditList(!showEditList) }>
            Edit list
          </Button>
          <EditListModal
            showEditList={showEditList}
            setShowEditList={setShowEditList}
            listData={listData}
          />
        </div>
      </>
    
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
