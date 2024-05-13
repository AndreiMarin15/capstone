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
import PieChart from "./piechart";

export default function NewAndReturning() {
	const router = useRouter(); // Initialize useRouter
	const patientInfo = [
		{
			name: "Marvin Raymundo",
			type: "New",
			ref: "Yes",
			refby: "Johnny Santos",
		},
		{
			name: "Ahmed Ali",
			type: "New",
			ref: "Yes",
			date: "Johnny Santos",
		},
		{
			name: "Elena Rodriguez",
			type: "Returning",
			ref: "No",
			date: "-",
		},
		{
			name: "Amir Khan",
			type: "New",
			ref: "Yes",
			date: "Johnny Santos",
		},
	];
	return (
		<div>
			<div className="mt-8 ml-8 mb-2 mr-8">
				<span className="text-black font-semibold text-sm"> New vs. Returning Patients </span>
				<span className="text-black text-sm"> (January 1, 2024 to May 1, 2024) </span>
			</div>
			<div className="flex">
				<div className="flex flex-col">
					<PieChart />
				</div>
				<div className="flex mt-4 px-8 w-full text-xs max-md:flex-wrap max-md:max-w-full">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[30%]">Patient Name</TableHead>
								<TableHead>Type</TableHead>
								<TableHead>Referred?</TableHead>
								<TableHead className="text-left">Referred by</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{patientInfo?.map((item, index) => (
								<TableRow key={index}>
									<TableCell className="font-medium">{item.name}</TableCell>
									<TableCell>{item.type}</TableCell>
									<TableCell>{item.ref}</TableCell>
									<TableCell className="text-left">{item.refby}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}
