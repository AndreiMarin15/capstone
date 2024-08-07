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
import OtherRecords from "./components/otherRecordsDashboard";
import Diagnoses from "./components/diagnosesDashboard";
import { usePatientHRNav } from "@/app/store";
import { healthRecords } from "@/backend//health_records/health_records";

export default function PatientData() {
  const { selected } = usePatientHRNav();
  const router = useRouter();
  const [currentPage, setCurrentPage] = React.useState(0);

  return (
    <>
      <div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
        <div className="w-full max-md:max-w-full">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
              <span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
                <span className="flex w-[100%] max-w-full flex-col items-stretch self-start mb-5">
                  <div className="text-black text-xl font-semibold leading-8">
                    My Health Record
                  </div>
                </span>
                <hr style={{ borderTop: "1px solid #9CA3AF", width: "100%" }} />
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
                ) : selected === "Other Records" ? (
                  <>
                    <OtherRecords />
                  </>
                ) : (
                  ""
                )}
              </span>

              <div className="flex flex-col items-start justify-end text-sm font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
