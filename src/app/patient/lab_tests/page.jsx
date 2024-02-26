"use client";
import React, { useState } from "react"; // <-- Import useState from React
import Image from "next/image";
import UploadLab from "./components/uploadLab";

{
  /* TO DO: Turn into component */
}

export default function LaboratoryList() {
  const [currentPage, setCurrentPage] = useState(0);

  const lab = [
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "Fasting Blood Sugar (FBS) Test",
      reqdate: "2024/01/24",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "HbA1c Test",
      reqdate: "2024/01/24",
    },
    {
      srcmedicine:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
      labname: "Total Cholesterol Test",
      reqdate: "2024/01/24",
    },
  ];

  // const handleVisitClick = () => {
  // Increment the currentPage when the user clicks the div
  // setCurrentPage(currentPage + 1);
  //};

  //const [currentPage, setCurrentPage] = useState(currentPage + 1);

  return [
    currentPage === 0 ? (
      <div className="w-full bg-white flex flex-col items-center px-20 py-12 h-auto max-md:px-5">
        <div className="flex w-full items-stretch justify-between gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
          <span className="flex flex-col items-stretch">
            <div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">
              Laboratory Tests
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
          <div className="w-full max-md:max-w-full h-full">
            {lab.map((lab, index) => (
              <button
                key={index}
                className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]"
                onClick={() => {
                  // // Pass the lab state to the UploadLab component
                  // <UploadLab lab={lab} setLabState={setLabState} />;
                  setCurrentPage(currentPage + 1);
                }}
              >
                <div className="flex gap-3.5 font-semibold whitespace-nowrap">
                  <Image
                    alt="image"
                    height={0}
                    width={0}
                    loading="lazy"
                    src={lab.srcmedicine}
                    className="aspect-square fill-black w-[15px]"
                  />
                  <div className="my-auto">{lab.labname}</div>
                </div>
                <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
                  <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
                    Requested on:
                    <div className="grow my-auto">{lab.reqdate}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    ) : currentPage === 1 ? (
      <div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
        <UploadLab />
      </div>
    ) : (
      <></>
    ),
  ];
}
