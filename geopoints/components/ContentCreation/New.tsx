import { useState } from 'react';
import CreatePointModal from './CreatePointModal';
import CreateListModal from './CreateListModal';
import { SetStateAction, Dispatch } from 'react';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

interface NewProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const New = ({
  showSidebar,
  setShowSidebar,
}: NewProps) => {
  const [showCreatePoint, setShowCreatePoint] = useState<boolean>(false);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);

  return (
    <>
      <Menu>
        <MenuHandler
          onClick={() => {
            console.log('im here');
            if (showSidebar) {
              setShowSidebar(!showSidebar);
            }
          }}
        >
          <Button size="sm" variant="gradient" className="">
            NEW
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => setShowCreatePoint(!showCreatePoint)}>
            Point
          </MenuItem>
          <MenuItem onClick={() => setShowCreateList(!showCreateList)}>
            List
          </MenuItem>
        </MenuList>
      </Menu>
      <CreatePointModal
        showCreatePoint={showCreatePoint}
        setShowCreatePoint={setShowCreatePoint}
      />
      <CreateListModal
        showCreateList={showCreateList}
        setShowCreateList={setShowCreateList}
      />
    </>
  );
};

export default New;
