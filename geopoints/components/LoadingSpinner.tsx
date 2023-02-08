import { ClipLoader } from 'react-spinners';

const LoadingSpinner = () => {
  return (
    <div className="h-[calc(100vh-7rem)] w-full flex justify-center items-center bg-gray-50">
      <ClipLoader size={100} color={'#cbd5e1'} />
    </div>
  );
};

export default LoadingSpinner;
