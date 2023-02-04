import { Point } from '../types/types';
import PointUnderList from './PointUnderList';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface PictureTitleAndDescProps {
  imagePath: string;
  title: string;
  description: string;
  points?: Point[];
}
const PictureTitleAndDesc = ({
  imagePath,
  title,
  description,
  points
}: PictureTitleAndDescProps) => {
  return (
    <Card className="w-96">
      <CardHeader color="blue" className="relative h-56">
        <img
          src={imagePath}
          alt="img-blur-shadow"
          className="h-full w-full"
        />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          {title}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardBody>
      {points!.map((point) => {
          return (
            <Link href={`../../../points/${point.id}`}>

            <CardFooter divider className="py-1">
              <PointUnderList
                key={point.id}
                imagePath={point.imagePath}
                title={point.title}
                description={point.description}
                // tags={listData.tags}
              />
            </CardFooter>
            </Link>
          );
        })}
    </Card>
  );
};

export default PictureTitleAndDesc;


// import Image from 'next/image.js';

// interface PictureTitleAndDescProps {
//   imagePath: string;
//   title: string;
//   description: string;
//   points?: string[];
// }
// const PictureTitleAndDesc = ({
//   imagePath,
//   title,
//   description,
// }: PictureTitleAndDescProps) => {
//   console.log({ imagePath });
//   return (
//     <section className="h-96 text-gray-800 mb-10">
//       {imagePath && (
//         <Image
//           src={imagePath || '/favicon.ico'}
//           width={320}
//           height={320}
//           alt={`Picture list: ${title}`}
//           priority={true}
//           className="relative left-9 rounded-md"
//         />
//       )}
//       <h4 className="relative ml-9 w-80 text-2xl mt-4">{title}</h4>
//       <p className="relative ml-9 mt-3 w-80">{description}</p>
//     </section>
//   );
// };

// export default PictureTitleAndDesc;
