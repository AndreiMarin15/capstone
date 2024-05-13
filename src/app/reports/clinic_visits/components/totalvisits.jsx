"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import BarChart from "./barchart";

export default function TotalVisits() {
	const router = useRouter(); // Initialize useRouter
	const patientInfo = [
		{
			name: "Marvin Raymundo",
			age: "25",
			diagnosis: "Type 2 Diabetes with Ketoacidosis",
			date: "April 20, 2024",
		},
		{
			name: "Ahmed Ali",
			age: "25",
			diagnosis: "Type 1 Diabetes Mellitus with Hypoglycemia",
			date: "April 19, 2024",
		},
		{
			name: "Elena Rodriguez",
			age: "24",
			diagnosis: "Type 2 Diabetes Mellitus with Neuropathy",
			date: "April 10, 2024",
		},
		{
			name: "Amir Khan",
			age: "45",
			diagnosis: "Type 1 Diabetes Mellitus with Retinopathy",
			date: "January 28, 2024",
		},
	];
	return (
		<>
			<div className="mt-8 ml-8 mb-2 mr-8">
				<span className="text-black font-semibold text-sm"> Total Visits Over Time </span>
				<span className="text-black text-sm"> (January 1, 2024 to May 1, 2024) </span>
			</div>
			{/* <BarChart></BarChart> */}

			<div className="flex mt-4 px-8 w-full text-xs max-md:flex-wrap max-md:max-w-full">
				<Table>
					{/* To change to button */}

					<TableHeader>
						<TableRow>
							<TableHead className="w-[20%]">Patient Name</TableHead>
							<TableHead>Age</TableHead>
							<TableHead className="w-[40%]">Diagnosis</TableHead>
							<TableHead className="text-left">Date of Clinic Visit</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{patientInfo?.map((item, index) => (
							<TableRow key={index}>
								<TableCell className="font-medium">{item.name}</TableCell>
								<TableCell>{item.age}</TableCell>
								<TableCell>{item.diagnosis}</TableCell>
								<TableCell className="text-left">{item.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
			<div className="text-base text-xs text-sky-900 mt-8">
				<button className="flex items-center justify-center px-6 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5">
					<div className="flex gap-0.5 justify-between items-center">
						<Image
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
							className="w-3 h-3 aspect-square"
							alt="Back Arrow"
						/>
						<div className="text-xs">BACK</div>
					</div>
				</button>
			</div>
		</>
	);
}
