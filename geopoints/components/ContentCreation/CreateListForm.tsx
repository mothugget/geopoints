import React, { useState } from 'react';
import { User } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

interface CreateListFormProps {
  listInput: User | {};
  setListInput: React.Dispatch<React.SetStateAction<{}>>;
}

function CreateListForm() {
  // this is how we get the user data now.
  // const { user } = useUser(); 
  // const { isError, isLoading, error, data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [listInput, setListInput] = useState<any>(null);
  const [imgPath, setImgPath] = useState<string>('');

  const listFormSubmitHandler = (e: any) => {
    e.preventDefault();
    const inputData = {
      title: listInput.title,
      isPublic: listInput?.public === 'on' ? true : false,
      description: listInput.description,
      tags: listInput.tags,
      // imagePath: imgPath ? [imgPath] : [],
      // points: userData?.likedPoints,
    };
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, description: e.target.value });
  };
  const tagsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEnteredTags = e.target.value;
    const tagsRegex = /^#\w+/g;
    const parsedTags = userEnteredTags.split(tagsRegex);
    setListInput({ ...listInput, tags: parsedTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, public: e.target.value });
  };

  return (
    <form
      action=""
      className="mt-10
    flex
    flex-col
    "
    >
      <label htmlFor="Title" className={labelClass}>
        Title
      </label>
      <input
        id="Title"
        type="text"
        className={inputClass}
        onChange={titleInputHandler}
        required
      />
      <label htmlFor="Description" className={labelClass}>
        Description
      </label>
      <input
        id="Description"
        type="textarea"
        className={inputClass}
        onChange={descriptionInputHandler}
        required
      />

      <label htmlFor="Tags" className={labelClass}>
        Tags
      </label>
      <input
        id="Tags"
        type="text"
        placeholder="#tree #park #skate-park..."
        className={inputClass}
        onChange={tagsInputHandler}
      />

      <label htmlFor="Public" className={labelClass}>
        Make post public?
      </label>
      <span>
        <input id="Public" type="checkbox" onChange={publicInputHandler} />
      </span>

      <UploadWidget setImgUploaded={setImgUploaded} />

      <button
        type="submit"
        className="border-black border-2 rounded-md min-w-50 w-fit text-black mt-4 p-1"
      >
        Submit
      </button>
    </form>
  );
}

export default CreateListForm;
