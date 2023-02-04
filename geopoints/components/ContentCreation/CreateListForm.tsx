import React, { useState, Dispatch, SetStateAction } from 'react';
import { User } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { createList } from '../../util/createList';
import {
  Select,
  Option,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

interface CreateListFormProps {
  setShowCreateList: Dispatch<SetStateAction<boolean>>
}

function CreateListForm({setShowCreateList} : CreateListFormProps ) {
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState(false);
  const [listInput, setListInput] = useState<any>(null);
  const [checkboxState, setCheckboxState] = useState(false);

  const [imgPath, setImgPath] = useState<string>('');

  const listFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const listData = {
      title: listInput.title,
      author: data.id,
      description: listInput.description,
      tags: [listInput.tags],
      isPublic: checkboxState,
      imagePath: imgPath ? imgPath : '',
    };
    console.log(listData, data?.id);
    try {
      const newList = await createList(listData, data?.id);
      setShowCreateList(false)
      return newList;
    } catch (err) {
      console.log(err);
    }
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
