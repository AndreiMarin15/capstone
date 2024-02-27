import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddMedications from "./addMedication";
import RecordLabTest from "./recordLabTest";
import BackButton from "./BackButton";
export default function AddFollowUpVisit({ currentScreen, setCurrentScreen }) {
  const labtest = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Lab Test Name",
      value: "",
    },
  ];

  

  return (
    <>
      {currentScreen === 3 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
            REQUEST LAB TEST
          </div>

          <div>
            <div className="flex gap-[4rem] align-baseline">
              <table className="max-w-fit border-spacing-y-5 border-separate">
                <tbody className="text-xs leading-5 text-black">
                  {labtest.map((item, index) => (
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
                        <input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5" />{" "}
                        {item.variable === "" ? "" : item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <BackButton currentScreen={ 5 } setCurrentScreen={ setCurrentScreen } />
        </>
     
       
      ) : (
        ""
      )}
    </>
  );
}
