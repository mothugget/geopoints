import React, { useState } from 'react';
import { User } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { createList } from "../../util/createList";



const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

interface CreateListFormProps {
  listInput: User | {};
  setListInput: React.Dispatch<React.SetStateAction<{}>>;
}

function CreateListForm() {
  // this is how we get the user data now.
  const { user } = useUser();
  const { isError, isLoading, error, data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [listInput, setListInput] = useState<any>(null);
  const [imgPath, setImgPath] = useState<string>('');

  const listFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const listData = {
      title: listInput.title,
      author: data,
      description: listInput.description,
      tags: listInput.tags,
      isPublic: listInput?.public === "on" ? true : false,
      imagePath: imgPath ? imgPath : "",
      // points: [],
      // points: data?.ownLists.title,
    };
    console.log(listData, data?.id);
    try {
      const newList = await createList(listData, data?.id);
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
    const tagsRegex = /#\w+/g;
    const parsedTags = userEnteredTags.match(tagsRegex);
    const filteringRegex = /[^#a-zA-Z_-]/;
    const filteredTags = parsedTags?.filter(
      (hashtag) => !filteringRegex.test(hashtag)
    );
    setListInput({ ...listInput, tags: filteredTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListInput({ ...listInput, public: e.target.value });
  };

  return (
    <form
      onSubmit={listFormSubmitHandler}
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

      <UploadWidget setImgUploaded={setImgUploaded} setImgPath={setImgPath} />

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
