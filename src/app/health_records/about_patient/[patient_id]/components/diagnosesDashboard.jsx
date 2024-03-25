import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useState } from "react";
import BackButton from "./sub_components/BackButton";
import AddDiagnosis from "./sub_components/addDiagnosis";
import * as React from "react";

export default function Diagnoses() {
  const variables = ["Diagnoses", "Date", "Status", "Doctor", "Hospital"];
  const [currentPage, setCurrentPage] = useState(0);

  const diagnoses = [
    {
      Diagnoses: "Type 2 Diabetes Mellitus",
      Date: "2020-01-10",
      Status: "Being Managed",
      Doctor: "Dr. John Doe",
      Hospital: "PGH",
    },
    {
      Diagnoses: "High Blood",
      Date: "2019-09-09",
      Status: "Being Managed",
      Doctor: "Dr. Johnny Santos",
      Hospital: "Batangas General Hospital",
    },
  ];
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
          DIAGNOSES
        </div>
        <div className="ml-auto">
          <button
            className="flex-shrink-0 px-5 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
            onClick={() => setCurrentPage(1)}
          >
            Add
          </button>
        </div>
      </div>

      <table className="pt-1.5 text-xs leading-5 text-black mt-10 max-w-[914px]">
        <thead>
          <tr className="font-medium text-left">
            {variables.map((variable, index) => (
              <th key={index}>{variable}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((item, index) => (
            <React.Fragment key={index}>
              {variables.map((variable, variableIndex) => (
                <td
                  key={variableIndex}
                  className={`${variableIndex === 0 ? "font-normal" : "mt-8"}`}
                >
                  {item[variable]}
                </td>
              ))}
              {/* Add an empty row with colspan to create a gap */}
              <tr key={`gap-${index}`}>
                <td
                  colSpan={variables.length}
                  className="border-t border-transparent h-4"
                />
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {currentPage === 1 ? (
        <>
          <AddDiagnosis />
        </>
      ) : (
        ""
      )}

      <BackButton />
    </>
  );
}
