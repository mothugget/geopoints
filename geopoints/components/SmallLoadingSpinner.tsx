import { ClipLoader } from 'react-spinners';

const SmallLoadingSpinner = ({ size }: { size: number }) => {
  return (
    <div className=" bg-transparent flex justify-center items-center bg-white">
      <ClipLoader size={size} color={'#cbd5e1'} />
    </div>
  );
};

export default SmallLoadingSpinner;
