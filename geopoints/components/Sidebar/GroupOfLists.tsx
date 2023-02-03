import { List } from '../../types/types';
import ListToggle from './ListToggleRender';

interface GroupOfListsProps {
  title: string;
  lists: List[];
}

const GroupOfLists = ({ title, lists }: GroupOfListsProps) => {
  return (
    lists &&
    title && (
      <>
        <h3 className="mt-10 w-full text-base font-bold text-gray-800">
          {title}
        </h3>
        {lists.length === 0 ? (
          <p className="text-gray-300 italic text-sm mt-3 ml-3">
            Nothing here yet...
          </p>
        ) : (
          <ul>
            {lists.map((list: List) => (
              <li key={list.id}>
                <ListToggle list={list} />
              </li>
            ))}
          </ul>
        )}
      </>
    )
  );
};

export default GroupOfLists;
