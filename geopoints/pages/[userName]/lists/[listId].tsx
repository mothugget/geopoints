import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { List } from '../../../types/types.js';
import Image from 'next/image';
import PictureTitleAndDesc from '../../../components/PictureTitleAndDesc';

const prisma = new PrismaClient();

function List({ listData }: { listData: List }) {
  return (
    listData && (
      <PictureTitleAndDesc
        imagePath={listData.imagePath}
        description={listData.description}
        title={listData.title}
      />
    )
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = Number(context.query.listId);
  let listData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      points: true,
      tags: true,
      likedBy: true,
    },
  });

  listData = JSON.parse(JSON.stringify(listData));
  // getServerSideProps errors when passing Date objects. In this case,
  // the createdAt property of listData.
  // this is a way of overcoming it.
  // check: https://github.com/vercel/next.js/issues/11993 for more info.
  return {
    props: { listData },
  };
};

export default List;
