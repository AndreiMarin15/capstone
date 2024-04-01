import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { usePatientInfo } from "@/app/store";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importVitalsAndBiometrics } from "../../../../../../lib/backend/patient/vitalsAndBiometrics/vitalsAndBiometrics";
import BackButton from "./BackButton";
import { currentUser, useUserInfo } from "@/app/store";
import { PatientSignUp } from "../../../../../../lib/backend/signup/patient_signup";

import { getMasterData } from "../../../../../../lib/backend/patient/personal_details/master_data";
export default function EditFamilyHistory() {
  const [fHistory, setFHistory] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "First Name",
      value: "Juana",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Last Name",
      value: "Dela Cruz",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
      variable: "Relationship",
      value: "Mother",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Condition",
      value: "Hypertension",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Date",
      value: "1990",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Outcome",
      value: "Chronic",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Procedure/s",
      value: "None",
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const masterData = await getMasterData();

        // Create a new array with updated values
        const updatedData = mData.map((item) => {
          switch (item.variable) {
            case "Name":
              return { ...item, value: masterData["name"] };
            case "Age":
              return { ...item, value: masterData["age"] };
            case "Birthday":
              return { ...item, value: masterData["birthday"] };
            case "Gender":
              return { ...item, value: masterData["gender"] };
            case "Address":
              return { ...item, value: masterData["address"] };
            case "Stroke in the past year":
              return {
                ...item,
                value:
                  masterData["stroke_in_the_past_year"] === "true"
                    ? "Yes"
                    : "No",
              };
            default:
              return item;
          }
        });

        // Set the state with the new array
        setmData(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        FAMILY HISTORY
      </div>

      <table className="max-w-fit border-spacing-y-7 border-separate">
        {fHistory.map((item) => (
          <tr key={item.variable}>
            <td className="w-5">
              <Image
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src={item.src}
                className="w-5"
              />
            </td>
            <td className="border-l-[16px] border-transparent">
              <div className="text-black text-xs font-semibold leading-5 self-center my-auto">
                {item.variable}
              </div>
            </td>
            <td className="border-l-[5rem] border-transparent">
              <input className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5" />
            </td>
          </tr>
        ))}
      </table>

      {/* BACK & SAVE BUTTON */}
      <div className="flex justify-between items-center mt-5">
        <BackButton />
        <div>
          <button
            onClick={() => {
              createCompactObservation();
            }}
            className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
          >
            SAVE
          </button>
        </div>
      </div>
    </>
  );
}
