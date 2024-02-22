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
import ViewDiagnosis from "./sub_components/viewDiagnosis";

export default function MasterData() {
  const [currentPage, setCurrentPage] = React.useState(0);

  const mData = [
    {
      variable: "Diagnoses",
      value: "Type 2 Diabetes Mellitus",
      handler: () => setCurrentPage(currentPage + 1),
    },
    {
      variable: "Date of Diagnosis",
      value: "2020-01-10",
    },
    {
      variable: "Status",
      value: "Being Managed",
    },
    {
      variable: "Doctor",
      value: "Dr. John  Doe",
    },
    {
      variable: "Hospital",
      value: "PGH",
    },
  ];

  return (
    <>
      {currentPage === 0 && (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
            DIAGNOSES
          </div>

          <table className="pt-1.5 text-xs leading-5 text-black mt-10 max-w-[914px]">
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
                    {item.variable === "Diagnoses" ? (
                      <button onClick={item.handler}>
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
                      </button>
                    ) : (
                      item.value
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </>
      )}
      {currentPage === 1 && <ViewDiagnosis />}
    </>
  );
}
