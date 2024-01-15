"use client";
import * as React from "react";
import Navbar from "../navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyComponent() {
    const router = useRouter();
  return (
    <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
    <div className="flex flex-col max-md:max-w-full max-md:mt-10">
      <span className="self-stretch flex items-center justify-between gap-5 px-5 max-md:max-w-full max-md:flex-wrap">
        <div className="text-black text-xl font-semibold leading-8 grow whitespace-nowrap my-auto">
          Referral
        </div>
        <div className="self-stretch flex grow basis-[0%] flex-col items-end max-md:max-w-full">
          <div className="flex w-[181px] shrink-0 h-[34px] flex-col rounded-[50%]" />
          <div className="self-stretch flex items-center justify-between gap-0.5 mt-24 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
            <span className="text-white text-xl font-semibold leading-8 whitespace-nowrap self-stretch aspect-[1.25] justify-center items-stretch pl-3.5 pr-5 py-3.5 rounded-[50%]">
              1
            </span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
              className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
            />
            <span className="text-white text-xl font-semibold leading-8 self-stretch grow justify-center items-stretch px-4 py-3.5 rounded-[50%]">
              2
            </span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
              className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
            />
            <span className="text-white text-xl font-semibold leading-8 self-stretch grow justify-center items-stretch px-4 py-3.5 rounded-[50%]">
              3
            </span>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/d6d8a4f1f780d171fc0c5979ae4dc06265006cb1fe0d65d68ef9c0b303f1fd7b?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
              className="aspect-[83.5] object-contain object-center w-[167px] stroke-[2px] stroke-gray-400 overflow-hidden shrink-0 max-w-full my-auto"
            />
            <span className="text-white text-xl font-semibold leading-8 self-stretch grow justify-center items-stretch px-4 py-3.5 rounded-[50%]">
              4
            </span>
          </div>
        </div>
      </span>
      <span className="self-center flex w-[804px] max-w-full items-start justify-between gap-5 mt-3 px-5 max-md:flex-wrap" />
      <span className="self-stretch flex w-full items-center justify-between gap-5 mt-12 pr-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
        <div className="text-black text-base font-medium leading-6 my-auto">
          SELECT PATIENT
        </div>
  
      </span>
      <div className="self-stretch flex flex-col mt-6 pl-6 items-start max-md:max-w-full max-md:pl-5">
        <div className="flex items-stretch gap-5 ml-3.5 max-md:ml-2.5" />
      </div>
      <span className="text-white text-xs font-semibold justify-center items-stretch bg-sky-900 mt-11 px-7 py-2 rounded self-end max-md:mt-10 max-md:px-5">
        NEXT
      </span>
    </div>
  </div>
);
}

