import React, { useState, Dispatch, SetStateAction } from 'react';
import { List } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { updateList } from '../../util/updateList';
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
  id: number|undefined;
  description: string;
  tags: string[];
  isPublic: boolean;
  imagePath: string;
}

function EditListForm({ 
  setShowEditList,
  listData,
}: EditListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState(false);

  const initialUpdatedList = {
    title: listData.title,
    id: listData.id,
    description: listData.description ?? "",
    tags: listData.tags ?? "",
    isPublic: data.isPublic,
    imagePath: listData.imagePath ?? ""
  };

  const [listInput, setListInput] = useState<any>(initialUpdatedList);
  const [imgPath, setImgPath] = useState('');
  let updatedPublicValue=false;
  let publicValue=listData.isPublic
  const originalData={...listData};

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
          onClick={() => {setShowEditList(false);
          window.location.reload()}}
        >
          Close
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
      isPublic: updatedPublicValue?publicValue:originalData.isPublic,
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
  const tagsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEnteredTags = e.target.value.split(' ');
    setListInput({ ...listInput, tags: userEnteredTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatedPublicValue=true;
    publicValue = !publicValue;
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
      <div className="my-2 mt-5">
        <Input
          variant="static"
          label="Tags"
          onChange={tagsInputHandler}
          maxLength={50}
          placeholder={listInput.tags.map((tag:any) => tag.name).join(" ")}
        />
      </div>

      <div className="my-2">
        <Checkbox
          label="Make public"
          ripple={true}
          onChange={publicInputHandler}
          defaultChecked={listData.isPublic}
          checked={listInput.isPublic}
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
          Update
        </Button>
      </div>
    </form>
  );
}

export default EditListForm;
