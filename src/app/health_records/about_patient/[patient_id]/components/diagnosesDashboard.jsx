"use client";
import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import BackButton from "./sub_components/BackButton";
import * as React from "react";
import { getFinalDiagnosisObservations } from "@/backend/health_records/getObservation";
import { getEncounterByPatientId } from "@/backend/health_records/getEncounter";
import {
  getDoctorSpecialization,
  getDoctorHospital,
} from "@/backend/pdfBackend/getPDFData";
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
import { Button } from "@/components/ui/button";

export default function Diagnoses({ patientId }) {
  const variables = [
    "Diagnoses",
    "Date of Diagnosis",
    "Doctor",
    "Specialization",
    "Hospital",
  ];
  const [finalDiagnoses, setFinalDiagnoses] = React.useState([]);
  const [encounters, setEncounters] = React.useState([]);
  const [sortOptionDate, setSortOptionDate] = React.useState("Recent");

  // Function to sort diagnoses based on date of diagnosis
  const sortDiagnosesByDate = (diagnoses, sortOption) => {
    return diagnoses.slice().sort((a, b) => {
      const dateA = new Date(a.dateOfDiagnosis);
      const dateB = new Date(b.dateOfDiagnosis);

      if (sortOption === "Recent") {
        return dateB - dateA; // Sort by most recent
      } else {
        return dateA - dateB; // Sort by oldest
      }
    });
  };

  // Function to get date of diagnosis based on encounter
  const getDateOfDiagnosis = (diagnosisId, patientEncounters) => {
    for (const encounter of patientEncounters) {
      if (encounter.resource.contained.some((item) => item === diagnosisId)) {
        return encounter.resource.period.start;
      }
    }
    return null;
  };

  // Fetch final diagnoses and encounters on initial load
  React.useEffect(() => {
    async function fetchData() {
      try {
        const allFinalDiagnoses =
          await getFinalDiagnosisObservations(patientId);
        const patientEncounters = await getEncounterByPatientId(patientId);
        setEncounters(patientEncounters);
        console.log(patientEncounters);
        console.log(allFinalDiagnoses);
        // After setting encounters, update diagnoses
        updateDiagnoses(allFinalDiagnoses, patientEncounters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [patientId]);

  // Update diagnoses with doctor specialization, hospital, and date of diagnosis
  async function updateDiagnoses(allFinalDiagnoses, patientEncounters) {
    const promises = allFinalDiagnoses.map(async (diagnosis) => {
      const specializationPromise = getDoctorSpecialization(
        diagnosis.resource.participant.license
      );
      const hospitalPromise = getDoctorHospital(
        diagnosis.resource.participant.license
      );

      const [specialization, hospital] = await Promise.all([
        specializationPromise,
        hospitalPromise,
      ]);

      const dateOfDiagnosis = getDateOfDiagnosis(
        diagnosis.id,
        patientEncounters
      );
      console.log(diagnosis.id);
      console.log(dateOfDiagnosis);

      return {
        ...diagnosis,
        specialization: specialization ?? "Endocrinologist",
        hospital: hospital ?? "Philippine General Hospital",
        dateOfDiagnosis,
      };
    });

    const updatedDiagnoses = await Promise.all(promises);
    setFinalDiagnoses(updatedDiagnoses);
  }

  // Handle sorting option change
  const handleDateSort = (option) => {
    setSortOptionDate(option);
  };

  return (
    <>
      <div className="flex justify-between text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
        DIAGNOSES
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <span className="flex items-center gap-1 px-1 py-1 rounded-md">
                <Button variant="sortfilter">SORT</Button>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort By Date</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={sortOptionDate}
                onValueChange={handleDateSort}
              >
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
      <table className="pt-1.5 leading-5 text-black text-sm mt-10 max-w-[100%]">
        <thead>
          <tr className="font-medium text-left text-sm">
            {variables?.map((variable, index) => (
              <th
                key={index}
                style={{
                  // width: "70%",
                  minWidth: "100px",
                  paddingRight: "16px",
                }}
                className=""
              >
                <span className="text-sm">{variable}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={variables.length} className="h-8 text-sm"></td>
          </tr>
          {sortDiagnosesByDate(finalDiagnoses, sortOptionDate)?.map(
            (diagnosis, index) => {
              if (diagnosis.resource.valueString.length > 0) {
                return (
                  <React.Fragment key={index}>
                    {variables?.map((variable, variableIndex) => (
                      <td
                        key={variableIndex}
                        className={`${
                          variableIndex === 0 ? "font-normal" : "mt-4 mb-4"
                        }`}
                      >
                        <span
                          className={`text-sm ${
                            variable === "Diagnoses" ? "font-regular" : ""
                          }`}
                        >
                          {variable === "Diagnoses"
                            ? diagnosis.resource.valueString
                            : variable === "Date of Diagnosis"
                              ? diagnosis.dateOfDiagnosis
                              : variable === "Doctor"
                                ? diagnosis.resource.participant.actor
                                : variable === "Specialization"
                                  ? diagnosis.specialization ?? ""
                                  : variable === "Hospital"
                                    ? diagnosis.hospital ?? ""
                                    : ""}
                        </span>
                      </td>
                    ))}
                    {index < finalDiagnoses.length - 1 && (
                      <tr key={`gap-${index}`}>
                        <td
                          colSpan={variables.length}
                          className="border-t border-transparent h-4"
                        />
                      </tr>
                    )}
                  </React.Fragment>
                );
              } else {
                return "";
              }
            }
          )}
        </tbody>
      </table>

      <BackButton />
    </>
  );
}
