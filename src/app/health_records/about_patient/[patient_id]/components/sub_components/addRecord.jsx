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

export default function AddRecord({ currentScreen, setCurrentScreen }) {
  const record = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "Title",
      value: "",
      type: "input",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "Description",
      value: "",
      type: "textarea",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      variable: "Upload",
      value: "",
      type: "upload",
    },
  ];
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        UPLOAD OTHER RECORDS
      </div>

      <div>
        <div className="flex flex-col max-w-full">
          <table className="max-w-fit border-spacing-y-5 border-separate">
            <tbody className="text-xs leading-5 text-black">
              {record.map((item, index) =>
                item.type === "input" ? (
                  <>
                    <tr key={index} className="align-top">
                      <td className="w-5">
                        {
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                        }
                      </td>
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <input
                          placeholder={"Add Title"}
                          type="text"
                          value={item.value}
                          onChange={item.onChange}
                          className={`justify-center items-start py-1.5 pl-3 pr-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5 w-full`}
                        />
                      </td>
                    </tr>
                  </>
                ) : item.type === "textarea" ? (
                  <>
                    <tr key={index} className="align-top">
                      <td className="w-5">
                        {
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                        }
                      </td>
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
                        <textarea
                          placeholder={"Add Description"}
                          type="text"
                          value={item.value}
                          onChange={item.onChange}
                          className={`justify-center items-start py-1.5 pl-3 pr-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5 w-full`}
                        />
                      </td>
                    </tr>
                  </>
                ) : item.type === "upload" ? (
                  <>
                    <tr key={index} className="align-top">
                      <td className="w-5">
                        {
                          <Image
                            alt="image"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="self-start aspect-square fill-black w-[15px]"
                          />
                        }
                      </td>
                      <td className="border-l-[5px] border-transparent">
                        <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[15px] border-transparent">
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
                  </>
                ) : null
              )}
            </tbody>
          </table>

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
