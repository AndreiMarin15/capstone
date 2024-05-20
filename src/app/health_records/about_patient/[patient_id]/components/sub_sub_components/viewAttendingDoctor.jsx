import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../sub_components/BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

export default function ViewAttendingDoctors({
  currentScreen,
  setCurrentScreen,
}) {
  const handleSave = async () => {
    setCurrentScreen(2);
  };

  const attendingDoctors = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
      variable: "Date:",
      value: "2024-01-24",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      variable: "Name of Doctor:",
      value: "Kyla Reyes",
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Specialization:",
      value: "Cardiology",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Place of Clinic:",
      value: "RM 123 Philippine General Hospital",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f5262fe18cacfe2ba811c7540eac580928c9def3078b6ed62ce856926ce2393?",
      variable: "Contact",
      value: "0999 999 9999",
    },
  ];

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        VIEW ATTENDING DOCTOR/S
      </div>

      <div>
        <div className="flex flex-col max-w-[914px]">
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col w-[90%] text-xs max-md:ml-0 max-md:w-full">
                  <table className="max-w-fit border-spacing-y-7 border-separate">
                    {attendingDoctors?.map((item) => (
                      <tr key={item.variable}>
                        <td className="w-5">
                          <Image
                            alt="picture"
                            height={0}
                            width={0}
                            loading="lazy"
                            src={item.src}
                            className="w-5"
                          />
                        </td>
                        <td className="border-l-[16px] border-transparent">
                          <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                            {item.variable}
                          </div>
                        </td>
                        <td className="border-l-[5rem] border-transparent">
                          {item.value}
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5">
        <BackButton
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
        <div>
          <Button
            onClick={() => {
              handleSave(); // Save the medication
              setCurrentScreen(2); // Navigate back to the medication list screen
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
