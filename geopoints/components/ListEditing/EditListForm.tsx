import React, { useState, Dispatch, SetStateAction } from 'react';
import { List } from '../../types/types';
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
  listData: List;
}

interface ListData {
  title: string;
  id: number;
  description: string;
  tags: string[];
  isPublic: boolean;
  imagePath: string;
}

function EditListForm({ 
  setShowEditList,
  listData 
}: EditListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [listInput, setListInput] = useState<any>({});
  const [checkboxState, setCheckboxState] = useState(false);
  const [imgPath, setImgPath] = useState('');
  let updatedPublicValue=false;
  const originalData={...listData};
 


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
    const updatedListData: ListData = {
      title: listInput.title||originalData.title,
      id: originalData.id,
      description: listInput.description||originalData.description,
      tags: listInput.tags||originalData.tags,
      isPublic: updatedPublicValue?checkboxState:originalData.isPublic,
      imagePath: imgPath ? imgPath : originalData.imagePath,
    };
    console.log( listInput.title )
    console.log( listData.title )
    console.log(checkboxState)
    console.log(listData.isPublic)
    console.log(updatedListData)
    // mutation.mutate(updatedListData);
    setListInput({});
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, description: e.target.value });
  };
  const tagsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEnteredTags = e.target.value.split(' ');
    setListInput({ ...listInput, tags: userEnteredTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatedPublicValue=true;
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
          variant="static"
          label="Title"
          onChange={titleInputHandler}
          maxLength={25}
          placeholder={listData.title}
        />
      </div>
      <div className="my-2">
        <Input
          variant="static"
          label="Description"
          onChange={descriptionInputHandler}
          maxLength={50}
          placeholder={listData.description}
        />
      </div>
      <div className="my-2 mt-5">
        <Input
          variant="static"
          label="Tags"
          onChange={tagsInputHandler}
          maxLength={50}
          placeholder={listData.tags.map(tag=> tag.name).join(" ")}
          pattern="#\b\w+\b"
        />
      </div>

      <div className="my-2">
        <Checkbox
          label="Make public"
          ripple={true}
          onChange={publicInputHandler}
          checked={listData.isPublic}
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

export default EditListForm;
