import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Point } from "../../types/types.js";
import PointDisplay from "../../components/PointPage/PointDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useRouter } from "next/router.js";
import BackButton from "../../components/BackButton/BackButton";
import DeletePoint from "../../components/DeletePoint/DeletePoint";

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  const router = useRouter();

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
