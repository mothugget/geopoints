import React, { useState, Dispatch, SetStateAction } from 'react';
import { User } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { createList } from '../../util/createList';
import SmallLoadingSpinner from '../SmallLoadingSpinner';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Checkbox, Button } from '@material-tailwind/react';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

interface EditListFormProps {
  setShowEditList: Dispatch<SetStateAction<boolean>>;
}

i

function EditListForm({ setShowEditList }: CreateListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [listInput, setListInput] = useState<any>(null);
  const [checkboxState, setCheckboxState] = useState(false);
  const [imgPath, setImgPath] = useState('');

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
          className="my-5"
          ripple={true}
          color="green"
          onClick={() => mutation.reset()}
        >
          Create another one!
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
      tags: [listInput.tags],
      isPublic: checkboxState,
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
  const tagsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEnteredTags = e.target.value;
    setListInput({ ...listInput, tags: userEnteredTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState(!checkboxState);
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
      <div className="my-2 mt-5">
        <Input
          variant="static"
          label="Hashtag"
          onChange={tagsInputHandler}
          required={true}
          maxLength={50}
          placeholder="#reading"
          pattern="#\b\w+\b"
        />
      </div>

      <div className="my-2">
        <Checkbox
          label="Make public"
          ripple={true}
          onChange={publicInputHandler}
        />
      </div>
      <div className="my-5">
        <UploadWidget
          setImgUploaded={setImgUploaded}
          setImgPath={setImgPath}
          multiple={false}
        />
      </div>

      <div className="my-1">
        <Button ripple={true} type="submit">
          Create
        </Button>
      </div>
    </form>
  );
}

export default CreateListForm;
