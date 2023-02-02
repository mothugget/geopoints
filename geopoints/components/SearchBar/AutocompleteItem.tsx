import { User, List } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

interface AutocompleteItemProps {
  list: List;
  author: User;
}
const AutocompleteItem = ({ list, author }: AutocompleteItemProps) => {
  return (
    <li>
      <Link href={`${author.userName}/lists/${list.id}`}>
        {list.imagePath && (
          <Image
            src={list?.imagePath || '/favicon-ico'}
            alt={list?.title}
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
        )}
        <div>
          <h3 className="text-sm text-gray-600 font-semibold">{list.title}</h3>
          <p className="text-xs text-gray-600">{list.description}</p>
        </div>
      </Link>
    </li>
  );
};
export default AutocompleteItem;
