import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitLabtests from "./visitLabTests";
import BackButton from "./BackButton";
export default function AddCarePlan({ currentScreen, setCurrentScreen }) {
  const prescription = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Start Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "End Date",
      value: "",
    },
  ];

  return (
    <>
      {currentScreen === 2 || currentScreen === 4 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD CARE PLAN
          </div>

          <div>
            <div className="flex flex-col max-w-full">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:w-full">
                  <table className="ml-5 w-[50%] max-md:ml-0 max-md:w-full text-xs">
                    <tbody>
                      <tr className="flex gap-5 justify-between mb-3 w-full">
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
                            <div className="my-auto">Dietary Management</div>
                          </div>
                        </td>
                        <td>
                          <textarea className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                        </td>
                      </tr>
                      <tr className="flex gap-5 justify-between mb-3 w-full">
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
                            <div className="my-auto">Physical Activities</div>
                          </div>
                        </td>
                        <td>
                          <textarea className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                        </td>
                      </tr>
                      <tr className="flex gap-5 justify-between mb-3 w-full">
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
                            <div className="flex auto my-auto">
                              Self-Monitoring
                            </div>
                          </div>
                        </td>
                        <td>
                          <textarea className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
                    <table className="w-full  text-xs">
                      <tbody>
                        {prescription.map((item, index) => (
                          <tr
                            key={index}
                            className="flex gap-5 justify-between mb-3 w-full"
                          >
                            <td className="flex gap-2 my-auto font-semibold text-black">
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src={item.src}
                                className="aspect-square fill-black w-[15px]"
                              />
                              <div className="flex-auto my-auto">
                                {item.variable}
                              </div>
                            </td>
                            <td>
                              {item.variable === "Start Date" ||
                              item.variable === "End Date" ? (
                                <input
                                  type="date"
                                  className="grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
                                  value={item.value}
                                />
                              ) : (
                                <input
                                  className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
                                  value={item.value}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-5">
            <BackButton
              currentPage={currentScreen}
              setCurrentPage={setCurrentScreen}
            />
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
      ) : (
        ""
      )}
    </>
  );
}
