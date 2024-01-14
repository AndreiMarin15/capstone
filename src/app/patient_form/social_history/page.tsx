import * as React from "react";
import Image from "next/image";
import ProgressBar from "../components/progressBar";
{
  /* MISSING ITEMS 
    - Progress Bar
    - Multiple Choice options (Smoker Status, Alcohol Consumption, Physical Activities)
    - Restrict input (Cigarettes per day)*/
}

export default function SocialHistory() {
  return (
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300">
      
      <span className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <span className="self-stretch flex items-center justify-between gap-5 ml-4 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="text-black text-xl font-semibold leading-8 my-auto">
            Patient Registration
          </div>
          <span className="self-stretch flex items-center justify-between gap-5">
            <div className="text-gray-400 text-xs font-medium leading-5 grow whitespace-nowrap my-auto">
              Already have an account?
            </div>
            <button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5">
              SIGN IN
            </button>
          </span>
        </span>
        <ProgressBar currentStep={3} />

        <div className="container mx-auto mt-16 flex h-[100vh]">
          {/* Left Column */}
          <div className="w-1/2 pr-8">
            <div className="text-black text-base font-semibold leading-6">
              Social History
            </div>
            <div className="text-zinc-600 text-base leading-6 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-8 mr-24">
            <div className="flex items-stretch justify-between gap-5 mr-32 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Smoker Status
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="items-start flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Cigarettes per day
                </div>
                <input className="w-16 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Alcohol Consumption
                </div>
                <input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-3 mr-32 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Physical Activities
                </div>
                <input className="w-52 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="w-full flex justify-end">
              <button className="text-white text-xs font-semibold whitespace-nowrap justify-center flex items-stretch bg-sky-900 mr-2 mt-12 px-7 py-2 rounded max-md:mr-2.5 max-md:px-5">
                NEXT
              </button>
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
