import { Point, Tag } from '../types/types';
import PointUnderList from './PointUnderList';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Chip
} from "@material-tailwind/react";

interface PictureTitleAndDescProps {
  imagePath: string;
  title: string;
  description: string;
  points?: Point[];
  tags: Tag[];
}
const PictureTitleAndDesc = ({
  imagePath,
  title,
  description,
  points,
  tags
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
          {title ? title : ""}
        </Typography>
        <Typography>
          {description ? description : ""}
        </Typography>
        <div className="flex justify-center">
          {tags?.map((tag, i) => {
            return(
              <Chip key={i} value={tag.name} className="mr-2 ml-2"/>
            )
          })}
        </div>
      </CardBody>
      {points!.map((point) => {
          return (
            <Link key={point.id} href={`../../../points/${point.id}`}>
            <CardFooter divider className="py-1">
              <PointUnderList
                imagePath={point.imagePath}
                title={point.title}
                description={point.description}
              />
            </CardFooter>
            </Link>
          );
        })}
    </Card>
  );
};

export default PictureTitleAndDesc;
