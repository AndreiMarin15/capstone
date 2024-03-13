import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import BackButton from "./BackButton";
export default function AddMedications({ currentScreen, setCurrentScreen }) {
  const dosage = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Medicine Name",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Dose",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Unit",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Form",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Frequency",
      value: "",
      component: 2,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Patient Instructions",
      value: "",
    },
  ];

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

  const others = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Possible Side Effects",
      value: "",
    },
  ];

  return (
    <>
      {currentScreen === 2 || currentScreen === 4 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            ADD MEDICATION
          </div>

          <div>
            <div className="flex flex-col max-w-[914px]">
              <div className="w-full max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
                  <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs whitespace-nowrap font-semibold text-black">
                        Dosage Instructions
                      </div>
                      <table className="w-full">
                        <tbody>
                          {dosage.map((item, index) => (
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
                                <input
                                  className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
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
                      <div className="text-start text-xs whitespace-nowrap font-semibold text-black">
                        Prescription Duration
                      </div>
                      <table className="w-full">
                        <tbody>
                          {prescription.map((item, index) => (
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

                    <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                      <div className="text-start text-xs  mt-10 whitespace-nowrap font-semibold text-black">
                        Others
                      </div>
                      <table className="w-full">
                        <tbody>
                          {others.map((item, index) => (
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
                                <input
                                  className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
                                  value={item.value}
                                />
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
