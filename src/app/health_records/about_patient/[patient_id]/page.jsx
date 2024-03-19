"use client";
import * as React from "react";
import Navbar from "../../../navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HealthRecordsNav from "../../healthRecordsNav";
import PatientProfile from "../../patientProfile";
import ClinicVisits from "./components/clinicVisitsDashboard";
import Diagnoses from "./components/diagnosesDashboard";
import MasterData from "./components/masterDataDashboard";
import Vitals from "./components/vitalsDashboard";
import Medications from "./components/medicationsDashboard";
import CarePlans from "./components/carePlanDashboard";
import LabTests from "./components/labTestsDashboard";
import { useHRNav } from "@/app/store";
import FamilyHistory from "./components/sub_components/viewfamilyHistory";
import SocialHistory from "./components/socialHistory";
import FamilySocialHistory from "./components/familysocialHistoryDashboard";
import PredictiveAnalytics from "./components/predictiveAnalyticsDashboard";

import { healthRecords } from "../../../../../lib/backend/health_records/health_records";

export default function AboutPatient({ params }) {
	const { selected } = useHRNav();
	const router = useRouter();
	const [currentPage, setCurrentPage] = React.useState(0);

	const [patientData, setPatientData] = React.useState({});
	const [patientFhirData, setPatientFhirData] = React.useState({});

	const patientId = params.patient_id;

	const handleBack = () => {
		setCurrentPage(currentPage - 1); // Go back one page
	};

	React.useEffect(() => {
		const fetchData = async () => {
			const data1 = await healthRecords.getPatientData(patientId);
			const data2 = await healthRecords.getPatientFhirData(patientId);

			setPatientData(data1);
			setPatientFhirData(data2);
		};

    fetchData();
	}, []);

	React.useEffect(() => {
		console.log(patientData);
		console.log(patientFhirData);
	}, [patientData, patientFhirData]);

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
									<ClinicVisits currentPage={currentPage} setCurrentPage={setCurrentPage} />
								) : selected === "Diagnoses" ? (
									<Diagnoses />
								) : selected === "Medications" ? (
									<Medications />
								) : selected === "Care Plans" ? (
									<CarePlans />
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
