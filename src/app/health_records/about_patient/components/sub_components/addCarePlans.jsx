import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import BackButton from "./BackButton";

export default function AddCarePlan() {
  const careplan = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Dietary Management",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Physical Activities",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Self Monitoring",
      value: "",
    },
  ];

  const dates = [
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
      <>
        <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
          ADD CARE PLAN
        </div>

        <div>
          <div className="flex flex-col max-w-[914px]">
            <div className="w-full max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                    <table className="w-full">
                      <tbody>
                        {careplan.map((item, index) => (
                          <tr
                            key={index}
                            className="flex gap-5 justify-between mt-6 w-full"
                          >
                            <td className="flex gap-2 my-auto font-semibold text-black">
                              <Image
                                alt="image"
                                height={0}
                                width={0}
                                loading="lazy"
                                src={item.src}
                                className="aspect-[1.14] fill-black w-[17px]"
                              />
                              <div className="flex-auto my-auto">
                                {item.variable}
                              </div>
                            </td>
                            <td>
                              <textarea
                                className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                                style={{
                                  height: [
                                    "Review of Systems",
                                    "Signs and Symptoms",
                                  ].includes(item.variable)
                                    ? "3rem"
                                    : "auto",
                                  whiteSpace: "pre-wrap",
                                }}
                                value={item.value}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                    <table className="w-full">
                      <tbody>
                        {dates.map((item, index) => (
                          <tr
                            key={index}
                            className="flex gap-5 justify-between mt-6 w-full"
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
        </div>
        <div className="flex justify-between items-center mt-5">
          {/*} <BackButton
              currentPage={currentScreen}
              setCurrentPage={setCurrentScreen}
                          /> */}
          <div>
            <button className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-12 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">
              SAVE
            </button>
          </div>
        </div>
      </>
    </>
  );
}
