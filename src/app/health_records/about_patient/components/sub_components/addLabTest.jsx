import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitLabtests from "./visitLabTests";

export default function AddLabTest() {
  const clinicVitals = [
    {
      value: "",
      lab: "LDL",
      equal: "=",
      unit: "",
    },
    {
      value: "",
      lab: "PDS",

      equal: "=",
      unit: "",
    },
    {
      value: "",
      lab: "FBS",

      equal: "=",
      unit: "",
    },
  ];

  const [currentScreen, setCurrentScreen] = useState(0);
  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD LAB TEST
          </div>

          <div>
            <div className="flex flex-col max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
                  <table className="ml-5 w-[50%] max-md:ml-0 max-md:w-full text-xs">
                    <tbody>
                      <tr>
                        <td className="flex gap-16 pr-14 mt-4 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">Date of Result </div>
                          </div>
                          <td>
                            <input className="justify-center items-start py-1.5 pr-16 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td className="flex gap-12 pr-14 mt-6 w-full whitespace-nowrap max-md:pr-5">
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/05dd7068174eb76cbab2ba8d9608b143eabae9c2e3d1be451a944916466c9ae8?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto">Name of Lab Test</div>
                          </div>
                          <td>
                            <input className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                          </td>
                        </td>
                      </tr>
                      <tr>
                        <td className="flex gap-10 mt-6 ml-44 w-full">
                          <div className="flex flex-col items-center px-20 py-2 text-xs leading-5 text-center bg-white border-black border-solid border-[0.5px] max-w-[250px]">
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
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                    <table className="max-w-fit border-separate">
                      <tr>
                        <td>
                          <div className="flex gap-4 my-auto font-semibold text-black">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src="https://cdn.builder.io/api/v1/image/assets/TEMP/835c2c533b5709aa853e0418efd68df6d00f1c923dd0dedb18dc8516044c5f8b?"
                              className="aspect-square fill-black w-[15px]"
                            />
                            <div className="my-auto text-xs">Lab Values</div>
                          </div>
                        </td>
                      </tr>
                    </table>
                    <table className="max-w-fit border-spacing-y-7 border-separate">
                      <tbody className=" text-xs leading-5 text-black">
                        {clinicVitals.map((item, index) => (
                          <tr key={index} className="h-8">
                            <td className="border-l-[16px] border-transparent w-full">
                              <div className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-zinc-400">
                                {item.lab}
                              </div>
                            </td>
                            <td className="border-l-[8px] border-transparent">
                              <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                                {item.equal}
                              </div>
                            </td>
                            <td className="border-l-[8px] border-transparent">
                              <div className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-zinc-400">
                                Enter Here
                                {item.variable === "Heart Rate"
                                  ? ""
                                  : item.value}
                              </div>
                            </td>
                            <td className="border-l-[20px] border-transparent">
                              <input
                                className="justify-center py-2 pr-8 pl-2 font-medium whitespace-nowrap rounded border-black border-solid border-[0.5px] text-zinc-400"
                                placeholder="mg/dL"
                              />
                              {item.variable === "Heart Rate" ? "" : item.unit}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button
                      className="flex gap-1.5 px-5 font-semibold whitespace-nowrap leading-[150%]"
                      onClick
                    >
                      <div className="justify-center items-center px-px text-lg text-white bg-gray-400 rounded-full aspect-square h-[20] w-[24]">
                        +
                      </div>
                      <div className=" my-auto text-xs text-gray-400">
                        Add another row
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
