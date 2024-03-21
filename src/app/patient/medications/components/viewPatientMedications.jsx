import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import BackButton from "../../../health_records/about_patient/[patient_id]/components/sub_components/BackButton";
export default function ViewMedications({ currentScreen, setCurrentScreen }) {
  const dosage = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Medicine Name",
      value: "Ibuprofen",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Dose",
      value: "500",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Unit",
      value: "Milligram",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
      variable: "Form",
      value: "Tablet",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Frequency",
      value: "Once daily",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Patient Instructions",
      value: "Take after every meal",
    },
  ];

  const prescription = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Start Date",
      value: "2024/01/24",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "End Date",
      value: "2024/01/30",
    },
  ];

  const others = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Possible Side Effects",
      value: "Rashes",
    },
  ];

  const [currentScreen3, setCurrentScreen3] = useState(0);

  return (
    <>
      {(currentScreen3 === 0 || currentScreen === 1) && (
        <>
          <div className="border h-screen w-full flex flex-col bg-white border-solid border-stone-300">
            <div className="items-stretch justify-between gap-5 mt-11 px-20 py-10">
              <span className="flex flex-col items-stretch">
                <div className="text-black text-base font-bold leading-5 mt-8 mb-5">
                  VIEW MEDICATION
                </div>
              </span>
              <div className="flex gap-[4rem]">
                <table className="border-spacing-y-7 border-separate">
                  <tbody className="text-xs leading-5 text-black">
                    <div className="text-xs leading-5 text-black">
                      <span className="font-bold"> Dosage Instructions</span>
                      {dosage.map((item, index) => (
                        <tr key={index} className="h-8">
                          <td className="w-5">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src={item.src}
                              className="self-start aspect-square fill-black w-[15px]"
                            />
                          </td>
                          <td className="border-l-[16px] border-transparent">
                            <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                              {item.variable}
                            </div>
                          </td>
                          <td className="border-l-[5rem] border-transparent">
                            {typeof item.value === "string" ? (
                              <div className="text-black text-xs leading-5 ml-auto">
                                {item.value}
                              </div>
                            ) : (
                              <div className="ml-auto">
                                <button
                                  onClick={item.value.onClick}
                                  className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
                                >
                                  {item.value.label}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </div>
                  </tbody>
                </table>
                <table className="border-spacing-y-7 border-separate">
                  <tbody className="text-xs leading-5 text-black">
                    <div className="text-xs leading-5 text-black font-bold">
                      Prescription Duration
                      {prescription.map((item, index) => (
                        <tr key={index} className="h-8">
                          <td className="w-5">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src={item.src}
                              className="self-start aspect-square fill-black w-[15px]"
                            />
                          </td>
                          <td className="border-l-[16px] border-transparent">
                            <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                              {item.variable}
                            </div>
                          </td>
                          <td className="border-l-[5rem] border-transparent">
                            <div className="text-black text-xs font-normal leading-5 ml-auto">
                              {item.variable === "Heart Rate" ? 70 : item.value}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
  
                    <div className="text-xs leading-5 text-black font-bold">
                      Other Remarks
                      {others.map((item, index) => (
                        <tr key={index} className="h-8">
                          <td className="w-5">
                            <Image
                              alt="image"
                              height={0}
                              width={0}
                              loading="lazy"
                              src={item.src}
                              className="self-start aspect-square fill-black w-[15px]"
                            />
                          </td>
                          <td className="border-l-[16px] border-transparent">
                            <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                              {item.variable}
                            </div>
                          </td>
                          <td className="border-l-[5rem] border-transparent">
                            <div className="text-black text-xs font-normal leading-5 ml-10">
                              {item.value}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
                  </tbody>
                </table>
              </div>
  
              <BackButton
                currentScreen={currentScreen}
                setCurrentScreen={setCurrentScreen}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
