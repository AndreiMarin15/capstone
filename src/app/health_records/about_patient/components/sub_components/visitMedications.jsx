import React, { useState } from "react";
import Image from "next/image";
import AddMedications from "./addMedication";

export default function VisitMedications() {
  const medications = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "IBUPROFEN",
      startdate: "2020-01-24",
      enddate: "2020-01-30",
      form: "Tablet",
      dose: "500",
      unit: "mg",
      frequency: "Once daily",
      until: "2024-01-24",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "ASPIRIN",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
      form: "Tablet",
      dose: "30",
      unit: "mg",
      frequency: "Once daily",
      until: "2024-01-12",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "AMLOPIDINE",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
      form: "Tablet",
      dose: "30",
      unit: "mg",
      frequency: "Once daily",
      until: "2024-01-12",
    },
  ];

  const careplan = [
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "DIETARY MANAGEMENT",
      value: "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "PHYSICAL ACTIVITIES",
      value: "Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "SELF-MONITORING",
      value: "Pay attention to your feet and check for any cuts, sores, or redness",
    },
  ];


  const [currentScreen, setCurrentScreen] = useState(0);

  return (
    <>
      {currentScreen === 0 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            VISITS - MEDICATIONS & CARE PLAN
          </div>

          <div className="text-start text-sm mt-7 whitespace-nowrap font-semibold text-black">
            Medications
          </div>

          {medications.map((medication, index) => (
            <div
              key={index}
              className="flex flex-col mt-5 items-start text-xs leading-5 text-black max-w-[701px]"
            >
              <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src={medication.srcmedicine}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{medication.medicinename}</div>
              </div>
              <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                <div className="flex-auto my-auto">{`${medication.startdate} - ${medication.enddate}`}</div>
              </div>
              <div className="flex gap-5 justify-between self-stretch ml-7 mt-6 w-full font-semibold max-md:flex-wrap max-md:max-w-full">
                <div className="pr-8">
                  <span className="">Form</span>:{" "}
                  <span className="font-medium">{medication.form}</span>
                </div>
                <div className="pr-8">
                  <span className="">Dose</span>:{" "}
                  <span className="font-medium">{medication.dose}</span>
                </div>
                <div className="pr-8">
                  <span className="">Unit</span>:{" "}
                  <span className="font-medium">{medication.unit}</span>
                </div>
                <div className="flex-auto">
                  <span className="">Frequency</span>:{" "}
                  <span className="font-medium">{medication.frequency}</span>
                </div>
                <div className="flex-auto">
                  <span className="">Until</span>:{" "}
                  <span className="font-medium">{medication.until}</span>
                </div>
              </div>
            </div>
          ))}

          {/* CARE PLAN */}
          <div className="text-start text-sm mt-10 whitespace-nowrap font-semibold text-black">
            Care Plan
          </div>

          {careplan.map((careplan, index) => (
            <div
              key={index}
              className="flex flex-col mt-5 items-start text-xs leading-5 text-black max-w-[701px]"
            >
              <div className="flex gap-3.5 mb-5 font-semibold whitespace-nowrap">
                <Image
                  alt="image"
                  height={0}
                  width={0}
                  loading="lazy"
                  src={careplan.srccareplan}
                  className="aspect-square fill-black w-[15px]"
                />
                <div className="my-auto">{careplan.careplanname}</div>
              </div>
              <div className="flex gap-5 justify-between self-stretch ml-7 w-full max-md:flex-wrap max-md:max-w-full">
                <div className="pr-8">
                  <span className="font-normal">{careplan.value}</span>
                </div>
              </div>
            </div>
          ))}
         
        </>
      ) : currentScreen === 1 ? (
        <AddMedications />
      ) : (
        ""
      )}
    </>
  );
}
