import React, { useState } from "react";
import Image from "next/image";
import AddLabTest from "./recordLabTest";
import LabSample from "../../../../assets/lab-test-sample.png";
import BackButton from "./BackButton";
export default function ViewCarePlan({ currentScreen, setCurrentScreen }) {
  const medication = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "Hb1Ac (Glycated Hemoglobin)",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      startdate: "2024-01-24",
    },
  ];
  const careplan = [
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "DIETARY MANAGEMENT",
      value:
        "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "PHYSICAL ACTIVITIES",
      value:
        "Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
    },
    {
      srccareplan:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      careplanname: "SELF-MONITORING",
      value:
        "Pay attention to your feet and check for any cuts, sores, or redness",
    },
  ];

  const [currentScreen3, setCurrentScreen3] = useState(0);

  return (
    <>
      {currentScreen3 === 0 || currentScreen === 1 ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            CARE PLAN #1
            <button className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5">
              Edit
            </button>
          </div>

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
          <div className="flex flex-col px-5 mt-8 text-xs max-w-[701px]">
            <div className="w-full font-semibold text-black leading-[150%] max-md:max-w-full">
              PATIENT FEEDBACK SURVEY
            </div>
            <div className="mt-5 w-full text-black max-md:max-w-full">
              While adhering to this specific care plan, did you encounter any
              problems or challenges?
            </div>
            <div className="flex gap-5 justify-between self-start mt-3 whitespace-nowrap">
              <div className="flex gap-1.5 items-center text-red-600">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/564c0694374335ea604dd3ae008baa76d5c473b8a86183f17457effdda856bdb?"
                  className="shrink-0 self-stretch my-auto w-2.5 aspect-square"
                />
                <div className="self-stretch my-auto">YES</div>
                <img
                  loading="lazy"
                  srcSet="..."
                  className="shrink-0 self-stretch aspect-square w-[13px]"
                />
              </div>
              <div className="flex gap-1.5 items-center text-black">
                <div className="shrink-0 self-stretch my-auto w-2.5 h-2.5 rounded-full shadow-sm bg-zinc-300" />
                <div className="self-stretch my-auto">NO</div>
                <img
                  loading="lazy"
                  srcSet="..."
                  className="shrink-0 self-stretch aspect-square w-[13px]"
                />
              </div>
            </div>
            <div className="mt-3.5 w-full text-black max-md:max-w-full">
              This patient encountered problems/challenges in adhering to their
              care plan.
            </div>
          </div>
          <BackButton
            currentScreen={currentScreen}
            setCurrentScreen={setCurrentScreen}
          />
        </>
      ) : currentScreen3 === 1 ? (
        <AddLabTest />
      ) : (
        ""
      )}
    </>
  );
}
