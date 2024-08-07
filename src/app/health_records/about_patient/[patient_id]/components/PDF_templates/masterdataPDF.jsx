// ./src/app/health_records/about_patient/[patient_id]/components/generateRecordsDashboard.jsx
"use client";
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
// import { getPatientData } from "@/backend/pdfBackend/getPatientData";
import { useEffect, useState } from "react";
import { currentUser } from "@/app/store";
import { getAttendingDoctors } from "@/backend/attending_doctors/attending_doctors";

export function MasterDataPDF({ patientId, patientData }) {
  const [attendingDoctors, setAttendingDoctors] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const val = await getAttendingDoctors(patientId);
        console.log("ATTENDINGVAL", val);
        const doctorNames = val.map((doctor) => `${doctor.doctor_first_name} ${doctor.doctor_last_name}`).join(", ");
        console.log("ATTENDING", doctorNames);
        setAttendingDoctors(doctorNames);
        return val;
      } catch (error) {
        console.error("Error fetching attending doctors:", error);
      }
    };

    fetchData();
  }, []); // Assuming patientId is a dependency that triggers the effect
  function getAge(birthdate) {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  const masterdata = [
    {
      name:
        patientData?.personal_information?.first_name +
        " " +
        patientData?.personal_information?.last_name, // patient table: name (string)
      age: getAge(patientData?.personal_information?.birthdate), // auto gen in fhir using patient table: birthdate (date)
      birthday: patientData?.personal_information?.birthdate, //patient table: birthdate (date)
      gender: patientData?.personal_information?.gender, //patient table: gender (string)
      address:
        patientData?.personal_information?.street_address +
        " " +
        patientData?.personal_information?.city, // patient table: address (string)
      contact: patientData?.personal_information?.contact_number, // hindi pa sinesave sa tables sa supabase
      stroke: patientData?.medical_history?.stroke?.toString(), // hindi pa sinesave sa tables sa supabase
      allergies:
        patientData?.allergies?.length > 0
          ? patientData?.allergies.map((obj) => obj.allergen).join(", ")
          : "None", // allegyintolerance table: type & reaction (string)
      attendingDoctor: attendingDoctors, // hindi pa sinesave sa tables sa supabase
    },
  ];
  const pdfRef = useRef();
  useEffect(() => {
    console.log(patientData);
  }, []);

  const downloadPDF = () => {
    const input = pdfRef.current;

    // Remove the 'hidden' class
    input.classList.remove("hidden");

    const width = input.offsetWidth;
    const height = input.offsetHeight;
    let computedWidth = width;
    let computedHeight = height;
    console.log(patientId);
    if (width < 1920 / 2) {
      computedWidth = 1920 / 2;
      // computedHeight = computedWidth / 2;
    }
    if (height < 1080 / 2) {
      computedHeight = 1080 / 2;
      // computedWidth = computedHeight * 2;
    }

    console.log(computedWidth, computedHeight);

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`Master Data.pdf`);
      })
      .finally(() => {
        // Add the 'hidden' class back after the PDF has been downloaded
        input.classList.add("hidden");
      });
  };
  function getCurrentDateFormatted() {
    const date = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  }
  return (
    <div className="flex items-center justify-center text-center m-2">
      <Button onClick={downloadPDF}>Download</Button>
      <div
        ref={pdfRef}
        className="hidden z-[-10] absolute p-5 m-5"
        style={{ left: "-5000px" }}
      >
        {" "}
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          {patientData?.personal_information?.first_name +
            " " +
            patientData?.personal_information?.last_name}
        </div>
        <div className="text-black text-center text-base leading-5 max-md:ml-1 max-md:mt-10 mb-10">
          Master Data
        </div>
        <Table className="mb-5 pb-5">
          <TableCaption>
            <div className="flex items-center text-center">
              Generated by {currentUser.getState().user.first_name}{" "}
              {currentUser.getState().user.last_name} through EndoTracker on{" "}
              {getCurrentDateFormatted()}
            </div>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Had Stroke</TableHead>
              <TableHead>Allergies</TableHead>
              <TableHead>Attending Doctor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {masterdata?.map((masterdata) => (
              <TableRow key={masterdata.name}>
                <TableCell className="font-medium">{masterdata.name}</TableCell>
                <TableCell>{masterdata.age}</TableCell>
                <TableCell>{masterdata.birthday}</TableCell>
                <TableCell>{masterdata.gender}</TableCell>
                <TableCell>{masterdata.address}</TableCell>
                <TableCell>{masterdata.contact}</TableCell>
                <TableCell>{masterdata.stroke}</TableCell>
                <TableCell>{masterdata.allergies}</TableCell>
                <TableCell>{masterdata.attendingDoctor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
