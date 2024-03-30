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
export default function EditSocialHistory() {
  const patientStore = usePatientInfo();
  const disabledInputStyle = {
    backgroundColor: "#ccc",
    color: "#666",
    cursor: "not-allowed",
  };

  const [sHistory, setSHistory] = useState([
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a91cfdd5846dc05e44380ed44e3b06466dab42e135dd9885eea2acdccfe9fee?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Smoking Status",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/65c9a72e3a94e2c92d81578df365997bc45a028f61ee1fba03762a4052e6f394?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Cigarettes Per Day",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b841c62f42d2c5d465163f55b524edf4dd643301dbe4fa2bcc0572263ffee5e1?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Alcohol",
      value: "-",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/272bfa12e1a92d2fff81cf645845a86243b21061b37393b3575f26e5a12a9821?apiKey=66e07193974a40e683930e95115a1cfd&",
      variable: "Physical Activities",
      value: "-",
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
      <div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
        {" "}
        SOCIAL HISTORY
      </div>

      <table className="max-w-fit border-spacing-y-7 border-separate">
        {sHistory.map((item) => (
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
              {item.variable === "Smoking Status" ? (
                <select
                  onChange={(e) => {
                    patientStore.setSmokerStatus(e.target.value);
                  }}
                  value={patientStore.social_history.smoker_status}
                  className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                >
                  <option value="">Select</option>
                  <option value="Smoker">Smoker</option>
                  <option value="Non-Smoker">Not a Smoker</option>
                </select>
              ) : item.variable === "Cigarettes Per Day" ? (
                <input
                  onChange={(e) => {
                    patientStore.setCigarettesPerDay(parseInt(e.target.value));
                  }}
                  value={patientStore.social_history.cigarettes_per_day}
                  type="number"
                  className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch mt-[10px] px-2 py-2.5 border-[0.5px] border-solid border-black"
                  style={
                    patientStore.social_history.smoker_status === "Non-Smoker"
                      ? disabledInputStyle
                      : {}
                  }
                  disabled={
                    patientStore.social_history.smoker_status === "Non-Smoker"
                  }
                />
              ) : (
                <input className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5" />
              )}
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
