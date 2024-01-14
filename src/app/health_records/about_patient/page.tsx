"use client";
import * as React from "react";
import Navbar from "../../navbar";
import HealthRecordsNav from "../healthRecordsNav";
import PatientProfile from "../patientProfile";
import MedicalHistory from "./components/medicalHistory";
import MasterData from "./components/masterData";
import { useHRNav } from "@/app/store";
import FamilyHistory from "./components/familyHistory";

export default function MyComponent() {
	const { selected } = useHRNav();

	return (
		<>
<<<<<<< Updated upstream
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
=======
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
>>>>>>> Stashed changes
				<div className="w-full max-md:max-w-full">
					<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
						<div className="flex flex-col items-stretch w-[17%] max-md:w-full max-md:ml-0">
							<Navbar />
						</div>

						<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0 h-[100vh]">
							<span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
								<span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
									<div className="text-black text-xl font-semibold leading-8">Health Records</div>
									<PatientProfile />
								</span>
								<HealthRecordsNav />
								{selected === "Master Data" ? (
									<MasterData />
								) : selected === "Medical History" ? (
									<MedicalHistory />
								) : selected === "Family History" ? (
									<FamilyHistory />
								) : (
									""
								)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
