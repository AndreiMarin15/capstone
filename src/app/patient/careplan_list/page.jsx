"use client";
import Image from "next/image";
import * as React from "react";
import CarePlanListNav from "./components/carePlanListNav";
import { useCPNav } from "@/app/store";
import CarePlans from "./components/carePlans";
import LabTests from "./components/laboratoryTests";

{
  /* TO DO: Turn into component */
}

export default function ViewCarePlanList() {
  const { selected } = useCPNav();

  return (
    <div className="border h-full w-full bg-white flex flex-col items-center px-20 py-12 border-solid border-stone-300 max-md:px-5">
      <div className="flex w-full items-stretch justify-between gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
        <span className="flex flex-col items-stretch">
          <div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">
            Medications and Care Plans
          </div>
        </span>
        <div className="flex items-stretch gap-2.5 mt-8 self-end">
          <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
              className=" ml-2 aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
            />
            <input
              className="text-stone-300 text-xs leading-5 my-auto"
              placeholder="SEARCH"
            ></input>
          </span>
          <button className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
            <Image
              alt="picture"
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/7824f47aef79f0674e3de34f06de56a14c198999165016166b0825bd17c7945d?"
              className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
            />
            <div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
              FILTER
            </div>
          </button>
        </div>
      </div>
      {/* TODO: UPDATE IMAGE SRC */}
      {selected === "Care Plans" ? (
        <CarePlans />
      ) : selected === "Laboratory Tests" ? (
        <LabTests />
      ) : (
        <CarePlans />
      )}
    </div>
  );
}
