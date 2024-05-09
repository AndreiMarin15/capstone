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

const masterdata = [
  {
    name: "Juan Dela Cruz", // patient table: name (string)
    age: "74", // auto gen in fhir using patient table: birthdate (date)
    birthday: "January 01, 1950", //patient table: birthdate (date)
    gender: "Male", //patient table: gender (string)
    address: "1 Pasay Rd. Pasay City, Metro Manila", // patient table: address (string)
    contact: "0999 999 9999", // hindi pa sinesave sa tables sa supabase
    stroke: "Yes", // hindi pa sinesave sa tables sa supabase
    allergies: "Pennicilin | Effect: Headache", // allegyintolerance table: type & reaction (string)
    attendingDoctor: "Dr. Maria Johnson", // hindi pa sinesave sa tables sa supabase
  },
];
export function MasterDataPDF() {
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
        pdf.save(`Master Data.pdf`);
      })
      .finally(() => {
        // Add the 'hidden' class back after the PDF has been downloaded
        input.classList.add("hidden");
      });
  };
  return (
    <div className="flex items-center justify-center text-center m-2">
      <Button onClick={downloadPDF}>Download Master Data</Button>
      <div
        ref={pdfRef}
        className="hidden z-[-10] absolute p-5 m-5"
        style={{ left: "-5000px" }}
      >
        {" "}
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base leading-5 max-md:ml-1 max-md:mt-10 mb-10">
          Master Data
        </div>
        <Table className="mb-5 pb-5">
          <TableCaption>
            Generated by John Doe through EndoTracker on April 30, 2024
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Stroke</TableHead>
              <TableHead>Allergies</TableHead>
              <TableHead>Attending Doctor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {masterdata.map((masterdata) => (
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
