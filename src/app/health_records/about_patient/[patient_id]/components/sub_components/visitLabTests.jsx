import React, { useState } from "react";
import Image from "next/image";
import AddLabTest from "./recordLabTest";
import LabSample from "../../../../../assets/lab-test-sample.png";
import BackButton from "./BackButton";
export default function VisitLabtests({ currentScreen, setCurrentScreen}) {
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

  const [currentScreen3, setCurrentScreen3] = useState(0);
  
  return (
    <>
      {(currentScreen3 === 0 || currentScreen === 1) ? (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            VISITS - TESTS
          </div>

          {medication.map((medication, index) => (
            <div
              key={index}
              className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[700px]"
            >
              <div className="flex gap-3.5 px-5 font-semibold whitespace-nowrap">
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
              <div className="flex gap-5 justify-between ml-12 max-md:ml-2.5">
                <div className="flex-auto my-auto">{`${medication.startdate}`}</div>
              </div>

              <div className="flex flex-col ml-5 w-[100%] mt-10 text-xs max-md:ml-0 max-md:w-full">
                <div className="flex">
                  <Image
                    alt="image"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={LabSample}
                    className="w-full object-cover object-center overflow-hidden grow max-md:max-w-full max-md:mt-10"
                  />
                  <div className="ml-5 w-[40%]">
                    <div className="flex gap-5 my-auto font-semibold text-black">
                      Lab Values:
                    </div>
                    <div className="mt-5">
                      FBS = 90 mg/dL <br />
                      PPBS = 140 mg/dL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <BackButton currentScreen={(currentScreen)} setCurrentScreen={setCurrentScreen} />
        </>
      ) : currentScreen3 === 1 ? (
        <AddLabTest />
      ) : (
        ""
      )}
    </>
  );
}
