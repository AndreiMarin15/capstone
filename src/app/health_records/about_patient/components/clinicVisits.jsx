import Image from "next/image";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FollowUpVisit from "./sub_components/followUpVisit"
import AddFollowUpVisit from "./sub_components/addFollowUp"
import * as React from "react";

export default function MasterData() {
	const [currentPage, setCurrentPage] = useState(0);
	const diagnosis = [
	{
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
		diagnosis: "Diagnosis: Type 2 Diabetes Mellitus",
		diagnosisdate: "Date: 2023-07-01",
	},

	];

	const visits = [
	{
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
		visitname: "Follow-up Visit #1",
		visitdate: "Date: 2023-10-30",
		value: (
			<button
				onClick={() => {
					setCurrentPage(currentPage + 2);
				}}
			>
			</button>
		),
	},
	{
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
		visitname: "Follow-up Visit #2",
		visitdate: "Date: 2023-11-26",
		value: (
		<button
			onClick={() => {
				setCurrentPage(currentPage + 3);
			}}
		>
		</button>
	),
	},
	{
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
		visitname: "Follow-up Visit #3",
		visitdate: "Date: 2024-02-14",
		value: (
		<button
			onClick={() => {
				setCurrentPage(currentPage + 4);
			}}
		>
		</button>
	),
	},
	];

	const handleVisitClick = () => {
	// Increment the currentPage when the user clicks the div
	setCurrentPage(currentPage + 1);
	};

  return (
    <>
	{currentPage === 0 ? (
	<>
    	<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">CLINIC VISIT</div>

		{diagnosis.map((item, index) => (
		<button key={index} className="flex gap-2.5 mt-8 text-xs text-black">
			<Image
			alt="image"
			height={0}
			width={0}
			loading="lazy"
			src={item.src}
			className="self-start aspect-square fill-black w-[15px]"
			/>
			<div className="flex flex-col flex-1 px-5 text-left">
			<div className="font-semibold whitespace-nowrap">{item.diagnosis}</div>
			<div>{item.diagnosisdate}</div>
			</div>
		</button>
		))}

      	<div className="border-b border-gray-300 w-full mt-4"></div>

		<div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
			<div>Follow-up Visits</div>
			<button 
				className="flex gap-1.5 justify-end text-xs text-blue-800 whitespace-nowrap"
				onClick={() => {
					setCurrentPage(currentPage + 1);
			}}>
				<div className="flex gap-1.5 justify-between px-8 py-1.5 rounded border border-blue-800 border-solid">
					<div>Add New Follow-up</div>
				</div>
			</button>
		</div>

		{visits.map((item, index) => (
		<button key={index} className="flex gap-2.5 mt-4 mb-4 text-xs text-black ml-8" onClick={handleVisitClick}>
			<Image
			alt="image"
			height={0}
			width={0}
			loading="lazy"
			src={item.src}
			className="self-start aspect-square fill-black w-[15px]"
			/>
			<div className="flex flex-col flex-1 px-5 text-left">
			<div className="font-semibold whitespace-nowrap">{item.visitname}</div>
			<div>{item.visitdate}</div>
			</div>
		</button>
		))}

	  </>
		) : (
			""
		)}

		{ currentPage === 1 ? (
			<>
				<AddFollowUpVisit />
			</>
		) : currentPage === 2 ? (
			<>
				<FollowUpVisit />
			</>
		) : (
			""
		)}
    </>
  );
}
