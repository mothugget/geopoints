import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { Point } from '../../types/types.js';
import PointDisplay from '../../components/PointPage/PointDisplay';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@material-tailwind/react';

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  return (
    <>
      {pointData ? (
        <div className="flex flex-col">
          <PointDisplay
            imagePath={pointData.imagePath}
            title={pointData.title}
            desc={pointData.description!}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      {/* <Button className="fixed bottom-20 right-4">Add to favourites</Button> */}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pointId } = context.query;
  const pointData = await prisma.point.findUnique({
    where: { id: Number(pointId) },
  });
  return {
    props: { pointData },
  };
};

export default PointPage;
