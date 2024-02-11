
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
  
export default function MasterData() {
    const mData = [
        {
            variable: "Diagnoses",
            value: "Type 2 Diabetes Mellitus",
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
        {
            variable: "Medications & Procedures",
			value: {
				label: "View",
				onClick: () => {
					alert("Button clicked for Medications & Procedures");
				},
			},
        },
    ];
    return (
        <>
            <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
				DIAGNOSES
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
                            <td key={index} className={`${index === 0 ? 'font-normal' : 'mt-8'}`}>
                                {typeof item.value === 'object' ? (
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

            { /* BACK BUTTON */ }
            <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
                <button className="flex items-center justify-center px-10 py-1 w-full rounded border border-sky-900 border-solid font-semibold border-1.5">
                    <div className="flex gap-0.5 justify-between items-center">
                    <img
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

