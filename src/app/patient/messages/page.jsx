import * as React from "react";
import Image from "next/image";
export default function Messaging() {
  return (
    <div className="bg-white flex flex-col items-end max-md:pl-5 h-[100vh]">
      <div className=" shadow-sm flex gap-5 justify-between px-14 py-9 mt-1.5 w-full whitespace-nowrap bg-white max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="mt-2.5 text-xl font-semibold text-black">
          All Messages (2)
        </div>
        <div className="flex gap-3.5 justify-between text-xs">
          <div className="flex gap-2 border-gray-300 border-[1px] rounded-lg">
            <Image
              alt="image"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
              className="aspect-square fill-stone-300 w-[13px] ml-4"
            />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="text-white text-xs font-semibold bg-sky-900 px-4 py-1.5 rounded mr-2">
            New Message
          </button>
        </div>
      </div>
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
              Dr. John Doe
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
              Hi, how are you dealing with the care plan? Do you have any concerns?{" "}
            </span>
          </div>
          <div className="justify-end items-stretch flex gap-4 mt-12 self-end max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <span className="text-white text-xs font-medium leading-5 shadow-sm bg-blue-500 grow justify-center items-stretch p-4 rounded max-md:max-w-full">
              Yes, regarding my diet. I think our weight goal is too challenging for me. It makes me dizzy.
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
            Okay. I'll adjust them as necessary. Kindly view your adjusted care plan in a few minutes.{" "}
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
          </span>
          <button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-blue-500 self-stretch px-7 py-2 rounded max-md:px-5">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
