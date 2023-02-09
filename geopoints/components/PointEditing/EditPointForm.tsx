import React, { useState, Dispatch, SetStateAction, useContext } from 'react';
import { List, Point } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { updatePoint } from '../../util/updatePoint';
import SmallLoadingSpinner from '../SmallLoadingSpinner';
import { useMutation, useQueryClient } from 'react-query';
import {
  Input,
  Checkbox,
  Button,
  Select,
  Option,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { DisplayedPointsContext } from '../../contexts/DisplayedPointsContext';

interface EditPointFormProps {
  setShowEditPoint: Dispatch<SetStateAction<boolean>>;
  pointData: Point;
}

interface PointData {
  title: string;
  id: number | undefined;
  description: string;
  isPublic: boolean;
  imagePath: string;
  listId: number;
  newListId: number;
  userDefaultListId: number;
  markerPath: string;
}

function EditPointForm({ setShowEditPoint, pointData }: EditPointFormProps) {
  const { setDisplayedPoints } = useContext(DisplayedPointsContext);
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [checkboxState, setCheckboxState] = useState(false);
  const [markerPath, setMarkerPath] = useState('');
  const router = useRouter();
  const initialUpdatedPoint = {
    title: pointData?.title,
    id: pointData?.id,
    description: pointData?.description,
    isPublic: pointData?.isPublic,
    imagePath: pointData?.imagePath,
    listId: pointData.listId,
    markerPath: pointData.markerPath
  };

  const [pointInput, setPointInput] = useState<any>(initialUpdatedPoint);
  const [imgPath, setImgPath] = useState('');
  let updatedPublicValue = false;
  let publicValue = pointData?.isPublic;
  const originalData = { ...pointData };
  const userDefaultList = data.ownLists.find(
    (list: List) => list.title === 'My Points'
  );
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedPointData: PointData) => {
      return updatePoint(updatedPointData);
    },
    {
      onSuccess: (updatedPoint) => {
        queryClient.invalidateQueries('fectchUserData');
        setDisplayedPoints &&
          setDisplayedPoints((displayedPoints) =>
           { const filteredPoints = displayedPoints.filter((point) => point.id !== updatedPoint.id)
            return [...filteredPoints,updatedPoint]}
          );
      },
    }
  );

  if (mutation.isLoading) {
    return (
      <div className="flex justify-center itmes-center h-full">
        <SmallLoadingSpinner size={45} />
      </div>
    );
  }

  if (mutation.isError) {
    return (
      <div className="flex flex-col justify-center itmes-center h-96">
        <p className="text-red-200 font-semibold italic animate-pulse">
          Something went wrong while creating the Point...
        </p>
        <Button
          className="my-5"
          ripple={true}
          color="red"
          onClick={() => mutation.reset()}
        >
          Try again
        </Button>
      </div>
    );
  }
  if (mutation.isSuccess) {
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className="text-green-500 font-semibold text-xl">
          Point updated! ✅
        </div>
        <Button
          className="my-5"
          ripple={true}
          color="green"
          onClick={() => {
            mutation.reset();
            // this makes getServerSideProps to fire again to get te latest data
            router.replace(router.asPath);
            setShowEditPoint(false);
          }}
        >
          Close
        </Button>
      </div>
    );
  }

  const pointFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const updatedPointData: PointData = {
      title: pointInput.title ?? originalData.title,
      id: originalData.id,
      description: pointInput.description ?? originalData.description,
      isPublic:  originalData?.isPublic!,
      imagePath: imgPath ? imgPath! : originalData.imagePath!,
      listId: pointInput.listId,
      newListId: pointInput?.newListId,
      userDefaultListId: userDefaultList.id,
      markerPath: markerPath? markerPath! : originalData.markerPath!
    };
    mutation.mutate(updatedPointData);
    setPointInput({});
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, description: e.target.value });
  };

  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState(!checkboxState);
  };
  const listInputHandler = (newListId: string | undefined) => {
    setPointInput({ ...pointInput, newListId });
  };

  return (
    <form
      onSubmit={pointFormSubmitHandler}
      className="mt-10
    flex
    flex-col
    "
    >
      <div className="my-2">
        <Input
          variant="static"
          label="Title"
          onChange={titleInputHandler}
          maxLength={25}
          value={pointInput.title}
        />
      </div>
      <div className="my-2">
        <Input
          variant="static"
          label="Description"
          onChange={descriptionInputHandler}
          maxLength={50}
          value={pointInput?.description}
        />
      </div>
      {/* <div className="my-2">
        <Checkbox
          label="Make public"
          ripple={true}
          onChange={publicInputHandler}
        />
      </div> */}
      <Select
        id="List"
        name="List"
        label="Select List"
        onChange={listInputHandler}
      >
        {data.ownLists?.map((list: List) => (
          <Option key={list.id} value={String(list.id)}>
            {list.title}
          </Option>
        ))}
      </Select>
      <div className="my-5">

        <UploadWidget
          buttonString={'Upload an image'}
          setImgPath={setImgPath}
          multiple={false}
        />        
        <UploadWidget
          buttonString={'Upload a marker'}
          setImgPath={setMarkerPath}
          multiple={false}
        />
      </div>
      <div className="my-1">
        <Button ripple={true} type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditPointForm;
