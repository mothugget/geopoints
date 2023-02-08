import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { List } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { updateList } from '../../util/updateList';
import SmallLoadingSpinner from '../SmallLoadingSpinner';
import TagsInput from '../TagsInput';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Checkbox, Button } from '@material-tailwind/react';

import { useRouter } from 'next/router';
import { CheckBox } from '@mui/icons-material';

interface EditListFormProps {
  showEditList: boolean;
  setShowEditList: Dispatch<SetStateAction<boolean>>;
  listData: List;
}

interface ListData {
  title: string;
  id: number | undefined;
  description: string;
  tags: string[];
  isPublic: boolean;
  imagePath: string;
}



function EditListForm({ showEditList, setShowEditList, listData }: EditListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const router = useRouter();
  const [tags, setTags] = useState([]);


  let passedTags = listData.tags.map((tag: any) => tag.name)

  const initialUpdatedList = {
    title: listData.title ?? '',
    id: listData.id,
    description: listData.description ?? '',
    tags: listData.tags ?? '',
    isPublic: listData.isPublic,
    imagePath: listData.imagePath ?? '',
  };

  const [listInput, setListInput] = useState<any>(initialUpdatedList);
  const [imgPath, setImgPath] = useState('');
  let updatedPublicValue = false;
  let publicValue = listData.isPublic;
  const originalData = { ...listData };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (updatedListData: ListData) => {
      return updateList(updatedListData);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fectchUserData');
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
          Something went wrong while creating the list...
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
          List updated! ✅
        </div>
        <Button
          className="my-5"
          ripple={true}
          color="green"
          onClick={() => {
            mutation.reset();
            router.replace(router.asPath);
            // this makes getServerSideProps to fire again to get te latest data
            setShowEditList(false);
            window.location.reload();
          }}
        >
          Close
        </Button>
      </div>
    );
  }

  console.log({updatedPublicValue})

  const listFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const updatedListData: ListData = {
      title: listInput.title || originalData.title,
      id: originalData.id,
      description: listInput.description || originalData.description,
      tags: tags,
      isPublic: e.target[3].checked,
      imagePath: imgPath ? imgPath : originalData.imagePath,
    };
    
    mutation.mutate(updatedListData);
    setListInput({});
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, description: e.target.value });
  };

  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('toggle switch edit ', e.target.checked)
    setListInput({ ...listInput, isPublic: e.target.checked });
  };

  return (
    <form
      onSubmit={listFormSubmitHandler}
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
          value={listInput.title}
        />
      </div>
      <div className="my-2">
        <Input
          variant="static"
          label="Description"
          onChange={descriptionInputHandler}
          maxLength={50}
          value={listInput.description}
        />
      </div>

      <TagsInput
        updateState={showEditList}
        tags={passedTags}
        setTags={setTags}
      />

      <div className="my-2">
        <Checkbox
        label='Make public'
        defaultChecked={publicValue}
        />
      </div>
      <div className="my-5">
        <UploadWidget
          setImgPath={setImgPath}
          multiple={false}
          buttonString={'Upload an image'}
        />
      </div>

      <div className="my-1">
        <Button className=' bg-light-green-700' ripple={true} type="submit">
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditListForm;
