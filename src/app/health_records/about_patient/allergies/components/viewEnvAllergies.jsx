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
import { useRouter } from "next/navigation";
export default function EnvAllergies() {
  const router = useRouter();
    const mData = [
        {
          variable: "Environmental Allergy",
          value: "Pollen",
        },
        {
          variable: "Reactions",
          value: "Rashes",
        },
        {
          variable: "Severity",
          value: "Severe",
        },
        {
          variable: "Onset Date",
          value: "2004-01-13",
        },
        {
          variable: "Comments",
          value: "N/A",
        },
      ];
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        ENVIRONMENTAL ALLERGIES
        <button className="flex gap-1.5 justify-end text-xs text-blue-800 whitespace-nowrap">
          <div className="flex gap-1.5 justify-between px-8 py-1.5 rounded border border-blue-800 border-solid">
            <div>Add Allergy</div>
          </div>
        </button>
      </div>

      <table className="pt-1.5 text-xs leading-5 text-black mt-5 max-w-[914px]">
        <thead>
          <tr className="font-medium text-left">
            {mData.map((item, index) => (
              <th key={index}>{item.variable}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {mData.map((item, index) => (
              <td
                key={index}
                className={`${index === 0 ? "font-normal" : "mt-8"}`}
              >
                {typeof item.value === "object" ? (
                  <button
                    className="font-semibold text-sky-900 rounded px-5 py-1.5 border border-sky-900"
                    onClick={item.value.onClick}
                  >
                    {item.value.label}
                  </button>
                ) : (
                  item.value
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>

      <div className="flex items-start justify-between mt-5">
        <button
          onClick={() => {
            router.push("/health_records/about_patient");
          }}
          className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
        >
          <div className="flex gap-0.5 justify-between items-center">
            <Image
              height={0}
              width={0}
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
              className="w-3 h-3 aspect-square"
              alt="Back Arrow"
            />
            <div className="text-xs">BACK</div>
          </div>
        </button>
        </div>
    
    </>
  );
}
