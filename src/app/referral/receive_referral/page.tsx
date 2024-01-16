"use client";

import * as React from "react";
import Image from "next/image";
import ProgressBar from "../components/progressBar";


import { useRouter } from "next/navigation";  // Fix the import statement for next/router

const navigation = [
  {
    name: "DELA CRUZ, Juan",
    age: "70",
    href: "",
    src: "",
  },
  {
    name: "RIZAL, Jose",
    age: "43",
    href: "",
    src: "",
  },
  {
    name: "BONIFACIO, Andres",
    age: "39",
    href: "",
    src: "",
  },
  {
    name: "QUEZON, Manuel",
    age: "44",
    href: "",
    src: "",
  },
  {
    name: "SORA, Tandang",
    age: "61",
    href: "",
    src: "",
  },
  {
    name: "LUNA, Juan",
    age: "30",
    href: "",
    src: "",
  },
  {
    name: "LUNA, Antonio",
    age: "18",
    href: "",
    src: "",
  },
];

export default function ReceiveReferral() {
  const router = useRouter();
  const [currentState, setCurrentState] = React.useState<1 | 2 | 3 | 4>(1);

  return (
    
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300 h-[100vh]">
     
	<div className=" ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>					
	   
      <ProgressBar currentStep={currentState} />

      {navigation.map((item) => (
        <div key={item.name} className="ml-10 flex w-full flex-col">
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
                <div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{item.name}</div>
                <div className="text-black text-xs leading-5 mt-2">AGE: {item.age}</div>
              </span>
            </div>
            <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
              <button
                onClick={() => {
                  router.push("/referral/about_patient");
                }}
                className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5"
              >
                Select
              </button>
            </div>
          </div>
          <div className="bg-gray-400 self-stretch min-h-[1px] w-full mt-2 mb-2 max-md:max-w-full w-full" />
        </div>
      ))}

      <div className="w-full flex justify-between px-14 max-md:max-w-full max-md:px-5">
        {currentState > 1 ? (
          <button
            onClick={() => {
              if (currentState > 1) {
                setCurrentState((currentState - 1) as 1 | 2 | 3 | 4);
              }
            }}
            className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
          >
            BACK
          </button>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => {
            if (currentState < 4) {
              setCurrentState((currentState + 1) as 1 | 2 | 3 | 4);
            }
            console.log(currentState);
          }}
          className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2  px-6 py-2 rounded max-md:px-3"
        >
          NEXT
        </button>
      </div>
    </div>
  );
}
