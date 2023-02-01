//@ts-ignore
import { CldUploadWidget } from 'next-cloudinary';

export default function UploadWidget() {
    function onUpload(error:any, result:any, widget:any ){
        console.log(result)
    }
  return (
    <div>
          <CldUploadWidget uploadPreset="geopoints"
          onUpload={onUpload}
          >
              {({ open }) => {
                  function handleOnClick(e) {
                      e.preventDefault();
                      open();
                  }
                  return (
                      <button className=" text-gray-800" onClick={handleOnClick}>
                          Upload an Image
                      </button>
                  );
              }}
          </CldUploadWidget>
    </div>
  )
}
