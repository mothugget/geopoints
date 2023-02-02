//@ts-ignore
import { CldUploadWidget } from "next-cloudinary";

interface UploadWidgetProps {
  setImgUploaded: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UploadWidget({setImgUploaded}: UploadWidgetProps) {
  function onUpload(error: any, result: any, widget: any) {
    console.log(result);
    if (result.event === 'success') {
      setImgUploaded(true);
    }
  }
  return (
    <div>
      <CldUploadWidget uploadPreset="geopoints" onUpload={onUpload}>
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open();
          }
          return (
            <button className=" text-gray-800 border-black border-2 rounded-md p-1" onClick={handleOnClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
