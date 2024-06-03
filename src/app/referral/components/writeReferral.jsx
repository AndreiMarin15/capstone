"use client";

import * as React from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";

export default function WriteReferral({ referralData, setReferralData }) {
  React.useEffect(() => {
    console.log(referralData);
  }, [referralData]);
  return (
    <div className="flex flex-col m-5 max-md:mt-10 max-md:max-w-full">
      <div className="mt-5 text-xl font-semibold leading-8 text-black max-md:mt-10 max-md:max-w-full">
        Write a Referral Letter
      </div>
      <div className="pt-7 pr-20 pb-12 pl-9 mt-9 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:px-5 max-md:max-w-full">
        <div className="flex max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
            <div className="flex grow gap-4 max-md:mt-10">
              <Image
                alt="img"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/e80fd4f7e67b4f0d3c46d75e3c8fcd5b038ba176a835fc6fbfa07ccbc0ae7748?apiKey=66e07193974a40e683930e95115a1cfd&"
                className="shrink-0 w-14 aspect-square"
              />
              <div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
                <div className="flex text-xs font-semibold  text-black whitespace-nowrap">
                  <div className=" my-auto mr-5">{"Doctor's Name"}</div>
                  <input
                    value={referralData.doctor_name}
                    onChange={(e) =>
                      setReferralData({
                        ...referralData,
                        doctor_name: e.target.value,
                      })
                    }
                    type="text"
                    className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
                  />
                </div>
                <div className="flex mt-3.5 text-xs font-semibold  text-black whitespace-nowrap">
                  <div className=" my-auto mr-5">Specialization</div>
                  <input
                    value={referralData.specialization}
                    onChange={(e) =>
                      setReferralData({
                        ...referralData,
                        specialization: e.target.value,
                      })
                    }
                    type="text"
                    className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-[44%] ">
            <div className="flex gap-5 text-xs font-semibold  text-black max-md:mt-10">
              <div className=" my-auto mr-5">Place of Clinic</div>
              <input
                value={referralData.place_of_clinic}
                onChange={(e) =>
                  setReferralData({
                    ...referralData,
                    place_of_clinic: e.target.value,
                  })
                }
                type="text"
                className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
              />
            </div>
            <div className="flex gap-14 mt-3.5 text-xs font-semibold  text-black max-md:mt-10">
              <div className=" my-auto mr-5">Contact</div>
              <input
                // value={referralData.place_of_clinic}
                // onChange={(e) => setReferralData({ ...referralData, place_of_clinic: e.target.value })}
                type="text"
                className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-6 py-5 mt-2.5 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:pl-5 max-md:max-w-full">
        <div className="flex flex-col px-6 py-5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Reason for Referral
          </div>
          <textarea
            value={referralData.reason_for_referral}
            onChange={(e) =>
              setReferralData({
                ...referralData,
                reason_for_referral: e.target.value,
              })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-3.5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Medication/s
          </div>
          <textarea
            value={referralData.medications}
            onChange={(e) =>
              setReferralData({ ...referralData, medications: e.target.value })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-4 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="text-base font-semibold leading-6 text-black max-md:max-w-full">
            Notes/ Other Remarks:
          </div>
          <textarea
            value={referralData.other_remarks}
            onChange={(e) =>
              setReferralData({
                ...referralData,
                other_remarks: e.target.value,
              })
            }
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
        <div className="flex flex-col px-6 py-5 mt-4 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
          <div className="flex gap-3 text-base items-center font-semibold leading-6 text-black max-md:max-w-full">
            <span className="items-center">Lab Test/s:</span>
            <DropdownMenu className="mt-1 p-2 border rounded border-black max-md:mt-3 max-md:ml-0">
              <DropdownMenuTrigger className="flex cursor-pointer select-none items-center px-3 py-2 border rounded-md text-sm focus:outline-none">
                Select Lab Test
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem value="test1">Test 1</DropdownMenuItem>
                <DropdownMenuItem value="test2">Test 2</DropdownMenuItem>
                <DropdownMenuItem value="test3">Test 3</DropdownMenuItem>
                {/* <!-- Add more options as needed --> */}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="relative flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full text-white">
              +
            </span>
          </div>

          <textarea
            // value={referralData.other_remarks}
            // onChange={(e) => setReferralData({ ...referralData, other_remarks: e.target.value })}
            placeholder=""
            className="mt-3 min-h-32 p-2 max-md:max-w-full"
          />
        </div>
      </div>

      <div className="mt-5 mr-9 max-md:max-w-full max-md:mr-2.5 max-md:mt-10">
        <div className="text-black text-sm font-semibold leading-5">
          Signature
        </div>
        <div className="flex items-center gap-2.5 mt-3">
          <Image
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/596265a182574cc61f242ab133d8eb6a440ed2cadf7d0f1b97fa247bd319b459?"
            className="aspect-[1.02] w-[53px]"
            width="0"
            height="0"
          />
          <button className="px-2.5 py-1.5 text-xs bg-white rounded-sm border border-solid shadow-sm border-zinc-600 text-zinc-600">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
