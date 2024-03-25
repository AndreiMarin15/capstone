import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDiagnosis() {
  const diagnosisData = [
    {
      imgsrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
      variable: "Diagnosis",
      value: (
        <input
          type="text"
          className="text-zinc-400 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-12 py-2 border-[0.5px] border-solid border-black self-start"
          placeholder="Enter Final Diagnosis Here."
        />
      ),
    },
  ];

  return (
    <>
      {diagnosisData.map((item) => (
        <tr key={item.variable}>
          <td className="w-5">
            {item.imgsrc && (
              <Image
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src={item.imgsrc}
                className="w-5"
              />
            )}
          </td>
          <td className="border-l-[16px] border-transparent">
            <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
              {item.variable}
            </div>
          </td>
          <td className="border-l-[7.5rem] border-transparent">
            <div className="text-black text-xs leading-5 ml-auto">
              {item.value}
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
