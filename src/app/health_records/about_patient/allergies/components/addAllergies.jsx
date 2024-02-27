import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

import * as React from "react";

export default function AddAllergy() {
  const router = useRouter();
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        ADD ALLERGY
      </div>

      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col text-sm font-semibold leading-5 mt-10 text-black">
            <div>Allergies</div>
            <div className="flex gap-4 justify-between mt-6">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6f6c16bf79fcef72c689d9cf0dca5633ff9c15a7fd4a0cfecf641759b0e5e537?"
                className="self-start aspect-square w-[18px]"
              />
              <div className="flex-auto">Category of Allergen</div>
            </div>
            <div className="flex gap-4 justify-between mt-6 whitespace-nowrap">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d83467a6242c7712b40f0ed0318ecf32eb3765ea8bbaaa517562b75d192879b?"
                className="self-start aspect-square w-[18px]"
              />
              <div className="flex-auto">Allergen</div>
            </div>
            <div className="flex gap-4 justify-between mt-6 whitespace-nowrap">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f79f841ae91f66e8662f831b661819a926269652b904eff7314e2b43bb39640?apiKey=66e07193974a40e683930e95115a1cfd&width=100"
                className="aspect-square w-[18px]"
              />
              <div className="grow">Select Reactions</div>
            </div>
            <div className="flex gap-5 justify-between mt-7">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/09f59612784184ecb36b692dc99a1889ca09a88615d7298261028160ecff647b?apiKey=66e07193974a40e683930e95115a1cfd&width=100"
                className="self-start aspect-square w-[15px]"
              />
              <div className="flex-auto">Severity of Allergy</div>
            </div>
            <div className="flex gap-4 justify-between mt-7 whitespace-nowrap">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                className="aspect-square fill-black w-[15px]"
              />
              <div className="grow">Date of Onset</div>
            </div>
            <div className="flex gap-4 justify-between mt-7 whitespace-nowrap">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/35d66426cc909742122370c08977979ec58e47bea43f66c6158506c2d6dea5ca?"
                className="aspect-square w-[18px]"
              />
              <div className="flex-auto">Comments</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full mt-8">
          <div className="flex flex-col grow mt-10 text-xs leading-5 whitespace-nowrap text-stone-300">
            <select className="rounded shadow-sm h-8 mt-2 border-[0.5px] px-2 py-2 border-solid border-black">
              <option value="">Select Category</option>
              {/* Add more options here */}
            </select>
            <select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
              <option value="">Select Allergen</option>
              {/* Add more options here */}
            </select>
            <select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
              <option value="">Select Reactions</option>
              {/* Add more options here */}
            </select>
            <select className="rounded shadow-sm h-8 mt-3 border-[0.5px] px-2 py-2 border-solid border-black">
              <option value="">Select Severity of Allergy</option>
              {/* Add more options here */}
            </select>
            <input
              className="w-40 rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-4 border-[0.5px] px-2 py-4 border-solid border-black"
              placeholder="YYYY-MM-DD"
            />

            <input className="shrink-0 mt-6 rounded border-black border-solid border-[0.5px] h-[81px]" />
          </div>
        </div>
      </div>

     {/* BACK BUTTON */}
     <div className="w-full flex justify-between max-md:max-w-full mt-10 max-md:px-5">
     
     <button
       onClick={() => {
         router.push("/health_records/about_patient");
       }}
       className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
     >
       <div className="flex gap-0.5 justify-between items-center">
         <Image
           height={0}
           width={0}
           loading="lazy"
           src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
           className="w-3 h-3 aspect-square"
           alt="Back Arrow"
         />
         <div className="text-xs">BACK</div>
       </div>
     </button>
     <div>
           <button
             onClick={() => {
               // Your save logic here
              
             }}
             className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
             
           >
             SAVE
           </button>
         </div>
   </div>
    </>
  );
}
