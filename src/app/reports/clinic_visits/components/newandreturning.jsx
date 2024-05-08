"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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

export default function NewAndReturning() {
  const router = useRouter(); // Initialize useRouter
  const patientInfo = [
    {
      name: "Marvin Raymundo",
      type: "New",
      ref: "Yes",
      refby: "Johnny Santos",
    },
    {
      name: "Ahmed Ali",
      type: "New",
      ref: "Yes",
      date: "Johnny Santos",
    },
    {
      name: "Elena Rodriguez",
      type: "Returning",
      ref: "No",
      date: "-",
    },
    {
      name: "Amir Khan",
      type: "New",
      ref: "Yes",
      date: "Johnny Santos",
    },
  ];
  return (
    <>
      <div className="mt-8 ml-8 mb-2 mr-8">
        <span className="text-black font-semibold text-sm">
          {" "}
          New vs. Returning Patients{" "}
        </span>
        <span className="text-black text-sm">
          {" "}
          (January 1, 2024 to May 1, 2024){" "}
        </span>
      </div>

      <div className="flex mt-4 px-8 w-full text-xs max-md:flex-wrap max-md:max-w-full">
        <Table>
          {/* To change to button */}
          <TableCaption>Page 1 of 2</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Patient Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Referred?</TableHead>
              <TableHead className="text-left">Referred by</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patientInfo.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.ref}</TableCell>
                <TableCell className="text-left">{item.refby}</TableCell>
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
    </>
  );
}
