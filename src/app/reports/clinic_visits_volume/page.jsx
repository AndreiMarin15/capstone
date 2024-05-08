"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PieChart from "./pieChart";
import { Link } from "next/link"; // Import Link component
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default function PatientListClinicVisit() {
  const router = useRouter(); // Initialize useRouter

  const patientInfoClinicVisit = [
    {
      name: "Juana Dela Cruz",
      type: "New",
      referred: "Yes",
      referredby: "Dr. John Doe",
    },
    {
      name: "Juana Dela Cruz",
      type: "Returning",
      referred: "Yes",
      referredby: "Dr. John Doe",
    },
    {
      name: "Juana Dela Cruz",
      type: "Returning",
      referred: "Yes",
      referredby: "Dr. John Doe",
    },
    {
      name: "Juana Dela Cruz",
      type: "New",
      referred: "Yes",
      referredby: "Dr. John Doe",
    },
  ];

  return (
    <div className="bg-white h-screen flex">
      <div className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full">
        <div className="text-xl font-semibold text-black max-md:max-w-full">
          Reports
        </div>
        <div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="flex justify-between gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
            CLINIC VISITS VOLUME
          </div>

          <div className="mt-8 text-xs text-blue-500 max-md:max-w-full">
            <button>Download (.pdf)</button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-4 ml-4 text-sm font-semibold text-black max-md:max-w-full">
            Date Generated: 2024-04-06
            <br />
            Generated by: Dr. John Doe
          </div>

          <button className="flex gap-1 text-sm py-1 px-2 whitespace-nowrap rounded-md border border-black border-solid">
            <Image
              loading="lazy"
              height={0}
              width={0}
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/80c3069d4b41f9638143beaab01442a1ee1faa03e69b5f02684db5e14364bb41?"
              className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
            />
            <div>FILTER</div>
          </button>
        </div>
        <PieChart></PieChart>
        <div className="flex mt-4 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Patient Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="w-[40%]">Referred?</TableHead>
                <TableHead className="text-left">Referred By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientInfoClinicVisit.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.referred}</TableCell>
                  <TableCell className="text-left">{item.referredby}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="text-base text-xs text-sky-900 mt-8">
          <button className="flex items-center justify-center px-6 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5">
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
      </div>
    </div>
  );
}
