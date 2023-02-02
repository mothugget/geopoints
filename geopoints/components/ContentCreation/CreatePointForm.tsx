import React, { useState, useContext } from 'react';
import UploadWidget from '../UploadWidget';
import { UserDataContext } from '../../contexts/UserDataContext';
import { MapContext } from '../../contexts/MapContext';
import createPoint from '../../util/createPoint';
import { faker } from '@faker-js/faker';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

export default function CreatePointForm() {
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('');
  const [pointInput, setPointInput] = useState<any>({});
  const { userData } = useContext(UserDataContext);
  const { map } = useContext(MapContext);

  const pointFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const pointData = {
      title: pointInput.title,
      description: pointInput.description,
      isPublic: pointInput.public === 'on' ? true : false,
      lng: map?.getCenter()?.lat(),
      lat: map?.getCenter()?.lng(),
      imagePath: faker.image.animals(),
      listId: pointInput.list || userData?.ownLists?.at(0)?.id,
    };
    try {
      const newPoint = await createPoint(pointData, pointInput.list);
      return newPoint;
    } catch (err) {
      console.log(err);
    }
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, description: e.target.value });
  };
  const tagsInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userEnteredTags = e.target.value;
    const tagsRegex = /^#\w+/g;
    const parsedTags = userEnteredTags.split(tagsRegex);
    console.log(parsedTags);
    setPointInput({ ...pointInput, tags: parsedTags });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, public: e.target.value });
  };
  const listInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(JSON.parse(e.target.value));
    setPointInput({ ...pointInput, list: e.target.value });
  };

  return (
    <form
      onSubmit={pointFormSubmitHandler}
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
      <select
        id="List"
        name="List"
        className={inputClass}
        onChange={listInputHandler}
      >
        {/* ACCESSING LIST INFO ??*/}
        {userData?.ownLists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>
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
        <UploadWidget
          setImgUploaded={setImgUploaded}
          setImgPath={setImgPath}
          multiple={false}
        />
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
