"use client";
import * as React from "react";
import Navbar from "../../navbar";
import HealthRecordsNav from "../healthRecordsNav";
import PatientProfile from "../patientProfile";
import ClinicVisits from "./components/clinicVisits";
import Diagnoses from "./components/diagnoses"
import MasterData from "./components/masterDataDashboard";
import Vitals from "./components/vitalsDashboard";
import Medications from "./components/medicationsDashboard"
import LabTests from "./components/labTestsDashboard"
import { useHRNav } from "@/app/store";
import FamilyHistory from "./components/sub_components/viewfamilyHistory";
import SocialHistory from "./components/socialHistory";
import FamilySocialHistory from "./components/familysocialHistoryDashboard"
import PredictiveAnalytics from "./components/predictiveAnalyticsDashboard";

export default function AboutPatient() {
	const { selected } = useHRNav();

	return (
		<>
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
				<div className="w-full max-md:max-w-full">
					<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
						<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
							<span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
								<span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
									<div className="text-black text-xl font-semibold leading-8">Health Records</div>
									<PatientProfile />
								</span>
								<HealthRecordsNav />
								{selected === "Master Data" ? (
									<MasterData />
								) : selected === "Clinic Visits" ? (
									<ClinicVisits />
								) : selected === "Diagnoses" ? (
									<Diagnoses />
								) : selected === "Medications" ? (
									<Medications />
								) : selected === "Lab Tests" ? (
									<LabTests />
								) : selected === "Vitals & Biometrics" ? (
									<Vitals />
								) : selected === "Family & Social History" ? (
									<>
										<FamilySocialHistory />
										
									</>
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
