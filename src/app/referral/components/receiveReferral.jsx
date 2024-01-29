import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";



const ReceiveReferral= ({ name, patient }) => {
  const router = useRouter();

  return (
    <div className="bg-white flex flex-col items-stretch pb-2">
      <div className="flex items-stretch justify-between gap-5 max-md:mx-5 p-5">
        <div className="flex items-stretch gap-5">
          <Image
            alt="picture"
            height={0}
            width={0}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
            className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
          />
          <span className="self-center flex flex-col items-stretch my-auto">
            <div className="text-black text-l font-semibold leading-5 whitespace-nowrap">{name}</div>
            <div className="text-black text-s leading-5 mt-2">Patient: {patient}</div>
          </span>
        </div>
        <div className="self-center flex flex-col justify-center items-stretch my-auto">
            <div className="flex">
    <button
      onClick={() => {

      }}
      className="text-white text-s font-semibold leading-5 whitespace-nowrap bg-indigo-700 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5 mr-2"
    >
      Review
    </button>
    <button
      onClick={() => {
      }}
      className="text-white text-s font-semibold leading-5 whitespace-nowrap bg-blue-700 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5"
    >
      Accept
    </button>
  </div>
        </div>

      </div>
      <div className="bg-gray-400 self-stretch min-h-[1px] max-md:w-full w-full" />
    </div>
  );
};

export default ReceiveReferral;
