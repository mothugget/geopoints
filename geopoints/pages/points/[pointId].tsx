import { PrismaClient } from "@prisma/client";
import {useContext} from 'react'
import { GetServerSideProps } from "next";
import { Button } from '@material-tailwind/react';
import { Point } from "../../types/types";
import PointDisplay from "../../components/PointPage/PointDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRouter } from "next/router";
import BackButton from "../../components/BackButton/BackButton";
import DeletePoint from "../../components/DeletePoint/DeletePoint";

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  const router = useRouter();


  function goToPoint() {
    router.push(`/?lat=${pointData.lat}&lng=${pointData.lng}`);
  }




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
      <DeletePoint pointId={pointData.id} />
      <BackButton text="Back to List"/>
      <Button className='fixed top-24 right-8 bg-light-green-700' onClick={goToPoint}>See on map</Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pointId } = context.query;
  console.log(pointId)
  const pointData = await prisma.point.findUnique({
    where: { id: Number(pointId) },
  });
  return {
    props: { pointData },
  };
};

export default PointPage;
