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

import { getFinalDiagnosisObservations } from "@/backend//health_records/getObservation";
import { getEncounterByPatientId } from "@/backend//health_records/getEncounter";
import { getPatientRawData } from "@/backend//patient/personal_details/master_data";
import { currentUser } from "@/app/store";
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

export default function Diagnoses() {
  const variables = [
    "Diagnoses",
    "Date of Diagnosis",
    "Doctor",
    "Specialization",
    "Hospital",
  ];
  const [patientData, setPatientData] = React.useState(null);
  const [finalDiagnoses, setFinalDiagnoses] = React.useState([]);
  const [encounters, setEncounters] = React.useState([]);
  const [sortOptionDate, setSortOptionDate] = React.useState("Recent");

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

  const getDateOfDiagnosis = (diagnosisId, patientEncounters) => {
    for (const encounter of patientEncounters) {
      if (encounter.resource.contained.some((item) => item === diagnosisId)) {
        return encounter.resource.period.start;
      }
    }
    return null;
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await getPatientRawData(); // Fetch patient data
        setPatientData(data.id);
        const allFinalDiagnoses = await getFinalDiagnosisObservations(data.id);
        const patientEncounters = await getEncounterByPatientId(data.id);
        setEncounters(patientEncounters);
        updateDiagnoses(allFinalDiagnoses, patientEncounters);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    }

    fetchData();
  }, [patientData]);

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

      <table className="pt-1.5 leading-5 text-black mt-10 max-w-[100%]">
        <thead>
          <tr className="font-medium text-left">
            {variables?.map((variable, index) => (
              <th key={index} className={index === 0 ? "" : ""}>
                <span className="text-sm">{variable}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Empty row for spacing */}
          <tr>
            <td colSpan={variables.length} className="h-8"></td>
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
    </>
  );
}
