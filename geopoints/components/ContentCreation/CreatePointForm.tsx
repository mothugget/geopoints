import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import UploadWidget from '../UploadWidget';
import { MapContext } from '../../contexts/MapContext';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { List, CreatePointData } from '../../types/types';
import { createPoint } from '../../util/createPoint';
import { DisplayedPointsContext } from '../../contexts/DisplayedPointsContext';
import LoadingSpinner from '../LoadingSpinner';
import { useMutation, useQueryClient } from 'react-query';
import SmallLoadingSpinner from '../SmallLoadingSpinner';

import {
  Select,
  Option,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

interface CreatePostFormProps {
  setShowCreatePoint: Dispatch<SetStateAction<boolean>>;
}

export default function CreatePointForm({
  setShowCreatePoint,
}: CreatePostFormProps) {
  const [checkboxState, setCheckboxState] = useState(false);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [imgPath, setImgPath] = useState('');
  const [markerPath, setMarkerPath] = useState('');
  const [pointInput, setPointInput] = useState<any>({});
  const { map } = useContext(MapContext);
  const { setDisplayedPoints } = useContext(DisplayedPointsContext);
  const { user } = useUser();
  const { data } = useUserData(user!);

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (pointData: CreatePointData) => {
      return createPoint(pointData, pointData.listId);
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('fectchUserData');
        if (setDisplayedPoints) {
          window.localStorage.setItem('list' + data.newPoint.listId, 'true');
          setDisplayedPoints((samePoints) => [...samePoints, data.newPoint]);
        }
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
          Something went wrong while creating the point...
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

  const pointFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const pointData = {
      title: pointInput.title,
      description: pointInput.description,
      isPublic: checkboxState,
      lng: Number(map?.getCenter()?.lng()),
      lat: Number(map?.getCenter()?.lat()),
      imagePath: imgPath ?? '/favicon.ico',
      markerPath: markerPath ?? 'http://res.cloudinary.com/dlshfgwja/image/upload/v1675763079/idm32m9zbvuzc94way5g.png',
      listId: pointInput.listId,
    };

    mutation.mutate(pointData);
    setPointInput({});
    setShowCreatePoint(false);
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
  const listInputHandler = (listId: string | undefined) => {
    setPointInput({ ...pointInput, listId });
  };

  return (
    data && (
      <form
        onSubmit={pointFormSubmitHandler}
        className="mt-10 m-w-96 flex flex-col"
      >
        <div className="my-2">
          <Input
            variant="standard"
            label="Title"
            onChange={titleInputHandler}
            required={true}
            maxLength={25}
          />
        </div>
        <div className="my-2">
          <Input
            variant="standard"
            label="Description"
            onChange={descriptionInputHandler}
            required={true}
            maxLength={50}
          />
        </div>
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
            setImgPath={setImgPath}
            multiple={false}
            buttonString={'Upload an image'}

          />
          <UploadWidget
            setImgPath={setMarkerPath}
            multiple={false}
            buttonString={'Upload a marker'}
          />
        </div>
        <div className="my-1">
          <Button ripple={true} type="submit" disabled={!pointInput.listId} >
            Create
          </Button>
        </div>
      </form>
    )
  );
}
