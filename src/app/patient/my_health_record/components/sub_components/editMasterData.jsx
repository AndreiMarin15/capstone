import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { usePatientInfo } from "@/app/store";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importVitalsAndBiometrics } from "@/backend//patient/vitalsAndBiometrics/vitalsAndBiometrics";
import BackButton from "./BackButton";
import { currentUser, useUserInfo } from "@/app/store";
import { PatientSignUp } from "@/backend//signup/patient_signup";

import { Button } from "@/components/ui/button";

export default function EditMasterData({ mData }) {
  const router = useRouter();
  // const [mData, setmData] = useState([
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?",
  //     variable: "Name",
  //     value: "",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?",
  //     variable: "Age",
  //     value: "",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?",
  //     variable: "Birthday",
  //     value: "",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?",
  //     variable: "Gender",
  //     value: "",
  //   },
  //   {
  //     src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"',
  //     variable: "Address",
  //     value: "",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
  //     variable: "Stroke in the past year",
  //     value: "",
  //   },
  //   {
  //     src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
  //     variable: "Allergies",
  //     value: (
  //       <Button
  //         onClick={() => {
  //           router.push("/patient/my_health_record/allergies");
  //         }}
  //       >
  //         VIEW
  //       </Button>
  //     ),
  //   },
  // ]);

  return (
    <>
      <div className="text-large leading-5 mt-10 text-black font-bold">
        {" "}
        Edit Master Data
      </div>

      <table className="max-w-fit border-spacing-y-7 border-separate">
        {mData?.map((item) => (
          <tr key={item.variable} suppressHydrationWarning>
            <td className="w-5">
              <Image
                alt="picture"
                height={0}
                width={0}
                loading="lazy"
                src={item["src"]}
                className="w-5"
              />
            </td>
            <td className="border-l-[16px] border-transparent">
              <div className="text-black text-sm font-semibold leading-5 self-center my-auto">
                {item["variable"]}
              </div>
            </td>
            <td className="border-l-[5rem] border-transparent">
              {typeof item.value === "string" ||
              typeof item.value === "number" ? (
                <input
                  className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5"
                  defaultValue={item.value}
                />
              ) : (
                <div className="ml-auto">{item["value"]}</div>
              )}
            </td>
          </tr>
        ))}
      </table>

      {/* BACK & SAVE BUTTON */}
      <div className="flex justify-between items-center mt-5">
        <BackButton />
        <div>
          <Button
            onClick={() => {
              createCompactObservation();
            }}
          >
            SAVE
          </Button>
        </div>
      </div>
    </>
  );
}
