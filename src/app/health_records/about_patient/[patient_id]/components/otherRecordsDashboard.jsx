"use client";
import React, { useState } from "react";
import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import AddRecord from "./sub_components/addRecord";

export default function OtherRecords() {
  const [date, setDate] = useState();
  const [currentScreen, setCurrentScreen] = useState(0);
  const handleRecordClick = () => {
    // Set currentScreen to the desired value when a medication item is clicked
    setCurrentScreen(1); // Assuming the desired value for the second screen is 1
    console.log("current Screen:", currentScreen);
  };

  const dates = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Start Date",
      value: "",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "End Date",
      value: "",
    },
  ];

  const [validityStart, setValidityStart] = useState();
  const [validityEnd, setValidityEnd] = useState();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <>
      {currentScreen === 0 && (
        <>
          <div className="flex gap-3 text-black text-base justify-between items-center leading-5 mt-8 max-md:ml-1 max-md:mt-10 mb-10">
            <span className="inline-block  font-bold  align-middle">
              UPLOADED RECORDS
            </span>
            <div className="flex gap-2 justify-end">
              <span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] max-w-[50%]  border-solid border-black">
                <Image
                  alt="picture"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
                  className="aspect-square ml-2 object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
                />
                <div
                  className="text-stone-300 text-xs leading-5 my-auto"
                  style={{ paddingRight: "300px" }}
                >
                  SEARCH
                </div>
              </span>
              <span className="flex items-center gap-1 px-1 py-1  rounded-md border-[0.5px] border-solid border-black font-normal mr-2">
                <Image
                  alt="picture"
                  height={0}
                  width={0}
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/872489d37c6f07090c71fb194a8c077334f5ee8d7e865b4e470f49f5a27b95ba?apiKey=66e07193974a40e683930e95115a1cfd&"
                  className="aspect-[0.86] object-contain object-center w-3 overflow-hidden"
                />
                <div className="text-black text-xs leading-5 self-center whitespace-nowrap">
                  FILTER
                </div>
              </span>

              <DropdownMenu>
                <DropdownMenuTrigger asChild></DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sort By Date</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup>
                    <DropdownMenuRadioItem value="Recent">
                      Sort by Most Recent
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Oldest">
                      Sort By Oldest
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Button className="self-end max-w-[20%]" variant="outline">
            Add Record
          </Button>
          <button
            onClick={handleRecordClick}
            className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[100%]"
          >
            <div className="flex gap-3.5 justify-between font-semibold whitespace-nowrap">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
                className="aspect-square fill-black w-[15px]"
              />
              <div className="my-auto">
                Referral Note from Dr. Kayla Atienza
              </div>
              {/* <div className="ml-96 font-normal text-gray-400 my-auto">
                Last opened: 1 min ago
      </div> */}
            </div>
            {/* <div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 w-[100%]">
      <div className="flex gap-1 justify-between font-medium whitespace-nowrap">
        <Image
          alt="image"
          height={0}
          width={0}
          loading="lazy"
          src={labTest.srcdoctor}
          className="aspect-square fill-black w-[15px]"
        />
        <div className="grow my-auto">{labTest.doctor}</div>
      </div>
      <div
        className="flex-auto my-auto"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <span style={{ fontWeight: "bold" }}>Date Requested:</span>{" "}
          {labTest.reqdate}
        </div>
        {labTest.status === "final" && (
          <div style={{ marginLeft: "8px" }}>
            <span style={{ fontWeight: "bold" }}>Date Uploaded:</span>{" "}
            {labTest.update}
          </div>
        )}
      </div>
      {labTest.status === "requested" && (
        <div className="text-black text-xs font-medium leading-5 flex items-center">
          <svg
            className="h-3 w-3 ml-1 text-red-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="5" />
          </svg>
          Requested
        </div>
      )}
      {labTest.status === "final" && (
        <div className="text-black text-xs font-medium leading-5 flex items-center">
          <svg
            className="h-3 w-3 ml-1 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="5" />
          </svg>
          Uploaded
        </div>
      )}
      <div className="text-xs text-blue-500 leading-5 flex ml-5 items-center">
        <button>Download (.pdf)</button>
      </div>
    </div> */}
          </button>
        </>
      )}

      {currentScreen === 1 && (
        // <VisitLabTests
        //   currentScreen={currentScreen}
        //   setCurrentScreen={setCurrentScreen}
        //   observationId={selectedObservationId}
        // />
        <AddRecord
          currentScreen={currentScreen}
          setCurrentScreen={setCurrentScreen}
        />
      )}
    </>
  );
}
