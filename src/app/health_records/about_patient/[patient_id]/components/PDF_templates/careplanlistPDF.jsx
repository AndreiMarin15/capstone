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
import { getCarePlan } from "@/backend/pdfBackend/getPDFData";

export function CarePlansPDF({ patientId, patientData }) {
	const [careplanlist, setCareplanList] = useState([
		{
			number: "1",
			date: "2024-04-21",
			provider: "Dr. John Doe",
			specialization: "Endocrinologist",
			diet: "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
			physical:
				"Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
			monitoring: "Pay attention to your feet and check for any cuts, sores, or redness",
		},
		{
			number: "2",
			date: "2024-04-30",
			provider: "Dr. John Doe",
			specialization: "Endocrinologist",
			diet: "Prioritize fruits, vegetables, whole grains, and lean protein sources like fish, chicken, and beans",
			physical:
				"Aim for at least 150 minutes of moderate-intensity aerobic activity or 75 minutes of vigorous-intensity aerobic activity per week.",
			monitoring: "Pay attention to your feet and check for any cuts, sores, or redness",
		},
	]);
	useEffect(() => {
		const fetchData = async () => {
			const response = await getCarePlan(patientId);
			console.log(response);

			setCareplanList(
				response.map((careplanlist, index) => ({
					number: index + 1,
					date: careplanlist.resource.created,
					provider: careplanlist.resource.contributor.display,
					specialization: "Endocrinologist",
					diet: careplanlist.resource.activity[0].detail.description,
					physical: careplanlist.resource.activity[1].detail.description,
					monitoring: careplanlist.resource.activity[2].detail.description,
				}))
			);
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
				pdf.save(`Care Plans.pdf`);
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
				<div className="text-black text-center text-base font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">
					{patientData?.first_name} {patientData?.last_name}
				</div>
				<div className="text-black text-center text-base  leading-5 max-md:ml-1 max-md:mt-10 mb-10">Care Plans</div>
				<div className="flex mt-4 px-5 w-full text-xs max-md:flex-wrap max-md:max-w-full">
					<Table className="mb-5 pb-5">
						{/* To change to button */}
						{/* <TableCaption>Page 1 of 2</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead>No.</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Provider</TableHead>
								<TableHead>Specialization</TableHead>
								<TableHead>Dietary Management</TableHead>
								<TableHead>Physical Activities</TableHead>
								<TableHead>Self Monitoring</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{careplanlist?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{item.number}</TableCell>
									<TableCell>{item.date}</TableCell>
									<TableCell>{item.provider}</TableCell>
									<TableCell>{item.specialization}</TableCell>
									<TableCell>{item.diet}</TableCell>
									<TableCell>{item.physical}</TableCell>
									<TableCell>{item.monitoring}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
