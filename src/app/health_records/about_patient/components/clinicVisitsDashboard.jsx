import Image from "next/image";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FollowUpVisit from "./sub_components/viewClinicVisit";
import AddFollowUpVisit from "./sub_components/addClinicVisit";
import * as React from "react";
import BackButton from "./sub_components/BackButton";


export default function MasterData() {
	const router = useRouter();

	const [currentPage, setCurrentPage] = useState(0);
	const visits = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
			visitname: "Clinic Visit #1",
			visitdate: "Date: 2023-10-30",
			value: (
				<button
					onClick={() => {
						setCurrentPage(currentPage + 2);
					}}
				></button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
			visitname: "Clinic Visit #2",
			visitdate: "Date: 2023-11-26",
			value: (
				<button
					onClick={() => {
						setCurrentPage(currentPage + 3);
					}}
				></button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
			visitname: "Clinic Visit #3",
			visitdate: "Date: 2024-02-14",
			value: (
				<button
					onClick={() => {
						setCurrentPage(currentPage + 4);
					}}
				></button>
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
					<div className="text-black text-base font-bold leading-5 mt-8 mb-10 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
						CLINIC VISIT
						<button
							className="flex gap-1.5 justify-end text-xs text-blue-800 whitespace-nowrap"
							onClick={() => {
								setCurrentPage(currentPage + 1);
							}}
						></button>
						<button
							className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
							onClick={() => {
								setCurrentPage(10);
							}}
						>
							Add New Clinic Visit
						</button>
					</div>

					{visits.map((item, index) => (
						<button key={index} className="flex mt-4 mb-4 text-xs text-black" onClick={handleVisitClick}>
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src={item.src}
								className="self-start aspect-square fill-black w-[15px]"
							/>
							<div className="flex flex-col flex-1 px-3.5 text-left">
								<div className="font-semibold whitespace-nowrap">{item.visitname}</div>
								<div>{item.visitdate}</div>
							</div>
						</button>
					))}
					<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : (
				""
			)}

			{currentPage === 1 ? (
				<>
					<FollowUpVisit currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : currentPage === 10 ? (
				<>
					<AddFollowUpVisit currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : (
				""
			)}
		</>
	);
}
