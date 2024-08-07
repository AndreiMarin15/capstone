import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";

export default function ViewAttendingDoctors({
  currentScreen,
  setCurrentScreen,
  patientId,
  doctorInfo,
}) {
  const handleSave = async () => {
    setCurrentScreen(2);
  };

  const attendingDoctors = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      variable: "Name of Doctor:",
      value: doctorInfo.name,
    },

    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
      variable: "Specialization:",
      value: doctorInfo.specialty,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
      variable: "Place of Clinic:",
      value: doctorInfo.clinic,
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/2f5262fe18cacfe2ba811c7540eac580928c9def3078b6ed62ce856926ce2393?",
      variable: "Contact",
      value: doctorInfo.contact,
    },
  ];

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
        VIEW ATTENDING DOCTOR/S
      </div>

      <div>
        <div className="flex flex-col max-w-[914px] h-screen">
          <div className="w-full max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
              <div className="flex flex-col w-[50%] max-md:ml-0 max-md:w-full">
                <div className="flex flex-col w-[90%] text-sm max-md:ml-0 max-md:w-full">
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
                          <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
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
        <BackButton currentScreen={2} setCurrentScreen={setCurrentScreen} />
        <div></div>
      </div>
    </>
  );
}
