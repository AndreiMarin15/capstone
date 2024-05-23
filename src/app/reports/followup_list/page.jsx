"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";

export default function FollowUpList() {
  const router = useRouter(); // Initialize useRouter

  const patientInfo = [
    {
      name: "Juana Dela Cruz",
      diagnosis: "Type 2 Diabetes with Ketoacidosis",
      currentDate: "May 30, 2024",
      supposedClinicVisit: "April 20, 2024",
      dateLastClinicVisit: "January 20, 2024",
    },
    {
      name: "Kelsey Mana",
      diagnosis: "Gestational Diabetes",
      currentDate: "May 30, 2024",
      supposedClinicVisit: "April 20, 2024",
      dateLastClinicVisit: "January 20, 2024",
    },
    {
      name: "Joaquin Cruz",
      diagnosis: "Type 1 Diabetes",
      currentDate: "May 30, 2024",
      supposedClinicVisit: "April 20, 2024",
      dateLastClinicVisit: "January 20, 2024",
    },
    {
      name: "Jomari Alberto",
      diagnosis: "Type 2 Diabetes with Kidney Failure",
      currentDate: "May 30, 2024",
      supposedClinicVisit: "April 20, 2024",
      dateLastClinicVisit: "January 20, 2024",
    },
  ];

  return (
    <div
      className="bg-white h-screen flex"
      style={{ overflowY: "scroll", maxHeight: "100vh" }}
    >
      <div className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full">
        <div className="text-xl font-semibold text-black max-md:max-w-full">
          Reports
        </div>
        <div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="flex justify-between gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
            LATE FOR FOLLOW-UP PATIENT LIST
          </div>

          <div className="mt-8 text-xs text-blue-500 max-md:max-w-full">
            <button>Download (.pdf)</button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-4 ml-4 text-sm font-semibold text-black max-md:max-w-full">
            Date Generated: 2024-05-30
            <br />
            Generated by: Dr. John Doe
          </div>

          <Button variant="sortfilter">SORT</Button>
        </div>
        <div className="w-full flex justify-center items-center"></div>

        <div className="flex mt-4 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Patient Name</TableHead>
                <TableHead className="w-[20%]">Diagnosis</TableHead>
                <TableHead className="w-[10%]">Current Date</TableHead>
                <TableHead className="w-[15%]">
                  Supposed Clinic Visit Date
                </TableHead>
                <TableHead className="w-[20%]">
                  Last Clinic Visit Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientInfo?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.diagnosis}</TableCell>
                  <TableCell>{item.currentDate}</TableCell>
                  <TableCell className="text-left">
                    {item.supposedClinicVisit}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.dateLastClinicVisit}
                  </TableCell>
                  <TableCell className="w-[20%] flex items-center">
                    <Image
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d444f20d4efa5f9fb61dafd0b81fd307ed9a7d30376ad82dce2c7f67e398a0b?"
                      className="w-5 h-3"
                      alt="Remind Patient"
                    />
                    <Button variant="remind">Remind Patient</Button>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline">Message</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="text-base text-xs text-sky-900 mt-8">
          <Button variant="back">BACK</Button>
        </div>
      </div>
    </div>
  );
}
