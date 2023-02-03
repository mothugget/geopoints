import { useState } from 'react';
import CreatePointModal from './CreatePointModal';
import CreateListModal from './CreateListModal';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

const New = () => {
  const [showCreatePoint, setShowCreatePoint] = useState<boolean>(false);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);

  return (
    <>
      <Menu>
        <MenuHandler>
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
