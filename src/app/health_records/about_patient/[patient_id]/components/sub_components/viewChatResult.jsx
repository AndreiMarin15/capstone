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
import getCollaborationByPatientId from "@/backend/referral/getCollaboration"

export default function ViewChatResult({
  setCurrentScreen,
  patientData,
  patientId,
  isAdd,
  setAdd,
}) {
  // const chatMap = [
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd7ef48fec0b27406add8f68cfc5040179fb9ef40f086b20214ad05498e6b6b9?",
  //     variable: "Doctor",
  //     value: "Dr. Johnny Santos - Cardiologist",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cd7ef48fec0b27406add8f68cfc5040179fb9ef40f086b20214ad05498e6b6b9?",
  //     variable: "Description",
  //     value:
  //       "Remind patient not to take so much artificial sweeteners. Even though good for diabetic patients, it may have adverse effect on heart health. ",
  //   },
  // ];

  const [collaborationData, setCollaborationData] = useState([]);

  useEffect(() => {
    // Fetch collaboration data when component mounts
    const fetchCollaborationData = async () => {
      try {
        const data = await getCollaborationByPatientId(patientId);
        setCollaborationData(data);
      } catch (error) {
        console.error("Error fetching collaboration data:", error);
      }
    };

    fetchCollaborationData();
  }, [patientId]);

  console.log(collaborationData)


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0];
  };

  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-10 max-md:ml-1 max-md:mt-10">
        COLLABORATION THROUGH CHAT RESULTS
      </div>

      {collaborationData.slice().reverse().map((item, index) => (
        <div key={index} className="flex gap-5 justify-between mb-8 w-full">
          <tr>
          <div>
          <td className="flex gap-2 my-auto font-semibold text-xs text-black">
            <Image
              alt="image"
              height={0}
              width={0}
              loading="lazy"
              src={"https://cdn.builder.io/api/v1/image/assets/TEMP/cd7ef48fec0b27406add8f68cfc5040179fb9ef40f086b20214ad05498e6b6b9?"}
              className="aspect-square fill-black w-[15px]"
            />
            <div className="flex-auto my-auto">Dr. {item.doctor}  -  {item.specialty}</div>
          
            
          </td>
          </div>

            <div className="flex-auto my-auto ml-6 font-semibold text-xs text-black"> {formatDate(item.created_at)}</div>
            <div className="flex-auto my-auto ml-6 mt-3 text-xs text-black overflow-hidden overflow-ellipsis">
            {item.note}
          </div>
          </tr>
          
        </div>
        
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
          onClick={() => {
            setAdd(true)
          }}
          >
            CREATE CARE PLAN
          </Button>
        </div>
      </div>
    </>
  );
}
