"use client";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import { useCPNav } from "@/app/store";
import ViewMedications from "../medications/components/viewPatientMedications";

{
  /* TO DO: Turn into component */
}

export default function MedicationsDashboard() {
  const { selected } = useCPNav();
  const [currentPage, setCurrentPage] = useState(0);
  const medications = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "IBUPROFEN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Maria Santos",
      startdate: "2020-01-10",
      enddate: "2020-01-15",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "INSULIN DETEMIR",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. John Doe",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "ASPIRIN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Johnny Santos",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
    },
  ];

  const [isTest, setTest] = useState(false);

  const handleSetCurrentScreen = (screen) => {
    // Reset isTest to false when navigating back to screen 2
    if (screen === 2) {
      setTest(false);
    }
  };


  return (
    <>
       {isTest ? (
        <ViewMedications
          currentScreen={3}
          setCurrentScreen={handleSetCurrentScreen}
        />
      ) : (
        <>
          <div className="border h-full w-full bg-white flex flex-col items-center px-20 py-12 border-solid border-stone-300 max-md:px-5">
            <div className="flex w-full items-stretch justify-between gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
              <span className="flex flex-col items-stretch">
                <div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">
                  Medications
                </div>
              </span>
              <div className="flex items-stretch gap-2.5 mt-8 self-end">
                <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
                    className=" ml-2 aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
                  />
                  <input
                    className="text-stone-300 text-xs leading-5 my-auto"
                    placeholder="SEARCH"
                  ></input>
                </span>
                <button className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
                  <Image
                    alt="picture"
                    height={0}
                    width={0}
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7824f47aef79f0674e3de34f06de56a14c198999165016166b0825bd17c7945d?"
                    className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
                  />
                  <div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
                    FILTER
                  </div>
                </button>
              </div>
            </div>
            <div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
              <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
                <div className="flex gap-1.5 p-2.5">
                  <div className="mt-3 grow font-semibold text-black">
                    Status:{" "}
                  </div>
                  <button className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                      ACTIVE
                    </div>
                  </button>
                </div>
              </div>
              {medications.map((medication, index) => (
                <button
                key={medication.medicinename}
                onClick={() => {
                  setTest(true);
                }}
              >
                  <div
                    key={index}
                    className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[1000px]"
                  >
                    <div className="flex gap-3.5 font-semibold whitespace-nowrap ">
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
                    <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
                      <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                        <Image
                          alt="image"
                          height={0}
                          width={0}
                          loading="lazy"
                          src={medication.srddoctor}
                          className="w-4 aspect-square"
                        />
                        <div className="grow my-auto">{medication.doctor}</div>
                        <div className=" ml-16 justify-between flex-auto my-auto">{`${medication.startdate} - ${medication.enddate}`}</div>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      
      )}
    </>
  );
}
