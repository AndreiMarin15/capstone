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
import { useState, useEffect } from "react";
import AddAllergies from "./addAllergies";
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
export default function DrugAllergies({ handleAdd, allergy, patientId }) {
  const router = useRouter();
  const [currentScreen, setCurrentScreen] = useState(0);
  const header = ["Drug", "Reactions", "Severity", "Onset Date", "Comments"];
  if (!allergy) return <p>Still Loading</p>;

  if (currentScreen === 0) {
    return (
      <>
        <div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
          DRUG ALLERGIES
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
                    setCurrentScreen(1);
                  }}
                >
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {allergy?.map((item) => {
              return <>{rowdata({ ...item })}</>;
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
  } else if (currentScreen === 1) {
    return (
      <AddAllergies
        onAdd={handleAdd}
        patientId={patientId}
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />
    );
  }
}
