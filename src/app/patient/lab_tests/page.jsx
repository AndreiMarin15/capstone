"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react"; // <-- Import useState from React
import Image from "next/image";
import UploadLab from "./components/uploadLab";
import ViewLab from "./components/viewLab";
import doctor from "@/backend/health_records/doctor";
import "react-toastify/dist/ReactToastify.css";
import BackButton from "../personal_details/components/sub_components/BackButton";
import {
	getEncounters,
	getEncounterById,
	updateEncounterContained,
	getEncounterByPatientId,
} from "@/backend/health_records/getEncounter";
import { getObservation, getObservationsByPatientId } from "@/backend/health_records/getObservation";
import { uploadObservation } from "@/backend/health_records/uploadObservation";
import { getPatientRawData } from "@/backend/patient/personal_details/master_data";

export default function LaboratoryDashboard() {
	const [currentPage, setCurrentPage] = useState(0);
	const [currentScreen, setCurrentScreen] = useState(2);
	const [encounterId, setEncounterId] = useState(0);
	const [encounters, setEncounters] = useState(0);
	const [patientIds, setPatientIds] = useState(0);
	const router = useRouter();

	useEffect(() => {
		// Fetch patient ID when component mounts
		fetchPatientId();
	}, [patientIds, currentPage, currentScreen]);

	const fetchPatientId = async () => {
		try {
			// Fetch patient data
			const patientData = await getPatientRawData();
			// Extract patient ID
			const patientId = patientData.id;
			console.log(patientId);
			setPatientIds(patientId);
		} catch (error) {
			console.error("Error fetching encounters:", error);
		}
	};

	const [containedIDs, setContainedIDs] = useState([]);
	const [dateOfRequest, setDateOfRequest] = useState("");
	const [labTests, setLabTests] = useState([]);
	const [selectedObservationId, setSelectedObservationId] = useState(null);

	useEffect(() => {
		async function fetchEncounters() {
			console.log(patientIds);
			try {
				const doctorInfo = await doctor.getDoctorByCurrentUser();
				const encountersData = await getEncounterByPatientId(patientIds);
				console.log(encountersData);
				encountersData.forEach((encounter) => {
					const encounterContained = encounter.resource.contained;
					console.log(encounterContained);
				});

				const observationsData = await getObservationsByPatientId(patientIds);
				console.log(observationsData);

				const labTestObservations = observationsData
					.filter((observation) => observation.resource.id === "labtest")
					?.map((observation) => ({
						id: observation.id,
						doctor: observation.resource.participant.actor,
						srcdoctor:
							"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
						src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?",
						variable: observation.resource.codeText,
						update: observation.resource.uploadedDateTime,
						date: observation.resource.effectiveDateTime,
						reqdate: observation.resource.requestedDateTime,
						status: observation.resource.status,
					}));

				console.log(labTestObservations);
				setLabTests(labTestObservations);
			} catch (error) {
				console.error("Error fetching encounters and observations:", error);
			}
		}

		fetchEncounters();
	}, [patientIds, currentPage, currentScreen]);

	useEffect(() => {
		console.log(labTests);
	}, [labTests]);

	return [
		currentPage === 0 ? (
			<div className="w-full bg-white flex flex-col items-center px-20 py-12 h-auto max-md:px-5">
				<span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
					<span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
						<div className="text-black text-xl text-base font-semibold leading-6 my-auto">Lab Tests</div>
						<div className="self-stretch flex items-stretch justify-between gap-2.5">
							<button className="flex gap-1 px-5 py-2 text-xs rounded-md border border-black border-solid">
								<Image
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
									width="100"
									height="100"
									className="shrink-0 w-3 aspect-[0.85]"
								/>
								<div className="self-start">FILTER</div>
							</button>
							<button className="grow justify-center text-xs px-6 py-2 rounded-md border border-black border-solid">
								SORT
							</button>
						</div>
					</span>
				</span>

				<div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
					<div className="w-full max-md:max-w-full h-full">
						{labTests?.map((item) => (
							<button
								onClick={() => {
									if (item.status === "requested") {
										setCurrentPage(2);
									} else if (item.status === "final") {
										setCurrentPage(4);
									}
									setSelectedObservationId(item.id);
									console.log(selectedObservationId);
								}}
								className={`flex flex-col mt-8`}
								key={item.variable}
							>
								<div className="flex gap-3.5 font-semibold whitespace-nowrap">
									<Image
										height={0}
										width={0}
										loading="lazy"
										src={item.src}
										className="aspect-square object-contain object-center w-[15px] fill-black overflow-hidden shrink-0 max-w-full"
										alt="picture"
									/>
									<div className="my-auto text-sm">{item.variable}</div>
								</div>
								<div className="flex gap-5 justify-between ml-7 text-sm max-md:ml-2.5">
									<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
										Requested on:
										<div className="grow my-auto text-sm">{item.reqdate}</div>
									</div>

									{item.status !== "requested" && (
										<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
											Uploaded on:
											<div className="grow my-auto ">{item.update}</div>
										</div>
									)}
									{item.status === "requested" && (
										<div className="text-black font-medium text-sm leading-5 flex items-center">
											<svg
												className="h-3 w-3 ml-1 text-red-500 "
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="10" cy="10" r="5" />
											</svg>
											Requested
										</div>
									)}
									{item.status === "final" && (
										<div className="text-black text-m font-medium leading-5 text-sm flex items-center">
											<svg
												className="h-3 w-3 ml-1 text-green-500"
												fill="currentColor"
												viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg"
											>
												<circle cx="10" cy="10" r="5" />
											</svg>
											Uploaded
										</div>
									)}
								</div>
							</button>
						))}
					</div>
				</div>
			</div>
		) : currentPage === 3 ? (
			<div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5"></div>
		) : currentPage === 2 ? (
			<div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
				<UploadLab
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					observationId={selectedObservationId}
					setCurrentScreen={setCurrentScreen}
				/>
			</div>
		) : currentPage === 4 ? (
			<div className="w-full bg-white flex flex-col  px-20 py-12 h-auto max-md:px-5">
				<ViewLab currentPage={currentPage} setCurrentPage={setCurrentPage} observationId={selectedObservationId} />
			</div>
		) : (
			<></>
		),
	];
}
