"use client";
import * as React from "react";
import Navbar from "../../navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PatientHealthRecordNav from "./patientHealthRecordsNav";
import MasterData from "./components/masterDataDashboard";
import FamilySocial from "./components/family&socialHistoryDashboard";
import ClinicVisits from "./components/clinicVisitsDashboard";
import VitalsBiometrics from "./components/vitalsDashboard";
import Diagnoses from "./components/diagnosesDashboard";
import { usePatientHRNav } from "../../store";

export default function PatientData() {
  const { selected } = usePatientHRNav();
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
        <div className="w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
                  <div className="text-black text-xl font-semibold leading-8">
                    My Personal Details
                  </div>
                </span>
                <PatientHealthRecordNav />
                {selected === "Master Data" ? (
                  <MasterData />
                ) : selected === "Family & Social History" ? (
                  <>
                    <FamilySocial />
                  </>
                ) : selected === "Diagnoses" ? (
                  <>
                    <Diagnoses />
                  </>
                ) : selected === "Vitals & Biometrics" ? (
                  <>
                    <VitalsBiometrics />
                  </>
                ) : selected === "Clinic Visits" ? (
                  <>
                    <ClinicVisits />
                  </>
                ) : (
                  ""
                )}
              </span>

              <div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
