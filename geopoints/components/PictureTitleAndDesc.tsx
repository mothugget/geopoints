import Image from 'next/image.js';

import PointUnderList from './PointUnderList';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

interface PointListProps {
  imagePath?: string;
  title: string;
  description?: string;
}

interface PictureTitleAndDescProps {
  imagePath: string;
  title: string;
  description: string;
  // points: PointListProps;
}
const PictureTitleAndDesc = ({
  imagePath,
  title,
  description,
  // points,
}: PictureTitleAndDescProps) => {
  console.log({ imagePath });
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
      <CardFooter divider className="flex items-center justify-between py-3">
        {/* <PointUnderList imagePath={points.imagePath} title={points.title} description={points.description}/> */}
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
      <CardFooter divider className="flex items-center justify-between py-3">
        <Typography variant="small">Point Image</Typography>
        <Typography variant="small" color="gray" className="flex gap-1">
          <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
          Point details
        </Typography>
      </CardFooter>
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
