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
const rowdata = ({
  allergen,
  comments,
  reactions,
  date_of_onset,
  severity_of_allergy,
}) => {
  return (
    <tr>
      <td>{allergen}</td>
      <td>
        <ol class="list-decimal list-inside">
          {reactions.map((item, index) => (
            <li key={index}>{item.description}</li>
          ))}
        </ol>
      </td>
      <td>{severity_of_allergy || "mild"}</td>
      <td>{date_of_onset || "mm-dd-yyy"}</td>
      <td>{comments || "N/A"}</td>
    </tr>
  );
};
export default function FoodAllergies({ allergy, patientId }) {
  const router = useRouter();
  const header = ["Food", "Reactions", "Severity", "Onset Date", "Comments"];
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        FOOD ALLERGIES
      </div>

      <table className="pt-1.5 text-xs leading-5 text-black mt-5 max-w-[914px]">
        <thead>
          <tr className="font-medium text-left">
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allergy &&
            allergy.map((item) => {
              return <>{rowdata({ ...item })}</>;
            })}
        </tbody>
      </table>

      {/* BACK BUTTON */}
      <div className="w-full flex justify-between max-md:max-w-full mt-10 max-md:px-5">
        <button
          onClick={() => {
            router.push(`/health_records/about_patient/${patientId}`);
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
