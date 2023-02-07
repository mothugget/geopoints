import { User, List } from '../../types/types';
import Link from 'next/link';
import { Card, CardBody, Typography } from '@material-tailwind/react';

interface AutocompleteItemProps {
  list: List;
  author: User;
}
const AutocompleteItem = ({ list, author }: AutocompleteItemProps) => {
  return (
    author &&
    list && (
      <Card className="w-72 p-5">
        <Link href={`/${author.userName}/lists/${list.id}`}>
          <img
            src={list.imagePath || process.env.NEXT_PUBLIC_DEFAULT_IMAGE}
            alt=""
            className="w-"
          />
          <CardBody className="text-left">
            <Typography variant="h6" className="mb-2 text-sm">
              {list.title}
            </Typography>
            <p className="text-sm"> {list.description}</p>
          </CardBody>
        </Link>
      </Card>
    )
  );
};
export default AutocompleteItem;
