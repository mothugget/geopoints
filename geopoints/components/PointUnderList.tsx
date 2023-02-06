import React from 'react';
import Image from 'next/image.js';
import { Point, Tag } from '../types/types';

interface PointUnderListProps {
  imagePath?: string;
  title: string;
  description?: string;
  // tags: string;
}

// const PointUnderList = ({
//   imagePath,
//   title,
//   description,
// }: // tags,
// PointUnderListProps) => {
  const PointUnderList = ({imagePath, title, description}:PointUnderListProps) => {
  return (
    <section>
      <div className="p-3">
        <div className=" w-full lg:max-w-full lg:flex">
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between items-center leading-normal">
            {imagePath && (
              <Image
                width={120}
                height={10}
                src={imagePath ?? '/favicon.ico'}
                alt={title}
                className="flex-none overflow-hidden h-24 rounded-md"
              />
            )}
            <div className="ml-9">
              <h2 className="text-gray-900 font-bold text-xl mb-2">{title}</h2>
              {description ? (
                <p className="text-gray-700 text-sm">{description}</p>
              ) : (
                <p className="text-gray-400 text-sm italic">
                  {description ?? 'No description...'}
                </p>
              )}
              <div className="flex flex-wrap justify-start space-x-2">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PointUnderList;
