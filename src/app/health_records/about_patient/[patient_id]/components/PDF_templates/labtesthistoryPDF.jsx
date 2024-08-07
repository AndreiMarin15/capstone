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
import { useEffect, useState } from "react";
import { getLabTests } from "@/backend/pdfBackend/getPDFData";
import { currentUser } from "@/app/store";

export function LabTestHistoryPDF({ patientId, patientData }) {
  const [labtesthistory, setLabTestHistory] = useState([
    // {
    // 	number: "1",
    // 	name: "HB1AC", // resource.codeText
    // 	date: "2024-04-21",
    // 	valid: "2024-04-28",
    // 	values: "FBS = 90 mg/dL, PPBS =  140 mg/dL",
    // },
    // {
    // 	number: "2",
    // 	name: "HB1AC",
    // 	date: "2024-05-21",
    // 	valid: "2024-05-28",
    // 	values: "FBS = 90 mg/dL, PPBS =  140 mg/dL",
    // },
  ]);
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
  useEffect(() => {
    const fetchData = async () => {
      const labTests = await getLabTests(patientId);
      console.log(labTests);
      const labTestHistory = labTests.map((test, index) => {
        return {
          number: index + 1,
          name: test.resource.codeText,
          date: test.resource.uploadedDateTime,
          valid: test.resource.effectiveDateTime,
          values: test.resource.valueQuantity.valueQuantities
            .map((value) => `${value.display} = ${value.value}${value.unit}`)
            .join(", "),
        };
      });
      setLabTestHistory(labTestHistory);
    };
    fetchData();
  }, []);

  const pdfRef = useRef();
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

    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
        pdf.addImage(imgData, "PNG", 0, 0, width, height);
        pdf.save(`Lab Tests.pdf`);
      })
      .finally(() => {
        // Add the 'hidden' class back after the PDF has been downloaded
        input.classList.add("hidden");
      });
  };
  return (
    <div className="flex items-center justify-center text-center m-2">
      <Button onClick={downloadPDF}>Download</Button>
      <div
        ref={pdfRef}
        className="hidden z-[-10] absolute"
        style={{ left: "-5000px" }}
      >
        {" "}
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          {patientData?.personal_information?.first_name}{" "}
          {patientData?.personal_information?.last_name}
        </div>
        <div className="text-black text-center text-base  leading-5 max-md:ml-1 max-md:mt-10 mb-10">
          Lab Test History
        </div>
        <div className="flex mt-4 px-16 w-full text-sm max-md:flex-wrap max-md:max-w-full">
          <Table className="mb-5 pb-5">
            {/* To change to button */}
            {/* <TableCaption>Page 1 of 2</TableCaption> */}
            <TableCaption>
              <div className="flex items-center text-center">
                Generated by {currentUser.getState().user.first_name}{" "}
                {currentUser.getState().user.last_name} through EndoTracker on{" "}
                {getCurrentDateFormatted()}
              </div>
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Number</TableHead>
                <TableHead>Lab Test Name</TableHead>
                <TableHead>Date Taken</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Values</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {labtesthistory?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.valid}</TableCell>
                  <TableCell>{item.values}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
