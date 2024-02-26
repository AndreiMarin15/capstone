"use client";
import * as React from "react";
import Navbar from "../../navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PatientHealthRecordNav from "./patientHealthRecordsNav";
import MasterData from "./components/masterDataDashboard";
import FamilySocial from "./components/family&socialHistoryDashboard";
import { usePatientHRNav } from "@/app/store";

export default function PatientData() {
  const { selected } = usePatientHRNav();
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  const handleBack = () => {
    setCurrentPage(currentPage - 1); // Go back one page
  };

  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
        <div className="w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
                  <div className="text-black text-xl font-semibold leading-8">
                    My Health Record
                  </div>
                </span>
                <PatientHealthRecordNav />
                {selected === "Master Data" ? (
                  <MasterData />
                ) : selected === "Family & Social History" ? (
                  <>
                    <FamilySocial />
                  </>
                ) : (
                  ""
                )}
              </span>

              <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-5">
                <button
                  onClick={() => {
                    if (currentPage === 10) {
                      setCurrentPage(0);
                    } else if (currentPage) {
                      setCurrentPage(0);
                    } else {
                      router.push("/health_records"); // Navigate back to the default route
                    }
                  }}
                  className="flex items-center justify-center px-10 py-1 w-full rounded border border-sky-900 border-solid font-semibold border-1.5"
                >
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
