import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import * as React from "react";

export default function MasterData() {
  const mData = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?",
      variable: "Name",
      value: "Juan Dela Cruz",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?",
      variable: "Age",
      value: "74",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?",
      variable: "Birthday",
      value: "January 01, 1950",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?",
      variable: "Gender",
      value: "Male",
    },
    {
      src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"',
      variable: "Address",
      value: "1 Pasay Rd. Pasay City, Metro Manila",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
      variable: "Stroke in the past year",
      value: "Yes",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
      variable: "Allergies",
      value: {
        label: "View",
        onClick: () => {
          alert("Button clicked for Allergy");
        },
      },
    },
  ];
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        MASTER DATA
      </div>
      <table className="max-w-fit border-spacing-y-7 border-separate">
        {mData.map((item) => (
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
      </table>
      <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
        <button className="flex items-center justify-center px-10 py-1 w-full rounded border-sky-900 border-solid font-semibold border-1.5">
          <div className="flex gap-0.5 justify-between items-center">
            <Image
              width={0}
              height={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
              className="w-4 h-4 aspect-square"
              alt="Back Arrow"
            />
            <div className="ml-1">BACK</div>
          </div>
        </button>
      </div>
    </>
  );
}
