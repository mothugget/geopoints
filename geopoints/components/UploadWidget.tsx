//@ts-ignore
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@material-tailwind/react';

interface UploadWidgetProps {
  setImgPath: React.Dispatch<React.SetStateAction<string>>;
  multiple: boolean;
  buttonString: string;
}

export default function UploadWidget({
  setImgPath,
  multiple,
  buttonString,
}: UploadWidgetProps) {
  function onUpload(error: any, result: any, widget: any) {
    console.log({result});
    if (result.event === 'success') {
      setImgPath(result.info.url);
    }
  }
  return (
    <div>
      <CldUploadWidget
        uploadPreset="geopoints"
        onUpload={onUpload}
        option={{ multiple }}
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return <Button className='mt-2 bg-light-green-700' onClick={handleOnClick}>{buttonString}</Button>;
        }}
      </CldUploadWidget>
    </div>
  );
}
