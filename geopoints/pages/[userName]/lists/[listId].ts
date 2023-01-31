import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { List } from '../../../types/types.js';

const prisma = new PrismaClient();

const List = ({ listData }: { listData: List }) => {
  console.log({ listData });
};

export default List;

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
  return {
    props: { listData }, // will be passed to the page component as props
  };
};
