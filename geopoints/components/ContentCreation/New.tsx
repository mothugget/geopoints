import { useState } from 'react';
import CreatePointModal from './CreatePointModal';
import CreateListModal from './CreateListModal';
import CrosshairModal from './CrosshairModal';
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
  showAddContentModal: boolean;
  setShowAddContentModal: Dispatch<SetStateAction<boolean>>;
}

const New = ({
  showSidebar,
  setShowSidebar,
  showAddContentModal,
  setShowAddContentModal,
}: NewProps) => {
  const [showCreatePoint, setShowCreatePoint] = useState<boolean>(false);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [showCrosshairModal, setShowCrosshairModal] = useState(false);

  return (
    <>
      <Menu >
        <MenuHandler
          onClick={() => {
            console.log('im here');
            setShowAddContentModal(!showAddContentModal);
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
          <MenuItem onClick={() => setShowCrosshairModal(!showCrosshairModal)}>
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
  <CrosshairModal
        showCrosshairModal={showCrosshairModal} 
        setShowCrosshairModal={setShowCrosshairModal}
        setShowCreatePoint={setShowCreatePoint}
  />
    </>
  );
};

export default New;
