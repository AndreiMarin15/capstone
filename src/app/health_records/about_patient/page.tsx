"use client";
import * as React from "react";
import Navbar from "../../navbar";
import HealthRecordsNav from "../healthRecordsNav";
import PatientProfile from "../patientProfile";
import MedicalHistory from "./medicalHistory";
import MasterData from "./masterData";
import { useHRNav } from "@/app/store";

export default function MyComponent() {
	const {selected} = useHRNav();

	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
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
								{/* <div className="flex items-stretch justify-between gap-3.5 mt-10">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?"
										className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
									/>
									<span className="flex grow basis-[0%] flex-col items-stretch mt-4 self-start">
										<div className="text-black text-xs font-semibold leading-5">DELA CRUZ, Juan</div>
										<div className="flex items-center">
											<div className="text-black text-xs leading-5 whitespace-nowrap pr-2">74 years old</div>
											<div className="relative">
												<div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
											</div>
											<div className="text-black text-xs leading-5 whitespace-nowrap pl-2">Male</div>
										</div>
									</span>
								</div> */}
							</span>
							<HealthRecordsNav />
							{
								selected === "Master Data" ? <MasterData /> :
								selected === "Medical History" ? <MedicalHistory /> :
								""
							}
							
							
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
