import * as React from "react";
import Image from "next/image";
export default function PersonalInformation() {
  return (
    <div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300">
     
      <div className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
        <div className="self-stretch flex items-center justify-between gap-5 ml-4 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="text-black text-xl font-semibold leading-8 my-auto">
            Patient Registration
          </div>
          <div className="self-stretch flex items-center justify-between gap-5">
            <div className="text-gray-400 text-xs font-medium leading-5 grow whitespace-nowrap my-auto">
              Already have an account?
            </div>
            <div className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5">
              SIGN IN
            </div>
          </div>
        </div>
        <div className="self-center flex w-[771px] max-w-full items-stretch justify-between gap-5 mt-16 max-md:flex-wrap max-md:mt-10">
          <div className="items-center flex basis-[0%] flex-col">
            <div className="text-white text-xl font-semibold leading-8 whitespace-nowrap aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
              1
            </div>
            <div className="text-sky-900 text-base leading-6 self-stretch whitespace-nowrap mt-1.5">
              Personal Information
            </div>
          </div>
          <div className="flex grow basis-[0%] flex-col items-center self-start max-md:max-w-full">
            <div className="flex items-center gap-0.5 max-md:max-w-full max-md:flex-wrap">
              <div className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                2
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?"
                className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                3
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?"
                className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
              />
              <div className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-square justify-center items-stretch px-4 py-3.5 rounded-[50%]">
                4
              </div>
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-5 mt-3 max-md:max-w-full max-md:flex-wrap">
              <div className="text-gray-400 text-base leading-6">
                Family History
              </div>
              <div className="text-gray-400 text-base leading-6">
                Social History
              </div>
              <div className="text-gray-400 text-base leading-6">
                Medical History
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex items-stretch justify-between gap-5 ml-4 mr-4 mt-16 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-base font-semibold leading-6">
              Personal Information
            </div>
            <div className="text-zinc-600 text-base leading-6 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </div>
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              First name
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5">
              Last name
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 mr-28 mt-2.5 self-end max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="items-stretch flex grow basis-[0%] flex-col self-start">
            <div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">
              Contact number
            </div>
            <div className="items-stretch rounded shadow-sm flex justify-between gap-1 mt-2 px-3 py-1 border-[0.5px] border-solid border-black">
              <div className="text-zinc-600 text-sm leading-5 whitespace-nowrap">
                +63
              </div>
              <div className="text-stone-300 text-sm leading-5 grow whitespace-nowrap">
                9171234567
              </div>
            </div>
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Gender
            </div>
            <div className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm justify-center mt-2 pl-2.5 pr-16 py-2.5 border-[0.5px] border-solid border-black items-start max-md:pr-5">
              Select
            </div>
          </div>
          <div className="flex items-stretch gap-2.5 mt-1.5 self-start">
            <div className="flex grow basis-[0%] flex-col items-stretch">
              <div className="text-black text-sm font-semibold leading-5">
                Birthdate
              </div>
              <div className="flex items-stretch justify-between gap-2.5 mt-3">
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-4 py-2.5 border-[0.5px] border-solid border-black">
                  MM
                </div>
                <div className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm aspect-[1.8333333333333333] justify-center items-stretch px-5 py-2.5 border-[0.5px] border-solid border-black">
                  DD
                </div>
              </div>
            </div>
            <div className="text-stone-300 text-sm leading-5 whitespace-nowrap rounded shadow-sm grow justify-center items-stretch mt-6 px-5 py-2.5 border-[0.5px] border-solid border-black self-end max-md:px-5">
              YYYY
            </div>
          </div>
        </div>
        <div className="text-black text-sm font-semibold leading-5 mr-9 mt-8 self-end max-md:max-w-full max-md:mr-2.5">
          Street address
        </div>
        <div className="rounded shadow-sm flex w-[577px] shrink-0 max-w-full h-[30px] flex-col mr-9 mt-2 border-[0.5px] border-solid border-black self-end max-md:mr-2.5" />
        <div className="items-stretch flex justify-between gap-5 mr-9 mt-8 self-end max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              City
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              State/Province
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </div>
          <div className="items-stretch flex grow basis-[0%] flex-col">
            <div className="text-black text-sm font-semibold leading-5">
              Postal code
            </div>
            <div className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] border-solid border-black" />
          </div>
        </div>
        <img
          loading="lazy"
          srcSet="..."
          className="aspect-[1.99] object-contain object-center w-[147px] overflow-hidden self-center max-w-full mt-10"
        />
        <div className="text-black text-sm font-semibold leading-5 self-center ml-32 mt-8">
          Allergies
        </div>
        <div className="self-center rounded shadow-sm flex w-[374px] shrink-0 max-w-full h-[30px] flex-col ml-32 mt-2 border-[0.5px] border-solid border-black" />
        <div className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 mr-9 mt-8 px-7 py-2 rounded self-end max-md:mr-2.5 max-md:px-5">
          NEXT
        </div>
      </div>
    </div>
  );
}
