import React, { useState, useContext } from "react";
import UploadWidget from "../UploadWidget";
import { User } from "../../types/types";
import { UserDataContext } from "../../contexts/UserDataContext";

const labelClass = "w-full text-base font-bold text-gray-800";
const inputClass = "border-black border-2 rounded-md min-w-50 w-fit text-black";

export default function CreatePostForm() {
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [listInput, setListInput] = useState<any>(null);
  const { userData } = useContext(UserDataContext);

  const titleInputHandler = (e: any) => {
    setListInput({ ...listInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: any) => {
    setListInput({ ...listInput, description: e.target.value });
  };
  const tagsInputHandler = (e: any) => {
    setListInput({ ...listInput, tags: e.target.value });
  };
  const publicInputHandler = (e: any) => {
    setListInput({ ...listInput, public: e.target.value });
  };
  const listsInputHandler = (e: any) => {
    setListInput({ ...listInput, tags: e.target.value });
  };

  return (
    <form
      className="
    mt-10
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
      <label htmlFor="Public" className={labelClass}>
        Make post public?
      </label>
      <span>
        <input id="Public" type="checkbox" onChange={publicInputHandler} />
      </span>
      <label htmlFor="List" className={labelClass}>
        List
      </label>
      <input
        id="List"
        type="text"
        placeholder="list..."
        className={inputClass}
        onChange={listsInputHandler}
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
      <div className="mt-4">
        <UploadWidget setImgUploaded={setImgUploaded} />
      </div>
      <button
        type="submit"
        className="border-black border-2 rounded-md min-w-50 w-fit text-black mt-4 p-1"
      >
        Submit
      </button>
    </form>
  );
}
