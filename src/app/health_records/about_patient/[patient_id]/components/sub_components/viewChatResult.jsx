import Image from "next/image";
import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import VisitLabtests from "./visitLabTests";
import BackButton from "./BackButton";
import { currentUser } from "@/app/store";
import { importCarePlan } from "@/backend/patient/careplan/careplan";
import { Button } from "@/components/ui/button";
import { getAttendingDoctors } from "@/backend/attending_doctors/attending_doctors";

export default function ViewChatResult({
  setCurrentScreen,
  patientData,
  patientId,
}) {
  const chatMap = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd7ef48fec0b27406add8f68cfc5040179fb9ef40f086b20214ad05498e6b6b9?",
      variable: "Doctor",
      value: "Dr. Johnny Santos - Cardiologist",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd7ef48fec0b27406add8f68cfc5040179fb9ef40f086b20214ad05498e6b6b9?",
      variable: "Description",
      value:
        "Remind patient not to take so much artificial sweeteners. Even though good for diabetic patients, it may have adverse effect on heart health. ",
    },
  ];
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-10 max-md:ml-1 max-md:mt-10">
        COLLABORATION THROUGH CHAT RESULTS
      </div>

      {chatMap?.map((item, index) => (
        <tr key={index} className="flex gap-5 justify-between mb-3 w-full">
          <td className="flex gap-2 my-auto font-semibold text-xs text-black">
            <Image
              alt="image"
              height={0}
              width={0}
              loading="lazy"
              src={item.src}
              className="aspect-square fill-black w-[15px]"
            />
            <div className="flex-auto my-auto">{item.variable}</div>
          </td>
          <td>
            {item.variable === "Start Date" || item.variable === "End Date" ? (
              <input
                type="date"
                className="grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px]  max-md:pr-5 w-[205px]"
                //   value={
                //     item.variable === "Start Date"
                //       ? startDate
                //       : endDate
                //   }
                //   onChange={(e) => {
                //     item.variable === "Start Date"
                //       ? setStartDate(e.target.value)
                //       : setEndDate(e.target.value);
                //   }}
              />
            ) : (
              ""
            )}
          </td>
        </tr>
      ))}
      <div className="flex justify-between items-center mt-5">
        <div className="flex items-start justify-between mt-5">
          <Button variant="outline" onClick={setCurrentScreen}>
            <div className="flex gap-0.5 justify-between items-center">
              <Image
                height={0}
                width={0}
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
                className="w-3 h-3 aspect-square"
                alt="Back Arrow"
              />
              <div className="text-xs">BACK</div>
            </div>
          </Button>
        </div>
        <div>
          <Button
          // onClick={() => {
          //   Should be directed to add care plan page
          // }}
          >
            CREATE CARE PLAN
          </Button>
        </div>
      </div>
    </>
  );
}
