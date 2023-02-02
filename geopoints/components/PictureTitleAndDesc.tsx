import Image from 'next/image.js';

interface PictureTitleAndDescProps {
  imagePaths: string[];
  title: string;
  description: string;
  points?: string[];
}
const PictureTitleAndDesc = ({
  imagePaths,
  title,
  description,
}: PictureTitleAndDescProps) => {
  return (
    <section className="h-96 text-gray-800 mb-10">
      <Image
        src={imagePaths[0] ?? '/favicon.ico'}
        width={320}
        height={320}
        alt={`Picture list: ${title}`}
        priority={true}
        className="relative left-9 rounded-md"
      />
      <h4 className="relative ml-9 w-80 text-2xl mt-4">{title}</h4>
      <p className="relative ml-9 mt-3 w-80">{description}</p>
    </section>
  );
};

export default PictureTitleAndDesc;
