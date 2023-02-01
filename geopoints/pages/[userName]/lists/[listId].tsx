import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { List } from '../../../types/types.js';
import Image from 'next/image';
import PictureTitleAndDesc from '../../../components/PictureTitleAndDesc';
import PointUnderList from '../../../components/PointUnderList';

const prisma = new PrismaClient();

function List({ listData }: { listData: List }) {
  return (
      <div className="flex flex-col mt-10">
        <PictureTitleAndDesc
          imagePath={listData.imagePath}
          description={listData.description}
          title={listData.title}
        />
        <PointUnderList
          imagePath={listData.points[0].imagePaths[0]}
          title={listData.points[0].title}
          description={listData.points[0].description}
        />
        <PointUnderList
          imagePath={listData.points[0].imagePaths[0]}
          title={listData.points[0].title}
          description={listData.points[0].description}
        />
        <PointUnderList
          imagePath={listData.points[0].imagePaths[0]}
          title={listData.points[0].title}
          description={listData.points[0].description}
        />
      </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const listId = Number(context.query.listId);
  let listData = await prisma.list.findUnique({
    where: { id: listId },
    include: {
      points: true,
      tags: true,
      liked_by: true,
    },
  });

  function toObject(x: any) {
    return JSON.parse(JSON.stringify(x, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
    ));
  }

  listData = toObject(listData)

  // listData = JSON.parse(JSON.stringify(listData));
  // getServerSideProps errors when passing Date objects. In this case,
  // the createdAt property of listData.
  // this is a way of overcoming it.
  // check: https://github.com/vercel/next.js/issues/11993 for more info.
  return {
    props: { listData },
  };
};

export default List;
