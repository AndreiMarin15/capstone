import * as React from "react";
import Image from "next/image";
export default function Messaging() {
  return (
    <div className="bg-white flex flex-col items-end max-md:pl-5 h-[100vh]">
      <span className="shadow-sm bg-white z-[1] flex w-full max-w-full justify-between gap-5 pl-7 pr-10 py-9 self-start max-md:flex-wrap max-md:px-5">
        <div className="text-black text-xl font-semibold leading-8 mt-1.5">
          Messaging
        </div>
        {/* <div className="self-stretch flex justify-between gap-3.5 items-start">
          <span className="flex items-stretch gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
            <Image
            alt="picture"
					height={0}
					width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d2563a94ad8aa522f388401bcea4e8e4e0594f9441c7803b82b0ebf300bf2d4?"
              className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-stone-300 text-xs px-2 leading-5 my-auto">
              SEARCH
            </div>
          </span>
          <button className="px-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-5 py-2 rounded max-md:pl-5">
            New message
          </button>
  </div> */}
      </span>
      <div className="shadow-sm bg-white mt-0 w-full max-w-full pl-5 pr-20 pt-8 pb-4 max-md:px-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <div className="flex flex-col items-stretch max-md:w-full max-md:ml-0">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6422eb52375a50afd15b70553c37dc9849d7544cde4956bbb282ba7a868bffd?"
              className="aspect-square object-contain object-center w-[43px] overflow-hidden shrink-0 max-w-full ml-2 mt-1.5 max-md:mt-10"
            />
          </div>
          <div className="flex flex-col items-stretch w-[74%] max-md:w-full max-md:ml-0">
            <span className="text-black text-lg font-semibold leading-7 whitespace-nowrap items-stretch grow mt-3 pr-3 pb-5 max-md:mt-10">
              Juan Dela Cruz
            </span>
          </div>
        </div>
      </div>
      <div className="bg-stone-50 self-center flex w-full max-w-full flex-col items-stretch pt-6 pb-12 max-md:max-w-full">
        <div className="flex flex-col px-7 items-start max-md:max-w-full max-md:px-5">
          <div className="flex gap-4 items-start max-md:max-w-full max-md:flex-wrap">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/dffd38d13978a933c893f2eb7821e2e2acf925db34c9fb328f0cab15f6120276?"
              className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
            />
            <span className="text-zinc-600 text-xs font-medium leading-5 shadow-sm bg-white self-stretch grow justify-center items-stretch px-5 py-4 rounded max-md:max-w-full max-md:px-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud{" "}
            </span>
          </div>
          <div className="justify-end items-stretch flex gap-4 mt-12 self-end max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <span className="text-white text-xs font-medium leading-5 shadow-sm bg-blue-500 grow justify-center items-stretch p-4 rounded max-md:max-w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </span>
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/de9c67effad7bceb2cc1b7c7e86cd59aa8389013374f7f725ff726686166f85f?"
              className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full self-start"
            />
          </div>
        </div>
        <div className="flex gap-4 ml-7 mt-12 mb-20 self-start items-start max-md:max-w-full max-md:flex-wrap max-md:my-10">
          <Image
            alt="picture"
            height={0}
            width={0}
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b22ea85d41d4f064a89b11204518bb621ac7e3a8c3c3468a5e2e1d018b44e95?"
            className="aspect-square object-contain object-center w-7 overflow-hidden shrink-0 max-w-full"
          />
          <span className="text-zinc-600 text-xs font-medium leading-5 shadow-sm bg-white self-stretch grow justify-center items-stretch px-5 py-4 rounded max-md:max-w-full max-md:px-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud{" "}
          </span>
        </div>
      </div>
      <div className="shadow-sm bg-white self-center flex w-full max-w-full flex-col items-stretch px-12 py-3.5 max-md:max-w-full max-md:px-5">
        <input
          className="text-zinc-500 text-base leading-6 whitespace-nowrap bg-stone-50 pl-5 pr-16 pt-3.5 pb-14 rounded-lg items-start max-md:max-w-full max-md:pr-5"
          placeholder=" Message..."
        />
        <div className="flex w-full items-center justify-between gap-5 mt-2.5 pr-4 max-md:max-w-full max-md:flex-wrap">
          <span className="flex items-stretch gap-2 my-auto">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8392d4615ad6aedcb4840fcdc0ef1e57e16e40d09018c4aa7cc6e8dce68babb9?"
              className="aspect-square object-contain object-center w-4 fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
            />
            <button className="text-zinc-500 text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto">
              Attachment
            </button>
          </span>
          <button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-blue-500 self-stretch px-7 py-2 rounded max-md:px-5">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
