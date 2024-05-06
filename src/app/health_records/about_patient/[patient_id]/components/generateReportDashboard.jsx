"use client";
import React, { useState } from "react";
import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function GenerateRecords() {
  const [date, setDate] = useState();

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
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 mb-10">
        GENERATE RECORDS
      </div>
      <Checkbox checked={isCheckboxChecked} onClick={handleCheckboxChange}>
        Generate All Records
      </Checkbox>

      <div className="text-xs">
        <div className="flex gap-5 mb-12 w-full">
          {dates.map((item, index) => (
            <div key={index} className="flex gap-2 my-auto text-black">
              <Image
                alt="image"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="aspect-square fill-black w-[15px]"
              />
              <div className="flex-auto my-auto">{item.variable}</div>
              {item.variable === "Start Date" ||
              item.variable === "End Date" ? (
                <input
                  type="date"
                  className="grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[205px]"
                  value={
                    item.variable === "Start Date" ? validityStart : validityEnd
                  }
                  disabled={isCheckboxChecked}
                  onChange={(e) => {
                    const { value } = e.target;
                    if (item.variable === "Start Date") {
                      setValidityStart(value);
                    } else if (item.variable === "End Date") {
                      setValidityEnd(value);
                    }
                  }}
                />
              ) : (
                <input
                  className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
                  value={item.value}
                />
              )}
            </div>
          ))}
        </div>
        <Checkbox> Select All </Checkbox>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Checkbox>Master Data</Checkbox>
            <Checkbox>Family & Social History</Checkbox>
          </div>
          <div className="flex flex-col">
            <Checkbox>Medical History</Checkbox>
            <Checkbox>Medication History</Checkbox>
          </div>
          <div className="flex flex-col">
            <Checkbox>Lab Test History</Checkbox>
            <Checkbox>List of Care Plans</Checkbox>
          </div>
          <div className="flex flex-col">
            <Checkbox>Referral History</Checkbox>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Button>Generate</Button>
        </div>
      </div>
    </>
  );
}
