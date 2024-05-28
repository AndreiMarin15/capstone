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

const clinicvisitlist = [
  {
    number: "1",
    date: "2024-04-21",
    signsandsymptoms: "Increased thirst and hunger",
    ros: "Fatigue, muscle pain",
    otherconcerns: "Dizziness with new medicine",
  },
  {
    number: "2",
    date: "2024-06-16",
    signsandsymptoms: "Lower extremities pain",
    ros: "Muscle pain",
    otherconcerns: "Wounds not getting better",
  },
];

export function ClinicVisitsPDF() {
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
        pdf.save(`Clinic Visits.pdf`);
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
        <div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
          JUAN DELA CRUZ
        </div>
        <div className="text-black text-center text-base  leading-5 max-md:ml-1 max-md:mt-10 mb-10">
          Clinic Visits
        </div>
        <div className="flex mt-4 px-5 w-full text-xs max-md:flex-wrap max-md:max-w-full">
          <Table className="mb-5 pb-5">
            {/* To change to button */}
            {/* <TableCaption>Page 1 of 2</TableCaption> */}
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Signs and Symptoms</TableHead>
                <TableHead>Review of Systems</TableHead>
                <TableHead>Other Concerns</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clinicvisitlist?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.number}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.signsandsymptoms}</TableCell>
                  <TableCell>{item.ros}</TableCell>
                  <TableCell>{item.otherconcerns}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
