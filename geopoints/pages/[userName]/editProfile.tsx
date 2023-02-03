import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useUserData } from "../../hooks/useUserData";
import React, {useState} from "react";
import UploadWidget from "../../components/UploadWidget";
import { updateUserProfile } from "../../util/updateUserProfile";

import {
  Textarea,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

function editProfile(props: any) {
  const initialUpdatedInput = { //taken from props
    // id: data.id,
    // name: data.name,
    // userName: data?.userName,
    // // isPublic: data?.isPublic,
    // bio: "",
    // imagePath: data.imagePath,
    // facebook: "",
    // instagram: ""
  }

  const [updatedInput, setUpdatedInput] = useState<any>();
  const [updateEnabled, setUpdateEnabled] = useState<boolean>(false);
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('');

  //update button should be enabled if the user made changes AND if all the required filed are present


  const nameUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInput({ ...updatedInput, name: e.target.value });
  };
  const usernameUpdateHandler = (listId: string | undefined) => {
    console.log({ listId });
    setUpdatedInput({ ...updatedInput, listId });
  };
  const bioUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInput({ ...updatedInput, bio: e.target.value });
  };
  const publicUpdateHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedInput({...updatedInput, isPublic: !isPublic});
  };

  const editProfileHandler = (e: any) => {
    e.preventDefault();
    const toBeSentUpdatedInfo = {
    id: data.id,
    name: data.name,
    userName: data?.userName,
    // isPublic: data?.isPublic,
    bio: "",
    imagePath: data.imagePath,
    facebook: "",
    instagram: ""
    }
  }

  return (
    props && (
      <form
        onSubmit={editProfileHandler}
        className="mt-10 m-w-96 flex flex-col"
      >
        <div className="my-1">
          <Button
            ripple={true}
            type="submit"
            disabled={updateEnabled}
          >
            Update Profile Info
          </Button>
        </div>

        <div className="my-2">
          <Input
            variant="outlined"
            label="Name"
            value = {data.name}
            placeholder = {data.name}
            onChange={nameUpdateHandler}
            required={true}
            maxLength={25}
          />
        </div>
        <div className="my-2">
          <Input
            variant="outlined"
            label="Username"
            value={data.userName}
            placeholder={data.userName}
            onChange={usernameUpdateHandler}
            required={true}
            maxLength={50}
          />
        </div>
        <div className="my-2">
          <Checkbox
            label="Make public"
            checked={data.isPublic === true}
            ripple={true}
            onChange={publicUpdateHandler}
          />
        </div>
        <div>
          <Textarea
            id="Bio"
            name="Bio"
            label="Bio"
            onChange={bioUpdateHandler}
          />
        </div>
        
        <div className="my-5">
          <img alt="profile-pic" src={data.imagePath} className="w-60 h-60"/>
          <UploadWidget
            setImgUploaded={setImgUploaded}
            setImgPath={setImgPath}
            multiple={false}
          />
        </div>


      </form>
  )
}

export default editProfile;
