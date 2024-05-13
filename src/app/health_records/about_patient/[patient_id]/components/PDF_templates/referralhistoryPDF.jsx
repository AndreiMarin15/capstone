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

const referralhistory = [
	{
		number: "1",
		referredto: "Dr. Johnny Santos",
		specialization: "Cardiologist",
		date: "2024-04-21",
	},
	{
		number: "2",
		referredto: "Dr. Mari Abalos",
		specialization: "Gastroenterologist",
		date: "2024-04-21",
	},
	{
		number: "3",
		referredto: "Dr. Kim Cruz",
		specialization: "Cardiologist",
		date: "2024-04-26",
	},
];

export function ReferralHistoryPDF() {
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
				pdf.save(`Referral History.pdf`);
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
					JUAN DELA CRUZ
				</div>
				<div className="text-black text-center text-base  leading-5max-md:ml-1 max-md:mt-10 mb-10">
					Referral History
				</div>
				<div className="flex items-center justify-center mt-4 px-16 w-full text-xs max-md:flex-wrap max-md:max-w-full">
					<Table className="mb-5 pb-5">
						{/* To change to button */}
						{/* <TableCaption>Page 1 of 2</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead>No.</TableHead>
								<TableHead>Referred to</TableHead>
								<TableHead>Specialization</TableHead>
								<TableHead>Date Referred</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{referralhistory?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{item.number}</TableCell>
									<TableCell>{item.referredto}</TableCell>
									<TableCell>{item.specialization}</TableCell>
									<TableCell>{item.date}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
