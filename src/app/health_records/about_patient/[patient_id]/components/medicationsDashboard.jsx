import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import AddMedications from "./sub_components/addMedication";
import ViewMedications from "./sub_components/viewMedication";
import { useState } from "react";

export default function Medications({ currentScreen, setCurrentScreen }) {
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
      medicinename: "ASPIRIN",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. John Doe",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      medicinename: "TEST",
      srddoctor:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
      doctor: "Dr. Johnny Santos",
      startdate: "2020-10-10",
      enddate: "2020-10-12",
    },
  ];

  const [isTest, setTest] = useState(false);
  const [isAdd, setAdd] = useState(false);
  const handleSetCurrentScreen = (screen) => {
    // Reset isTest to false when navigating back to screen 2
    if (screen === 2) {
      setTest(false);
      setAdd(false);
    }
  };

  return (
    <>
      {isTest ? (
        <ViewMedications
          currentScreen={3}
          setCurrentScreen={handleSetCurrentScreen}
        />
      ) : isAdd ? (
        <AddMedications
          currentScreen={4}
          setCurrentScreen={handleSetCurrentScreen}
        />
      ) : (
        <>
          <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
            MEDICATIONS
            <button
              className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
              onClick={() => {
                setTest(false);
                setAdd(true);
              }}
            >
              Add
            </button>
          </div>
          <div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
            <div className="flex gap-1.5 p-2.5">
              <div className="mt-3 grow font-semibold text-black">Status: </div>
              <button className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                <div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
                  ACTIVE
                </div>
                {/* <svg
              class="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="py-2 pr-5 pl-3 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg z-10">
              <div class="py-1">
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Action 1
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Action 2
                </a>
                <a
                  href="#"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Action 3
                </a>
              </div>
            </div> */}
              </button>
            </div>
            <div className="flex gap-1 my-auto text-black whitespace-nowrap leading-[150%]">
              <button className="flex gap-1 px-5 py-2 rounded-md border border-black border-solid">
                <Image
                  alt="update"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                  className="shrink-0 w-3 aspect-[0.85]"
                />
                <div className="self-start">FILTER</div>
              </button>
              <button className="grow justify-center px-6 py-2.5 rounded-md border border-black border-solid max-md:pl-5">
                SORT
              </button>
            </div>
          </div>

          {medications.map((medication, index) => (
            <button
              key={medication.medicinename}
              onClick={() => {
                setTest(true);
                setAdd(false);
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

                  {medication.doctor === "Dr. John Doe" && (
                    <div className="flex-auto ml-96">
                      <span className="">
                        <button className="ml-auto px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white">
                          Edit
                        </button>
                      </span>
                      <span className="">
                        <button className="ml-2 px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white">
                          Discontinue
                        </button>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
          <BackButton />
        </>
      )}
    </>
  );
}