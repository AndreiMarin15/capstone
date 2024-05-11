"use client";
import Image from "next/image";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useCPNav } from "@/app/store";
import ViewMedications from "../medications/components/viewPatientMedications";
import { doctor } from "@/app/lib/backend//health_records/doctor";
import { getMedicationRequests } from "@/app/lib/backend//health_records/getMedicationRequest";
import { getPatientRawData } from "@/app/lib/backend//patient/personal_details/master_data";
import { client } from "@/app/lib/backend//initSupabase";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function MedicationsDashboard() {
	const pdfRef = React.useRef();
	const { selected } = useCPNav();
	const [currentPage, setCurrentPage] = useState(0);
	const supabase = client("public");
	const [medications, setMedications] = useState([]);
	const [regis, setRegis] = useState("");
	const [status, setStatus] = useState("ACTIVE");
	const [currentUser, setCurrentUser] = useState(null);
	const [currentScreen, setCurrentScreen] = useState(0);
	const [refresh, setRefresh] = useState(false);
	const [patientId, setPatientId] = useState("");

	const medicationsIcons = {
		srcmedicine:
			"https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
		srddoctor:
			"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
	};

	React.useEffect(() => {
		async function fetchPatientId() {
			try {
				const patientData = await getPatientRawData();
				console.log(patientData);
				setPatientId(patientData.id); // Assuming patientData contains the patient ID
			} catch (error) {
				console.error("Error fetching patient data:", error);
			}
		}
		fetchPatientId();
	}, []);

	React.useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const currentUserData = await doctor.getDoctorByCurrentUser(); // Fetch current user data using the doctor module
				setCurrentUser(currentUserData);
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		};

		fetchCurrentUser();
	}, []);

	React.useEffect(() => {
		const fetchMedications = async () => {
			try {
				// Fetch medications based on current patient ID
				const medicationRequestsData = await getMedicationRequests(patientId);
				setMedications(medicationRequestsData);
				console.log(medicationRequestsData);
			} catch (error) {
				console.error("Error fetching medication requests:", error);
			}
		};

		// Fetch medications whenever refresh state changes or when currentScreen is 0 or 2
		if (refresh || currentScreen === 0 || currentScreen === 2) {
			fetchMedications();
		}
	}, [refresh, currentScreen]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setRefresh((prevRefresh) => !prevRefresh);
		}, 1000); // Adjust the interval time as needed

		return () => {
			clearInterval(interval);
		};
	}, []);

	const [isTest, setTest] = useState(false);
	const [isAdd, setAdd] = useState(false);
	const [isEdit, setEdit] = useState(false);

	const handleSetCurrentScreen = (screen) => {
		// Reset isTest to false when navigating back to screen 2
		if (screen === 2 || currentScreen === 2) {
			setTest(false);
			setAdd(false);
			setEdit(false);
		}
	};

	const toggleStatus = () => {
		setStatus(status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
	};

	const today = new Date();

	const downloadPDF = () => {
		const input = pdfRef.current;
		input.classList.remove("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save(`Medications.pdf`);

			input.classList.add("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");
		});
	};

	return (
		<div className="h-screen">
			{" "}
			{/* Set the height to full screen */}
			{isTest ? (
				<ViewMedications
					currentScreen={3}
					setCurrentScreen={handleSetCurrentScreen}
					patientId={patientId}
					medicationId={regis}
				/>
			) : (
				<div
					ref={pdfRef}
					className="border h-full w-full bg-white flex flex-col px-20 py-12 border-solid border-stone-300 max-md:px-5"
				>
					<div className="flex flex-col gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
						<span>
							<div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">Medications</div>
						</span>

						<div className="flex items-stretch mt-8">
							{/* Status section */}
							<div className="font-semibold text-black flex gap-1 items-center text-sm self-start mt-3">
								Status:
								<button
									className={`flex flex-col flex-1 justify-start font-bold ${
										status === "ACTIVE" ? "text-green-600" : "text-red-600"
									} whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none`}
									onClick={toggleStatus}
								>
									<div className="justify-start items-start py-2 pr-4 pl-3 text-xs rounded border border-black border-solid shadow-sm max-md:pr-5">
										{status}
									</div>
								</button>
							</div>

							{/* Spacer */}
							<div className="flex-grow" />

							{/* Search and Filter section */}
							<div className="flex justify-end gap-2.5">
								<span className="flex items-stretch gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
										className="ml-2 aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
									/>
									<input className="text-stone-300 text-xs leading-5 my-auto" placeholder="SEARCH"></input>
								</span>
								<button className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/7824f47aef79f0674e3de34f06de56a14c198999165016166b0825bd17c7945d?"
										className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">FILTER</div>
								</button>
							</div>
						</div>
						<div onClick={downloadPDF} className="text-blue-500 text-xs  flex items-center hover:cursor-pointer">
							<Image
								height={0}
								width={0}
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
								alt="icon"
								className="w-4 mr-2"
							/>
							<span>Medications(.pdf)</span>
						</div>
					</div>

					{medications
						.filter((medication) => {
							const validityPeriodEnd = new Date(medication.resource.dispenseRequest.validityPeriod.end);
							if (status === "ACTIVE") {
								return medication.resource.subject.reference === patientId && medication.resource.status === "Active";
							} else {
								return medication.resource.subject.reference === patientId && medication.resource.status === "Inactive";
							}
						})
						.map((medication, index) => (
							<button
								key={medication.resource.id}
								onClick={() => {
									console.log(medication.resource.id);
									setRegis(medication.resource.id);
									setTest(true);
									setAdd(false);
								}}
							>
								<div
									key={index}
									className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[1000px]"
								>
									<div className="flex gap-3.5 font-semibold whitespace-nowrap ">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src={medicationsIcons.srcmedicine}
											className="aspect-square fill-black w-[15px]"
										/>
										<div className="my-auto">{medication.resource.medicationCodeableConcept[0].text}</div>
									</div>
									<div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
										<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
											<Image
												alt="image"
												height={0}
												width={0}
												loading="lazy"
												src={medicationsIcons.srddoctor}
												className="w-4 aspect-square"
											/>
											<div className="grow my-auto">{medication.resource.requester.agent.reference}</div>
											<div className=" ml-16 justify-between flex-auto my-auto">{`${medication.resource.dispenseRequest.validityPeriod.start} to ${medication.resource.dispenseRequest.validityPeriod.end}`}</div>
										</div>
									</div>
								</div>
							</button>
						))}
				</div>
			)}
		</div>
	);
}
