"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "next/link"; // Import Link component
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  getOverduePatients,
  getPatientAndFinalDiagnosis,
  remindPatients,
} from "@/backend/reports/getReportsData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

export default function FollowUpList() {
  const router = useRouter(); // Initialize useRouter
  const pdfRef = useRef();
  const [overduePatients, setOverduePatients] = useState([]);
  const [patientsDiagnosis, setPatientsDiagnosis] = useState([]);
  const [patientInfo, setPatientInfo] = useState([]);

  const downloadPDF = () => {
    const input = pdfRef.current;

    // Remove the 'hidden' class
    input.classList.remove("hidden");

    const width = input.offsetWidth;
    const height = input.offsetHeight;
    let computedWidth = width;
    let computedHeight = height;
    console.log(width, height);
    if (width < 1920 / 2) {
      computedWidth = 1920 / 2;
      // computedHeight = computedWidth / 2;
    }
    if (height < 1080 / 2) {
      computedHeight = 1080 / 2;
      // computedWidth = computedHeight * 2;
    }

    console.log(computedWidth, computedHeight);
    const date = new Date().toLocaleDateString();
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`follow_up_list_${date}.pdf`);
      })
      .finally(() => {
        // Add the 'hidden' class back after the PDF has been downloaded
        // input.classList.add("hidden");
      });
  };
  useEffect(() => {
    const fetchOverduePatients = async () => {
      const overduePatients = await getOverduePatients();
      console.log(overduePatients);
      setOverduePatients(overduePatients);
    };
    fetchOverduePatients();
  }, []);

  useEffect(() => {
    const fetchPatientsDiagnoses = async () => {
      const diagnosesPromises = overduePatients.map((overduePatient) =>
        getPatientAndFinalDiagnosis(
          overduePatient?.resource?.subject?.reference
        ).then((patientsDiagnosis) => ({
          patient: patientsDiagnosis.patient[0].personal_information,
          diagnosis: patientsDiagnosis.diagnosis[0],
          visit: overduePatient,
        }))
      );

      const patientsDiagnoses = await Promise.all(diagnosesPromises);
      console.log(patientsDiagnoses);
      setPatientsDiagnosis(patientsDiagnoses);
    };

    fetchPatientsDiagnoses();
  }, [overduePatients]);

  useEffect(() => {
    console.log("PATIENTS DIAGNOSIS", patientsDiagnosis);
    setPatientInfo(
      patientsDiagnosis.map((patientDiagnoses) => {
        console.log(patientDiagnoses.diagnosis?.resource?.subject?.reference);
        return {
          name:
            patientDiagnoses.patient?.first_name +
            " " +
            patientDiagnoses.patient?.last_name,
          diagnosis: patientDiagnoses.diagnosis?.resource?.valueString,
          currentDate: new Date().toLocaleDateString(),
          supposedClinicVisit: new Date(
            patientDiagnoses.visit?.resource?.valueString
          ).toLocaleDateString(),
          dateLastClinicVisit: new Date(
            patientDiagnoses.visit?.ts
          ).toLocaleDateString(),
          id: patientDiagnoses.diagnosis?.resource?.subject?.reference,
        };
      })
    );
  }, [patientsDiagnosis]);

  useEffect(() => {
    console.log("DATA", patientInfo);
  }, [patientInfo]);

  return (
    <div
      className="bg-white h-screen flex"
      style={{ overflowY: "scroll", maxHeight: "100vh" }}
    >
      <div
        ref={pdfRef}
        className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full"
      >
        <div className="text-xl font-semibold text-black max-md:max-w-full">
          Reports
        </div>
        <div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
        <div className="flex justify-between gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
            LATE FOR FOLLOW-UP PATIENT LIST
          </div>
          <div className="flex mt-8">
            <div className="text-sm text-blue-500 max-md:max-w-full">
              <Button
                variant="remind"
                onClick={() => {
                  downloadPDF();
                }}
              >
                ↓ Download (.pdf)
              </Button>
            </div>
            <Button
              onClick={() => {
                patientInfo?.forEach(async (item) => {
                  await remindPatients([item.id], {
                    reminder: "Please remember to visit the clinic",
                    supposed_visit: item.supposedClinicVisit,
                    last_visit: item.dateLastClinicVisit,
                    reminded_by: `${currentUser.getState().user.license_id}`,
                  });
                });
                toast.success("Patients have been reminded");
              }}
              variant="remind"
            >
              Remind All Patients
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
          <div className="mt-4 ml-4 text-base font-semibold text-black max-md:max-w-full">
            Date Generated: {new Date().toLocaleDateString()}
            <br />
            Generated by: {currentUser.getState().user.first_name}{" "}
            {currentUser.getState().user.last_name}
          </div>

          <Button variant="sortfilter">SORT</Button>
        </div>
        <div className="w-full flex justify-center items-center"></div>

        <div className="flex mt-4 w-full text-sm max-md:flex-wrap max-md:max-w-full">
          <Table>
            {/* To change to button */}
            <TableHeader>
              <TableRow>
                <TableHead className="w-[15%]">Patient Name</TableHead>
                <TableHead className="w-[20%]">Diagnosis</TableHead>
                <TableHead className="w-[10%]">Current Date</TableHead>
                <TableHead className="w-[15%]">
                  Supposed Clinic Visit Date
                </TableHead>
                <TableHead className="w-[20%]">
                  Last Clinic Visit Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patientInfo?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.diagnosis}</TableCell>
                  <TableCell>{item.currentDate}</TableCell>
                  <TableCell className="text-left">
                    {item.supposedClinicVisit}
                  </TableCell>
                  <TableCell className="text-left">
                    {item.dateLastClinicVisit}
                  </TableCell>
                  {/* <TableCell className="w-[20%] flex items-center">
                    <Image
                      height={0}
                      width={0}
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d444f20d4efa5f9fb61dafd0b81fd307ed9a7d30376ad82dce2c7f67e398a0b?"
                      className="w-5 h-3"
                      alt="Remind Patient"
                    />
                    <Button
                      onClick={() => {
                        remindPatients([item.id], {
                          reminder: "Please remember to visit the clinic",
                          supposed_visit: item.supposedClinicVisit,
                          last_visit: item.dateLastClinicVisit,
                          reminded_by: `${
                            currentUser.getState().user.license_id
                          }`,
                        });
                        toast.success("Patient has been reminded");
                      }}
                      variant="remind"
                    >
                      Remind Patient
                    </Button>
                  </TableCell> */}
                  {/* <TableCell>
                    <Button
                      onClick={() => {
                        router.push(`/messages`);
                      }}
                      variant="outline"
                    >
                      Message
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="text-base text-sky-900 mt-8">
          <Button
            variant="back"
            onClick={() => {
              router.back();
            }}
          >
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
}
