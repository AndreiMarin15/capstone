import Image from "next/image";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";

import * as React from "react";
import AddAllergies from "./addAllergies";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const rowdata = ({ allergen, comments, reactions, date_of_onset, severity_of_allergy }) => {
	return (
		<tr>
			<td>{allergen}</td>
			<td>{reactions} </td>
			<td>{severity_of_allergy || "mild"}</td>
			<td>{date_of_onset || "mm-dd-yyy"}</td>
			<td>{comments || "N/A"}</td>
		</tr>
	);
};
export default function FoodAllergies({ handleAdd, allergy, patientId }) {
	const [currentScreen, setCurrentScreen] = useState(0);
	const router = useRouter();
	const header = ["Food", "Reactions", "Severity", "Onset Date", "Comments"];

	if (currentScreen === 0) {
		return (
			<>
				<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
					FOOD ALLERGIES
				</div>

				<table className="pt-1.5 text-xs leading-5 text-black mt-5 max-w-[914px]">
					<thead>
						<tr className="font-medium text-left">
							{header?.map((item, index) => (
								<th key={index}>{item}</th>
							))}
							<th>
								<button
									onClick={() => {
										setCurrentScreen(2);
									}}
									className="flex px-4 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
								>
									Add
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{allergy &&
							allergy?.map((item, index) => {
								return <React.Fragment key={index}>{rowdata({ ...item })}</React.Fragment>;
							})}
					</tbody>
				</table>

				{/* BACK BUTTON */}
				<div className="w-full flex justify-between max-md:max-w-full mt-10 max-md:px-5">
					<button
						onClick={() => {
							router.push(`/health_records/about_patient/${patientId}`);
						}}
						className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
					>
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
	} else if (currentScreen === 2) {
		return <AddAllergies patientId={patientId} currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />;
	}
}
