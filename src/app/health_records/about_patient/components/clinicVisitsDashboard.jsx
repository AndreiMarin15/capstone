import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import ClinicVisit from "./sub_components/viewClinicVisit";
import AddClinicVisit from "./sub_components/addClinicVisit";
import * as React from "react";

export default function ClinicVisits({ currentPage, setCurrentPage }) {
  const router = useRouter();

  const visits = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #1",
      visitdate: "Date: 2023-10-30",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #2",
      visitdate: "Date: 2023-11-26",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      visitname: "Clinic Visit #3",
      visitdate: "Date: 2024-02-14",
    },
  ];

  const handleVisitClick = () => {
    // Increment the currentPage when the user clicks the div
    setCurrentPage(currentPage + 1);
  };

  const addHandleVisitClick = () => {
    // Increment the currentPage when the user clicks the div
    setCurrentPage(currentPage + 2);
  };

  return (
    <>
      {currentPage === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-10 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            CLINIC VISIT
            <button
              className="flex gap-1.5 justify-between px-10 py-1 rounded border border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
              onClick={handleVisitClick}
            >
              {" "}
              {/* current page = 1 */}
              Add New Clinic Visit
            </button>
          </div>

          {visits.map((item, index) => (
            <button
              key={index}
              className="flex mt-4 mb-4 text-xs text-black"
              onClick={addHandleVisitClick}
            >
              {" "}
              {/* current page = 2 */}
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="self-start aspect-square fill-black w-[15px]"
              />
              <div className="flex flex-col flex-1 px-3.5 text-left">
                <div className="font-semibold whitespace-nowrap">
                  {item.visitname}
                </div>
                <div>{item.visitdate}</div>
              </div>
            </button>
          ))}
        </>
      ) : (
        ""
      )}

      {currentPage === 1 ? (
        <>
          <AddClinicVisit />
        </>
      ) : currentPage === 2 ? (
        <>
          <ClinicVisit />
        </>
      ) : (
        ""
      )}
    </>
  );
}
