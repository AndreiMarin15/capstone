import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import * as React from "react";
import AddAllergies from "./addAllergies";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const rowdata = ({
  allergen,
  comments,
  reactions,
  date_of_onset,
  severity_of_allergy,
}) => {
  return (
    <tr>
      <td>{allergen}</td>
      <td>{reactions} </td>
      <td>{severity_of_allergy || "mild"}</td>
      <td>{date_of_onset || "mm-dd-yyy"}</td>
      <td>{comments || "N/A"}</td>
    </tr>
  );
};

export default function EnvAllergies({ handleAdd, allergy, patientId }) {
  const [currentScreen, setCurrentScreen] = useState(0);
  const router = useRouter();
  const header = [
    "Environment Allergy",
    "Reactions",
    "Severity",
    "Onset Date",
    "Comments",
  ];
  const handleSave = async () => {
    setCurrentScreen(0);
    // Here you can fetch the updated data or do any other necessary operations
    // For example, refetching allergy data
    // const updatedAllergyData = await fetchAllergyData();
    // setAllergy(updatedAllergyData);
  };

  if (currentScreen === 0) {
    return (
      <>
        <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
          ENVIRONMENTAL ALLERGIES
        </div>

        <table className="pt-1.5 text-sm leading-5 text-black mt-5 max-w-[914px]">
          <thead>
            <tr className="font-medium text-left">
              {header?.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
              <th>
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentScreen(5);
                  }}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {allergy &&
              allergy?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    {rowdata({ ...item })}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>

        {/* BACK BUTTON */}
        <div className="w-full flex justify-between max-md:max-w-full mt-10 max-md:px-5">
          <Button
            variant="outline"
            onClick={() => {
              router.push(`/health_records/about_patient/${patientId}`);
            }}
          >
            <div className="flex gap-0.5 justify-between items-center">
              <div className="text-sm"> ← BACK</div>
            </div>
          </Button>
        </div>
      </>
    );
  } else if (currentScreen === 5) {
    // Render your AddAllergies component or whatever you intended for currentScreen === 1
    // Make sure to pass necessary props
    return (
      <AddAllergies
        patientId={patientId}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }
}
