import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { List } from '../../types/types';
import UploadWidget from '../UploadWidget';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { updateList } from '../../util/updateList';
import SmallLoadingSpinner from '../SmallLoadingSpinner';
import TagsInput from '../TagsInput';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Checkbox, Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';

interface EditListFormProps {
  showEditList: boolean;
  setShowEditList: Dispatch<SetStateAction<boolean>>;
  listData: List;
}

interface ListData {
  title: string;
  id: number | undefined;
  description: string;
  tags: string[];
  isPublic: boolean;
  imagePath: string;
}

function EditListForm({ showEditList, setShowEditList, listData }: EditListFormProps) {
  const { user } = useUser();
  const { data } = useUserData(user!);
  const [imgUploaded, setImgUploaded] = useState(false);
  const router = useRouter();
  const [tags, setTags] = useState([])

  useEffect(() => {
    setTags(noTags => listData.tags.map((tag: any) => tag.name))
  }, [showEditList])
  console.log(tags)
  const initialUpdatedList = {
    title: listData.title ?? '',
    id: listData.id,
    description: listData.description ?? '',
    tags: listData.tags ?? '',
    isPublic: data.isPublic,
    imagePath: listData.imagePath ?? '',
  };

  const [listInput, setListInput] = useState<any>(initialUpdatedList);
  const [imgPath, setImgPath] = useState('');
  let updatedPublicValue = false;
  let publicValue = listData.isPublic;
  const originalData = { ...listData };

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
          onClick={() => {
            mutation.reset();
            router.replace(router.asPath);
            // this makes getServerSideProps to fire again to get te latest data
            setShowEditList(false);
          }}
        >
          Close
        </Button>
      </div>
    );
  }

  const listFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const updatedListData: ListData = {
      title: listInput.title || originalData.title,
      id: originalData.id,
      description: listInput.description || originalData.description,
      tags: tags,
      isPublic: updatedPublicValue ? publicValue : originalData.isPublic,
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

  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatedPublicValue = true;
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

      <TagsInput
        updateState={showEditList}
        tags={tags}
        setTags={setTags}
      />

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
          setImgPath={setImgPath}
          multiple={false}
          buttonString={'Upload an image'}
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
