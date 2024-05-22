"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import BackButton from "./BackButton";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export default function AddRecord(currentScreen, setCurrentScreen) {
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        UPLOAD OTHER RECORDS
      </div>

      <div>
        <div className="flex flex-col max-w-full">
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
              <table className="w-[50%] max-md:ml-0 max-md:w-full text-xs">
                <tbody>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto">
                          Title <span className="text-rose-600">*</span>
                        </div>
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <input
                        type="text"
                        className="justify-center items-start py-1.5 pl-3 pr-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5 w-full"
                        placeholder="Add Title"
                      />
                    </td>
                  </tr>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto ">Description</div>
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <textarea
                        style={{ overflow: "hidden" }}
                        className="justify-center items-start py-1.5 pl-3 pr-3 w-full rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5"
                        placeholder="Add Description"
                      />{" "}
                    </td>
                  </tr>
                  <tr className="flex gap-3 justify-between mb-3 w-full">
                    <td className="flex gap-2 my-auto font-semibold text-black">
                      <div className="flex gap-4 my-auto font-semibold text-black place-content-start">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                          className="aspect-square fill-black w-[15px]"
                        />
                        <div className="my-auto ">
                          {" "}
                          Upload <span className="text-rose-600">*</span>
                        </div>
                      </div>
                    </td>
                    <td className="flex gap-2">
                      <div className="flex flex-col items-center px-20 py-8 text-xs leading-5 text-center bg-white border-black border-solid border-[0.5px] w-25%]">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d670cd5944e41d3f0d0ba9e28820c872d801df2a901fa93765c19dc39e0b53f7?"
                          className="aspect-[1.03] w-[38px]"
                        />
                        <div className="self-stretch mt-1.5 text-black">
                          Drag or drop here.
                        </div>
                        <div className="mt-3.5 font-light text-sky-600 underline">
                          Upload
                        </div>
                        <input type="file" className="hidden" />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <BackButton
              currentScreen={currentScreen}
              setCurrentScreen={setCurrentScreen}
            />

            <Button className="flex items-center ml-12 px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-sm bg-sky-900 text-white">
              Save
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
