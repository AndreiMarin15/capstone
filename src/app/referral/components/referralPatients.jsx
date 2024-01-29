import React from "react";
import Image from "next/image";



const ReferralPatients = ({ name, age, onClick }) => {
    return (
        <div className="ml-5 flex flex-col w-full max-md:w-[83%] max-md:ml-0">
          <div className="flex items-stretch justify-between gap-5 w-full max-md:w-full">
            <div className="flex items-stretch gap-5">
                <div className="flex items-center my-4">
                    <input type="checkbox" className="mr-2" />
                 </div>
              <Image
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
                className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
              />
              <span className="self-center flex flex-col items-stretch my-auto">
                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{name}</div>
                <div className="text-black text-xs leading-5 mt-2">AGE: {age}</div>
              </span>
            </div>
          </div>
          <div className="bg-gray-400 self-stretch min-h-[1px] w-full mt-2 mb-2 w-full max-md:max-w-full" />
        </div>
      );
    };

export default ReferralPatients;
