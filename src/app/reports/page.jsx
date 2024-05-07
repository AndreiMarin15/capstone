"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";

export default function Reports() {
  const genReport = [
    {
      variable: "Patient List",
      value: "",
    },
    {
      variable: "Referred Patients List",
      value: "",
    },
    {
      variable: "Clinic Visits Volume",
      value: "",
    },
  ];

  const date = [
    {
      variable: "Date",
      value: "",
    },
  ];

  return (
    <div className="bg-white h-screen flex">
      <div className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full">
        <div className="text-xl font-semibold text-black max-md:max-w-full">
          Reports
        </div>
        <div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
          GENERATE:
        </div>
        <div className="flex gap-16 items-start mt-4 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <div className="flex gap-5 px-0.5 mt-1 text-black">
            <div className="flex flex-col">
              <table className="max-w-fit border-spacing border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {genReport.map((item, index) => (
                    <tr key={index} className="h-8">
                      <td className="border-l-[12px] border-transparent">
                        <div className="text-black text-xs leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[16px] border-transparent">
                        <input type="checkbox" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
            <div className="flex w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
              <table className="max-w-fit border-spacing border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {date.map((item, index) => (
                    <tr key={index} className="h-8">
                      <td className="border-l-[12px] border-transparent">
                        <div className="text-black text-xs leading-5 self-center my-auto">
                          {item.variable}
                        </div>
                      </td>
                      <td className="border-l-[16px] border-transparent">
                        <input
                          type="date"
                          className="grow justify-center items-start px-2 py-1.5 pl-2 pr-1 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[calc(78% - 10px)]" // Adjusted width and padding
                        />
                      </td>
                      <td className="border-l-[0px] border-transparent">-</td>
                      <td className="border-l-[0px] border-transparent">
                        <input
                          type="date"
                          className="grow justify-center items-start px-2 py-1.5 pl-2 pr-1 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[calc(78% - 10px)]" // Adjusted width
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex gap-3 self-start mt-7 ml-16 text-black max-md:ml-2.5">
              <input type="checkbox" />
              <div>Generate All</div>
            </div>
          </div>
        </div>
        <div className="text-base text-xs text-sky-900 mt-8">
          <button className="justify-center px-10 py-1.5 rounded border border-sky-900 border-solid max-md:px-5">
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}