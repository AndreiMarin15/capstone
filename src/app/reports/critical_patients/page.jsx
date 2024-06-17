"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link } from "next/link"; // Import Link component
import { currentUser } from "@/app/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getCriticalPatients, getPatientAndFinalDiagnosis } from "@/backend/reports/getReportsData";
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
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import retrieveReferralData from "@/backend/referral/retrieveReferralData";
import { useRef } from "react";
import { ReferPatients } from "./refer_patients/referPage";

export default function CriticalConditionPatients() {
	const router = useRouter(); // Initialize useRouter
	const pdfRef = useRef();
	const [criticalPatients, setCriticalPatients] = useState([]);
	const [patientsDiagnosis, setPatientsDiagnosis] = useState([]);
	const [patientInfo, setPatientInfo] = useState([]);
	const [doctors, setDoctors] = React.useState([]);
	const [selectedDoctorId, setSelectedDoctorId] = React.useState(null);
	const [selectedDoctor, setSelectedDoctor] = React.useState({});

	React.useEffect(() => {
		console.log(selectedDoctorId);
		console.log(selectedDoctor);
	}, [selectedDoctorId]);

	const [currentState, setCurrentState] = React.useState(1);
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
		const date = new Date().toLocaleDateString();
		html2canvas(input)
			.then((canvas) => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("l", "px", [computedWidth, computedHeight]);
				pdf.addImage(imgData, "PNG", 0, 0, width, height);
				pdf.save(`critical_patients_${date}.pdf`);
			})
			.finally(() => {
				// Add the 'hidden' class back after the PDF has been downloaded
				// input.classList.add("hidden");
			});
	};
	useEffect(() => {
		const fetchCriticalPatients = async () => {
			const criticalPatients = await getCriticalPatients();
			console.log(criticalPatients);
			setCriticalPatients(criticalPatients);
		};
		fetchCriticalPatients();
	}, []);

	useEffect(() => {
		const fetchPatientsDiagnoses = async () => {
			const diagnosesPromises = criticalPatients.map((criticalPatient) =>
				getPatientAndFinalDiagnosis(criticalPatient?.resource?.subject?.reference).then((patientsDiagnosis) => ({
					patient: patientsDiagnosis.patient[0].personal_information,
					diagnosis: patientsDiagnosis.diagnosis[0],
					visit: criticalPatient,
				}))
			);

			const patientsDiagnoses = await Promise.all(diagnosesPromises);
			console.log(patientsDiagnoses);
			setPatientsDiagnosis(patientsDiagnoses);
		};
		fetchPatientsDiagnoses();
	}, [criticalPatients]);

	function getAge(birthdate) {
		const birthDate = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}

		return age;
	}
	useEffect(() => {
		console.log("PATIENTS DIAGNOSIS", patientsDiagnosis);
		setPatientInfo(
			patientsDiagnosis.map((patientDiagnoses) => {
				return {
					name: patientDiagnoses.patient?.first_name + " " + patientDiagnoses.patient?.last_name,
					diagnosis: patientDiagnoses.diagnosis?.resource?.valueString,
					age: getAge(patientDiagnoses.patient?.birthdate),
					gender: patientDiagnoses.patient?.gender,
				};
			})
		);
	}, [patientsDiagnosis]);

	React.useEffect(() => {
		const fetchData = async () => {
			const doctors = await retrieveReferralData.getDoctors();

			setDoctors(doctors);
		};

		fetchData();
	}, []);

	return (
		<>
			{currentState === 1 ? (
				<div className="bg-white h-screen flex" style={{ overflowY: "scroll", maxHeight: "100vh" }}>
					<div
						ref={pdfRef}
						className="flex flex-col grow shrink-0 self-start px-8 mt-14 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full"
					>
						<div className="text-xl font-semibold text-black max-md:max-w-full">Reports</div>
						<div className="shrink-0 mt-5 h-px bg-black border border-black border-solid max-md:max-w-full" />
						<div className="flex justify-between gap-5 px-5 w-full max-md:flex-wrap max-md:max-w-full">
							<div className="mt-8 text-base font-semibold text-black max-md:max-w-full">
								PATIENTS WITH CRITICAL CONDITIONS
							</div>

							<div className="mt-8 text-xs text-blue-500 max-md:max-w-full">
								<button
									onClick={() => {
										downloadPDF();
									}}
								>
									↓ Download (.pdf)
								</button>
							</div>
						</div>
						<div className="flex flex-col grow shrink-0 self-start px-8 mt-8 basis-0 leading-[150%] w-fit max-md:mt-10 max-md:max-w-full overflow: scroll">
							<div className="ml-4 text-sm font-semibold text-black max-md:max-w-full">
								Date Generated: <span className="font-normal">{new Date().toLocaleDateString()}</span>
								<br />
								Generated by:{" "}
								<span className="font-normal">
									Dr. {currentUser.getState().user.first_name} {currentUser.getState().user.last_name}
								</span>
							</div>

							<div className="mt-12 ml-4 mb-2 ">
								<span className="text-black font-semibold text-sm">
									{" "}
									Total Number of Patients with Critical Conditions:{" "}
									<span className="font-normal">{patientInfo?.length}</span>
								</span>
							</div>
						</div>

						<div className="flex flex-col">
							<div className="flex-1 mt-4 ml-8 mr-4 text-xs">
								{/* Table component */}
								<Table>
									{/* To change to button */}
									<TableHeader>
										<TableRow>
											<TableHead className="w-[20%]">Patient Name</TableHead>
											<TableHead>Age</TableHead>
											<TableHead>Gender</TableHead>

											<TableHead className="w-[40%]">Diagnosis</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{patientInfo?.map((item, index) => (
											<TableRow key={index}>
												<TableCell className="font-medium">{item.name}</TableCell>
												<TableCell>{item.age}</TableCell>
												<TableCell>{item.gender}</TableCell>

												<TableCell>{item.diagnosis}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
						<div className="text-center mt-10">
							<Button
								onClick={() => {
									setCurrentState(2);
								}}
							>
								{" "}
								Refer All Patients
							</Button>
						</div>
						<div className="text-base  text-sky-900 mt-8">
							<Button
								variant="back"
								onClick={() => {
									router.back();
								}}
							>
								BACK
							</Button>
						</div>
					</div>
				</div>
			) : currentState === 2 ? (
				<ReferPatients
					patients={criticalPatients}
					selectedDoctorId={selectedDoctorId}
					setSelectedDoctorId={setSelectedDoctorId}
					setSelectedDoctor={setSelectedDoctor}
					selectedDoctor={selectedDoctor}
					doctors={doctors}
				/>
			) : (
				""
			)}
		</>
	);
}
