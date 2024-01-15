import * as React from "react";
import Image from "next/image";
import ProgressBar from "../components/progressBar";
{
  /* MISSING ITEMS 
    - Add buttons 
    - Upload profile picture
    - Multiple Choice options (Gender)
    - Restrict input (Contact number, birthdate)*/
}

export default function PersonalInformation() {
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

        <ProgressBar currentStep={1} />

        <div className="container mx-auto mt-16 flex h-[100vh]">
          {/* Left Column */}
          <div className="w-1/2 pr-8">
            <div className="text-black text-base font-semibold leading-6">
              Personal Information
            </div>
            <div className="text-zinc-600 text-base leading-6 mt-2">
              Kindly answer the following regarding your personal information.
            </div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 pl-8">
            <div className="flex items-stretch justify-between gap-5 mr-4  max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  First name
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  Last name
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">
                  Contact number
                </div>
                <span className="items-stretch rounded shadow-sm flex justify-between gap-1 mt-2 px-3 py-1.5 border-[0.5px] border-solid border-black">
                  <div className="text-zinc-600 text-sm leading-5 whitespace-nowrap justify-center pl-2.5 pr-1 py-1 items-start max-md:pr-5">
                    +63
                  </div>
                  <div className="text-stone-300 text-sm leading-5 grow whitespace-nowrap justify-center pl-1.5 pr-2 py-1 items-start max-md:pr-5">
                    9171234567
                  </div>
                </span>
              </span>
              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  Gender
                </div>
                <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm justify-center mt-2 pl-2 pr-16 py-2.5 border-[0.5px] border-solid border-black items-start max-md:pr-5">
                  Select
                </span>
              </span>
              <div className="flex items-stretch gap-2.5 mt-1. self-start">
                <span className="flex grow basis-[0%] flex-col items-stretch">
                  <div className="text-black text-sm font-semibold leading-5">
                    Birthdate
                  </div>
                  <div className="flex items-stretch justify-between gap-2.5 mt-2">
                    <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-4 py-2.5 border-[0.5px] border-solid border-black">
                      MM
                    </span>
                    <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-5 py-2.5 border-[0.5px] border-solid border-black">
                      DD
                    </span>
                  </div>
                </span>
                <span className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm grow justify-center items-stretch mt-6 px-5 py-2.5 border-[0.5px] border-solid border-black self-end max-md:px-5">
                  YYYY
                </span>
              </div>
            </div>

            <div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              Street address
            </div>
            <input className="w-full rounded shadow-sm items-stretch flex shrink-0 h-[30px] mr-9 mt-2 flex-col px-2 py-4 border-[0.5px] border-solid border-black max-md:mr-2.5" />

            <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  City
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="items-stretch flex grow basis-[0%] flex-col self-start">
                <div className="text-black text-sm font-semibold leading-5">
                  State/Province
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              <span className="flex items-stretch self-stretch flex-grow flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  Postal Code
                </div>
                <input className="w-40 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
            </div>

            <div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
              <span className="items-stretch flex grow basis-[0%] flex-col">
                <div className="text-black text-sm font-semibold leading-5">
                  Allergies
                </div>
                <input className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black" />
              </span>
              {/*<span className="text-black text-lg font-semibold leading-7 whitespace-nowrap aspect-square justify-center items-stretch mt-7 px-2 py-2.5 rounded-[50%] self-end">
                +
</span>*/}
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
