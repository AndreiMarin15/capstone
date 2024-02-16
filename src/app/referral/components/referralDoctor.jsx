
import React from "react";
import Image from "next/image";



const ReferralDoctors= ({ name, age, onClick }) => {
  return (
    <div className="ml-5 flex w-full flex-col">
      <div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
        <div className="flex items-stretch justify-between gap-5">
             
          <Image
            alt="picture"
            height={0}
            width={0}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
            className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
          />
          <span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
            <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{name}</div>
            <div className="text-black text-xs leading-5 mt-2">AGE: {age}</div>
          </span>
        </div>
        <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
        </div>
      </div>
      <div className="bg-gray-400 self-stretch min-h-[1px] w-[98.4%] mt-2 mb-2" />
    </div>
  );
};

export default ReferralDoctors;