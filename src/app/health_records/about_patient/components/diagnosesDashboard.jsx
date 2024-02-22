
import Image from "next/image";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/react";

import * as React from "react";
  
export default function Diagnoses() {
    const variables = ["Diagnoses", "Date", "Status", "Doctor", "Hospital"];

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
    }
    ];
    return (
        <>
            <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
				DIAGNOSES
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
                        <td key={variableIndex} className={`${variableIndex === 0 ? 'font-normal' : 'mt-8'}`}>
                        {item[variable]}
                        </td>
                    ))}
                    {/* Add an empty row with colspan to create a gap */}
                    <tr key={`gap-${index}`}>
                        <td colSpan={variables.length} className="border-t border-transparent h-4" />
                    </tr>
                    </React.Fragment>
                ))}
                </tbody>
            </table>

            { /* BACK BUTTON */ }
            <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
                <button className="flex items-center justify-center px-10 py-1 w-full rounded border border-sky-900 border-solid font-semibold border-1.5">
                    <div className="flex gap-0.5 justify-between items-center">
                    <Image 
                    height={0}
                    width={0}
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

