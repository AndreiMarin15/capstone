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
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getMedications, getDoctorSpecialization, getDoctorHospital } from "@/backend/pdfBackend/getPDFData";

export function MedicationHistoryPDF({ patientId, patientData }) {
	const [medicationhistory, setMedicationHistory] = useState([
		{
			number: "1",
			provider: "Dr. Johnny Santos", // resource.requester.agent.reference
			specialization: "Cardiologist", // resource.getSpecialization
			generic: "Ibuprofen", // resource.medicationCodeableConcept[0].text
			brand: "Paracetamol", // resource.medicationCodeableConcept[0].coding[0].display
			form: "Tablet", // resource.form.text
			dose: "500mg", // resource.dosageInstruction[0].doseAndRate[0].doseQuantity.doseUnit
			frequency: "3x a day", // resource.dispenseRequest.dispenseInterval
			start: "2024-04-21", // resource.dispenseRequest.validityPeriod.start
			end: "2024-04-29", // resource.dispenseRequest.validityPeriod.end
		},
	]);

	useEffect(() => {
		const fetchData = async () => {
			const medicationHistory = await getMedications(patientId);
			console.log(medicationHistory);

			const medicationHistoryWithDetails = await Promise.all(
				medicationHistory.map(async (item, index) => {
					// Assuming getDoctorSpecialization and getHospitalName return promises
					const specializationPromise = getDoctorSpecialization(item.resource.requester.agent.license_id);
					const hospitalPromise = getHospitalName(item.resource.requester.agent.license_id);

					// Wait for both promises to resolve
					const [specialization, hospital] = await Promise.all([specializationPromise, hospitalPromise]);

					return {
						number: index + 1,
						provider: item.resource.requester.agent.reference,
						specialization: specialization ?? "", // Now directly using the awaited value
						hospital: hospital ?? "", // Now directly using the awaited value
						generic: item.resource.medicationCodeableConcept[0].text,
						brand: item.resource.medicationCodeableConcept[0].coding[0].display,
						form: item.resource.form.text,
						dose: item.resource.dosageInstruction[0].doseAndRate[0].doseQuantity.doseUnit,
						frequency: item.resource.dispenseRequest.dispenseInterval,
						start: item.resource.dispenseRequest.validityPeriod.start,
						end: item.resource.dispenseRequest.validityPeriod.end,
					};
				})
			);

			setMedicationHistory(medicationHistoryWithDetails);
		};
		fetchData();
	}, [patientId]);

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
				pdf.save(`Medication History.pdf`);
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
					{patientData?.personal_information?.first_name} {patientData?.personal_information?.last_name}
				</div>
				<div className="text-black text-center text-base  leading-5max-md:ml-1 max-md:mt-10 mb-10">
					Medication History
				</div>
				<div className="flex mt-4 px-16 w-full text-xs max-md:flex-wrap max-md:max-w-full">
					<Table className="mb-5 pb-5">
						{/* To change to button */}
						{/* <TableCaption>Page 1 of 2</TableCaption> */}
						<TableHeader>
							<TableRow>
								<TableHead>No.</TableHead>
								<TableHead>Provider</TableHead>
								<TableHead>Specialization</TableHead>
								<TableHead>Generic Name</TableHead>
								<TableHead>Brand Name</TableHead>
								<TableHead>Form</TableHead>
								<TableHead>Dose/Unit</TableHead>
								<TableHead>Frequency</TableHead>
								<TableHead>Start Date</TableHead>
								<TableHead>End Date</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{medicationhistory?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{item.number}</TableCell>
									<TableCell>{item.provider}</TableCell>
									<TableCell>{item.specialization}</TableCell>
									<TableCell>{item.generic}</TableCell>
									<TableCell>{item.brand}</TableCell>
									<TableCell>{item.form}</TableCell>
									<TableCell>{item.dose}</TableCell>
									<TableCell>{item.frequency}</TableCell>
									<TableCell>{item.start}</TableCell>
									<TableCell>{item.end}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
