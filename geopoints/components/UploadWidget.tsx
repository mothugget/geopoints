//@ts-ignore
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@material-tailwind/react';

interface UploadWidgetProps {
  setImgPath: React.Dispatch<React.SetStateAction<string>>;
  setImgUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  multiple: boolean;
}

export default function UploadWidget({
  setImgPath,
  setImgUploaded,
  multiple,
}: UploadWidgetProps) {
  function onUpload(error: any, result: any, widget: any) {
    console.log(result);
    if (result.event === 'success') {
      setImgUploaded(true);
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
          return <Button onClick={handleOnClick}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
    </div>
  );
}
