import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Point } from '../../types/types.js';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  return (
    <div className="flex flex-col mt-10">
      <PictureTitleAndDesc
        imagePaths={pointData.imagePaths!}
        title={pointData.title}
        description={pointData.description!}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pointId = Number(context.query.pointid);
  let pointData = await prisma.list.findUnique({
    where: { id: pointId },
    include: {
      tags: true,
      likedBy: true,
    },
  });

  function toObject(x: any) {
    return JSON.parse(
      JSON.stringify(
        x,
        (key, value) => (typeof value === 'bigint' ? value.toString() : value) // return everything else unchanged
      )
    );
  }

  pointData = toObject(pointData);

  return {
    props: { pointData },
  };
};

export default PointPage;
