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

const medicine = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
    variable: "Ibuprofen",
    startdate: "01-24-2024",
    enddate: "01-30-2024",
  },
];

export default function AddPrescription({currentScreen, setCurrentScreen, patientId}) {


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
          <table className="gap-1 whitespace-nowrap mt-10">
         
            {medicine?.map((item, index) => (
              <>
                <tr key={index} className="h-8">
                  <td className="w-5">
                    <Image
                      alt="image"
                      height={0}
                      width={0}
                      loading="lazy"
                      src={item.src}
                      className="self-start aspect-square fill-black w-[15px]"
                    />
                  </td>
                  <td className="border-l-[10px] border-transparent">
                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                      {item.variable}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td className="border-l-[5px] border-transparent">
                    <div className="text-black text-xs font-regular leading-5 ml-auto">
                      {item.startdate} to {item.enddate}
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </table>
        </>
      ) : (
        ""
      )}
    </>
  );
}
