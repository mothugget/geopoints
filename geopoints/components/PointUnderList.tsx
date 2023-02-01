import React from "react";
import Image from 'next/image.js';

interface PointUnderListProps {
  imagePath?: string[] | string;
  title: string;
  description?: string;
  tags?: string[]
}

const PointUnderList = ({
  imagePath,
  title,
  description,
  tags
}: PointUnderListProps) => {

  return (
    <section>
      <div className="p-3">
        <div className=" w-full lg:max-w-full lg:flex">
          <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-row justify-between items-center leading-normal">
            <Image width={120} height={10} src={imagePath} className="flex-none overflow-hidden h-24 rounded-md"/>
            <div className="ml-9">
              <h2 className="text-gray-900 font-bold text-xl mb-2">{title}</h2>
              <p className="text-gray-700 text-base">This will be the point description</p>
              <div className="flex flex-wrap justify-start space-x-2">
                <span
                  className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease mt-2">
                  Tag1
                </span>
                <span
                  className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease mt-2">
                  Tag2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // return (
  //   <section>

  //     <div className="flex p-2 bg-white rounded-lg shadow-lg">
  //     {/* <img class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{background-image: `url('${imagePath}')`}} title="Woman holding a mug" alt="Avatar of Jonathan Reinink"/> */}
  //   <div>
  //     <h2 className="text-xl text-black font-bold">Title</h2>
  //     <p className="text-gray-700">Description</p>
  //   </div>
  // </div>
  //   </section>
  // )
}

export default PointUnderList;