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
          {reactions?.map((item, index) => (
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
export default function DrugAllergies({ allergy }) {
  const header = ["Drug", "Reactions", "Severity", "Onset Date", "Comments"];
  if (!allergy) return <p>Still Loading</p>;

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        DRUG ALLERGIES
      </div>

      <table className="pt-1.5 text-sm leading-5 text-black mt-5 max-w-[914px]">
        <thead>
          <tr className="font-medium text-left">
            {header?.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allergy &&
            allergy?.map((item) => {
              return <>{rowdata({ ...item })}</>;
            })}
        </tbody>
      </table>
    </>
  );
}
