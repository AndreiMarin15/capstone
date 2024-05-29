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
const medicalhistory = [
	{
		number: "1", // wala sa fhir pang count lang ng rows (number)
		diagnosis: "Type 2 Diabetes", // observation table: id-diagnosis (string)
		date: "2020-01-24", // observation table: date (date)
		provider: "Dr. Harold Chiu", // observation table: actor (string)
		specialization: "Endocrinologist", // user table: specialization (string)
		hospital: "Philippine General Hospital", // hindi pa sinesave sa tables sa supabase
	},
	{
		number: "2",
		diagnosis: "Ketoacidosis",
		date: "2023-08-09",
		provider: "Dr. Eli Cruz",
		specialization: "Endocrinologist",
		hospital: "Taytay Hospital",
	},
];
export function MedicalHistoryPDF({ patientId, patientData }) {
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
				pdf.save(`Medical History.pdf`);
			})
			.finally(() => {
				// Add the 'hidden' class back after the PDF has been downloaded
				input.classList.add("hidden");
			});
	};
	return (
		<div className="flex items-center justify-center text-center m-2">
			<Button onClick={downloadPDF}>Download</Button>
			<div ref={pdfRef} className="hidden z-[-10] absolute" style={{ left: "-5000px" }}>
				{" "}
				<div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
					{patientData?.first_name} {patientData?.last_name}
				</div>
				<div className="text-black text-center text-base  leading-5max-md:ml-1 max-md:mt-10 mb-10">Medical History</div>
				<Table className="mb-5 pb-5">
					<TableCaption>Generated by John Doe through EndoTracker on April 30, 2024</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>No.</TableHead>
							{/* <TableHead>No.</TableHead> */}
							<TableHead>Diagnosis</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Provider</TableHead>
							<TableHead>Specialization</TableHead>
							<TableHead>Hospital</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="bg-white">
						{medicalhistory?.map((medicalhistory) => (
							<TableRow key={medicalhistory.number}>
								<TableCell className="font-medium">{medicalhistory.number}</TableCell>
								<TableCell className="font-medium">{medicalhistory.diagnosis}</TableCell>
								<TableCell>{medicalhistory.date}</TableCell>
								<TableCell>{medicalhistory.provider}</TableCell>
								<TableCell>{medicalhistory.specialization}</TableCell>
								<TableCell>{medicalhistory.hospital}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
