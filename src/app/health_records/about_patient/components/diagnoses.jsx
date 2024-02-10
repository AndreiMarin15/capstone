
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
                value: 
                {
                    label: "View", 
                    onClick: () => 
                    {
                        alert("Button clicked for Penicillin");
                    },
                },
        },
    ];
    return (
        <>
            <div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
                <div>DIAGNOSES</div>
            </div>

            <table className="pt-1.5 text-xs leading-5 text-black mt-5 max-w-[914px]">
                <thead>
                    <tr className="font-medium text-left">
                    <th>Diagnoses</th>
                    <th>Date of Diagnosis</th>
                    <th>Status</th>
                    <th>Doctor</th>
                    <th>Hospital</th>
                    <th>Medications & Procedures</th>
                    </tr>
                </thead>
            <tbody>
                <tr>
                    <td className="font-normal">Type 2 Diabetes Mellitus</td>
                        <td>2020-01-24</td>
                        <td>Being Managed</td>
                        <td>Dr. John Doe</td>
                        <td>Philippine General Hospital</td>
                        <td>
                            <button className="font-semibold text-sky-900 rounded px-5 py-1.5 border border-sky-900">
                            View
                            </button>
                        </td>
                    </tr>
                   
                    <tr>
                        <td className="font-normal">Hypertension</td>
                        <td>2022-01-30</td>
                        <td>Being Managed</td>
                        <td>Dr. Maria Cruz</td>
                        <td>Batangas Hospital</td>
                        <td>
                            <button className="font-semibold text-sky-900 rounded px-5 py-1.5 border border-sky-900">
                            View
                            </button>
                        </td>
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

