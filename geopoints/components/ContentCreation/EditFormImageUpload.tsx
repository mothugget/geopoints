//@ts-ignore
import { CldUploadWidget } from "next-cloudinary";
import { IconButton } from "@material-tailwind/react";


interface UploadWidgetProps {
  setImgPath: React.Dispatch<React.SetStateAction<string>>;
  setImgUploaded: React.Dispatch<React.SetStateAction<boolean>>;
  multiple: boolean;
}

export default function EditFormImageUpload({
  setImgPath,
  setImgUploaded,
  multiple,
}: UploadWidgetProps) {

  function onUpload(error: any, result: any, widget: any) {
    console.log(result);
    if (result.event === "success") {
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
          return (
            <IconButton onClick={handleOnClick}>
              <img alt="change-photo-icon" src="/change-photo-icon.png" />
            </IconButton>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
