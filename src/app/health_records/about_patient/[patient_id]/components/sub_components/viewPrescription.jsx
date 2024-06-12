import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";

import uploadMedication from "@/backend//health_records/uploadMedication";
import { retrieveMedications } from "@/backend//health_records/getMedication";
import { formatDuration } from "date-fns/esm";
import { healthRecords } from "@/backend//health_records/health_records";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import doctor from "@/backend//health_records/doctor";
import { viewMedication } from "./sub_sub_components/viewMedication";

import { Button } from "@/components/ui/button";

const medicine = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
    variable: "Ibuprofen",
    startdate: "01-24-2024",
    enddate: "01-30-2024",
  },
];

export default function ViewPrescription({}) {
  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <>
      {currentScreen === 1 ? (
        <viewMedication />
      ) : (
        <>
          {" "}
          <div className="flex justify-between items-center mt-10">
            <div className="text-black text-base font-bold leading-5 max-md:ml-1 max-md:mt-10">
              VIEW PRESCRIPTION
            </div>
          </div>
          <button
            onClick={() => {
              setCurrentScreen(1);
            }}
          >
            <table className="gap-1 whitespace-nowrap mt-10">
              {/*  {medication.resource.medicationCodeableConcept[0].text} */}
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
                  </tr>
                </>
              ))}
            </table>
          </button>
        </>
      )}
    </>
  );
}
