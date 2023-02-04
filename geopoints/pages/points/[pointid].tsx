import { PrismaClient } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Point } from '../../types/types.js';
import PictureTitleAndDesc from '../../components/PictureTitleAndDesc';
import PointDisplay from '../../components/PointPage/PointDisplay';
import LoadingSpinner from '../../components/LoadingSpinner';

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  console.log('PointPage data: ', pointData)

  return (
    pointData && pointData.imagePath ? (
      <div className="flex flex-col mt-10">
        <PointDisplay
          imagePath={pointData.imagePath}
          title={pointData.title}
          desc={pointData.description!}
        />
      </div>
    ) : (
      <LoadingSpinner />
    )
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
