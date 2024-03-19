"use client";
import React, { useState } from "react"; // <-- Import useState from React
import Image from "next/image";
import UploadLab from "./components/uploadLab";
import AddLab from "./components/addLab";

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
        <span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
          <span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
            <div className="text-black text-xl text-base font-semibold leading-6 my-auto">
              Lab Tests
            </div>
            <div className="self-stretch flex items-stretch justify-between gap-2.5">
              <button className="flex gap-1 px-5 py-2 text-xs rounded-md border border-black border-solid">
                <Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
                  width="100"
                  height="100"
                  className="shrink-0 w-3 aspect-[0.85]"
                />
                <div className="self-start">FILTER</div>
              </button>
              <button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
                SORT
              </button>
            </div>
          </span>
        </span>

        <button
          className="flex gap-1.5 justify-center self-end px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
          onClick={() => {
            // // Pass the lab state to the UploadLab component
            // <UploadLab lab={lab} setLabState={setLabState} />;
            setCurrentPage(currentPage + 1);
          }}
        >
          Add
        </button>
        <div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
          <div className="w-full max-md:max-w-full h-full">
            {lab.map((lab, index) => (
              <button
                key={index}
                className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]"
                onClick={() => {
                  // // Pass the lab state to the UploadLab component
                  // <UploadLab lab={lab} setLabState={setLabState} />;
                  setCurrentPage(currentPage + 2);
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
        <AddLab />
      </div>
    ) : currentPage === 2 ? (
      <div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
        <UploadLab />
      </div>
    ) : (
      <></>
    ),
  ];
}
