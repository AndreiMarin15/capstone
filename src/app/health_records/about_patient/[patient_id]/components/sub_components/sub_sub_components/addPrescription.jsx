import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import BackButton from "../../BackButton";
import uploadMedication from "@/backend//health_records/uploadMedication";
import { retrieveMedications } from "@/backend//health_records/getMedication";
import { formatDuration } from "date-fns/esm";
import { healthRecords } from "@/backend//health_records/health_records";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { Button } from "@/components/ui/button";

export default function AddPrescription({}) {
  return (
    <>
      {currentScreen === 2 || currentScreen === 4 ? (
        <>
          <div className="flex justify-center">
            <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
              CREATE PRESCRIPTION
            </div>
            <Button>Add Medicine</Button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
