import React, { useState, Dispatch, SetStateAction } from 'react';
import { User } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { createList } from '../../util/createList';
import SmallLoadingSpinner from '../SmallLoadingSpinner';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Switch, Button } from '@material-tailwind/react';
import TagsInput from '../TagsInput';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

interface CreateListFormProps {
  setShowCreateList: Dispatch<SetStateAction<boolean>>;
}

interface ListData {
  title: string;
  author: number;
  description: string;
  tags: string[];
  isPublic: boolean;
  imagePath: string;
}

function CreateListForm({ setShowCreateList }: CreateListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [listInput, setListInput] = useState<any>(null);
  
  const [imgPath, setImgPath] = useState('');
  const [tags, setTags] = useState([])

  let checkboxState = false
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (listData: ListData) => {
      return createList(listData, listData.author);
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
          List created! ✅
        </div>
        <Button
          className="my-5 bg-light-green-700"
          ripple={true}
          // color="green"
          onClick={() => mutation.reset()}
        >
          Create another one!
        </Button>
        <Button
          className="my-5 bg-light-green-700"
          ripple={true}
          // color="blue"
          onClick={() => {
            mutation.reset();
            setShowCreateList(false);
          }}
        >
          Close
        </Button>
      </div>
    );
  }

  const listFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const listData: ListData = {
      title: listInput.title,
      author: data.id,
      description: listInput.description,
      tags: tags,
      isPublic: listInput.isPublic||false,
      imagePath: imgPath ? imgPath : '',
    };
    mutation.mutate(listData);
    setListInput({});
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, title: e.target.value });
  };

  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, description: e.target.value });
  };

  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      <TagsInput
      updateState={false}
      tags={tags}
      setTags={setTags}
      />

      <div className="my-2">
        <Switch
          color='green'
          label="Make public"
          ripple={true}
          onChange={publicInputHandler}
          defaultChecked={false}
          onClick={(e)=>{console.log(e)}}
        />
      </div>

      <div className="my-5">
        <UploadWidget
          buttonString={'Upload an image'}
          setImgPath={setImgPath}
          multiple={false}
        />
      </div>

      <div className="my-1">
        <Button ripple={true} className="bg-light-green-700" type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreateListForm;
