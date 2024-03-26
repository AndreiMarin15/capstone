import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import AddMedications from "./sub_components/addMedication";
import ViewMedications from "./sub_components/viewMedication";
import EditMedications from "./sub_components/editMedication";
import * as React from "react";
import { useState } from "react";
import {
	getMedicationRequests,
	updateMedicationStatus,
} from "../../../../../../lib/backend/health_records/getMedicationRequest";

import { client } from "../../../../../../lib/backend/initSupabase";

export default function Medications({ patientId }) {
	const supabase = client("public");
	const [medications, setMedications] = useState([]);
	const [regis, setRegis] = useState("");
	const [status, setStatus] = useState("ACTIVE");

	React.useEffect(() => {
		const fetchMedications = async () => {
			try {
				const medicationRequestsData = await getMedicationRequests();
				setMedications(medicationRequestsData);
				console.log(medicationRequestsData);
			} catch (error) {
				console.error("Error fetching medication requests:", error);
			}
		};

		fetchMedications();
	}, []);

	const [isTest, setTest] = useState(false);
	const [isAdd, setAdd] = useState(false);
	const [isEdit, setEdit] = useState(false);
	
	const handleSetCurrentScreen = (screen) => {
		// Reset isTest to false when navigating back to screen 2
		if (screen === 2) {
			setTest(false);
			setAdd(false);
			setEdit(false);
		}
	};

	const toggleStatus = () => {
		setStatus(status === "ACTIVE" ? "INACTIVE" : "ACTIVE");
	};

	const today = new Date();

	const handleDiscontinue = async (medicationId) => {
		console.log("Medication ID before update:", medicationId);
		try {
			// Update the medication status directly using updateTable

			const { data: medicationRequests, error } = await supabase.from("medicationrequest").select("*");

			if (error) {
				console.error(error);
				return;
			}

			const medicationRequestToUpdate = medicationRequests.find((request) => request.resource.id === medicationId);

			if (medicationRequestToUpdate) {
				const updateData = await supabase
					.from("medicationrequest")
					.update({ resource: { ...medicationRequestToUpdate.resource, status: "Inactive" } })
					.eq("id", medicationRequestToUpdate.id);

				console.log("Updated Data:", updateData);
				console.log("Medication ID after update:", medicationId);

				// Refresh medication list after updating status
				const updatedMedicationRequests = await getMedicationRequests();
				setMedications(updatedMedicationRequests);
			}
		} catch (error) {
			console.error("Error discontinuing medication:", error);
		}
	};
	return (
		<> {isEdit ? (
			<EditMedications
				currentScreen={6}
				setCurrentScreen={handleSetCurrentScreen}
				patientId={patientId}
				medicationId={regis}
			/>
		) :
			isTest ? (
				<ViewMedications
					currentScreen={3}
					setCurrentScreen={handleSetCurrentScreen}
					patientId={patientId}
					medicationId={regis}
				/>
			) : isAdd ? (
				<AddMedications currentScreen={4} setCurrentScreen={handleSetCurrentScreen} patientId={patientId} />
			) : (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
						MEDICATIONS
						<button
							className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
							onClick={() => {
								setTest(false);
								setAdd(true);
							}}
						>
							Add
						</button>
					</div>
					<div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
						<div className="flex gap-1.5 p-2.5">
							<div className="mt-3 font-semibold text-black flex gap-1 items-center">
								Status:
								<button
									className={`flex flex-col flex-1 justify-center font-bold ${
										status === "ACTIVE" ? "text-green-600" : "text-red-600"
									} whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none`}
									onClick={toggleStatus}
								>
									<div className="justify-center items-start py-2 pr-4 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
										{status}
									</div>
								</button>
							</div>
						</div>
						<div className="flex gap-1 my-auto text-black whitespace-nowrap leading-[150%]">
							<button className="flex gap-1 px-5 py-2 rounded-md border border-black border-solid">
								<Image
									alt="update"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
									className="shrink-0 w-3 aspect-[0.85]"
								/>
								<div className="self-start">FILTER</div>
							</button>
							<button className="grow justify-center px-6 py-2.5 rounded-md border border-black border-solid max-md:pl-5">
								SORT
							</button>
						</div>
					</div>
					{medications
						.filter((medication) => {
							const validityPeriodEnd = new Date(medication.resource.dispenseRequest.validityPeriod.end);
							if (status === "ACTIVE") {
								return (
									medication.resource.subject.reference === patientId &&
									validityPeriodEnd >= today &&
									medication.resource.status === "Active"
								);
							} else {
								return (
									medication.resource.subject.reference === patientId &&
									(validityPeriodEnd < today || medication.resource.status === "Inactive")
								);
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
											src={
												"https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
											}
											className="aspect-square fill-black w-[15px]"
										/>
										<div className="my-auto">{medication.resource.medicationCodeableConcept[0].text }</div>
									</div>
									<div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
										<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
											<Image
												alt="image"
												height={0}
												width={0}
												loading="lazy"
												src={
													"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
												}
												className="w-4 aspect-square"
											/>
											<div className="grow my-auto">{medication.resource.requester.agent.reference}</div>
											<div className=" ml-16 justify-between flex-auto my-auto">{`${medication.resource.dispenseRequest.validityPeriod.start} to ${medication.resource.dispenseRequest.validityPeriod.end}`}</div>
										</div>

										{medication.resource.requester.agent.reference === "Doctor Test" && medication.resource.status === "Active" && (
											<div className="flex-auto ml-96">
												<span className="">
												<button
													className="ml-auto px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white"
													onClick={(e) => {
														e.stopPropagation(); 
														console.log("edit Button is being pressed");
														// Set the state to indicate editing mode
														setEdit(true);
														// Ensure the test mode is not active
														setTest(false);
														// Pass the necessary props to the EditMedications component
														setRegis(medication.resource.id);
													}}
												>
													Edit
												</button>
												</span>
												<span className="">
													<button
														className="ml-2 px-4 pt-1.5 pb-2 text-xs font-semibold leading-3 text-blue-800 whitespace-nowrap rounded border border-blue-800 border-solid hover:bg-red-500 hover:text-white"
														onClick={(e) => {
															e.stopPropagation(); // Prevent event bubbling
															console.log("Medication ID:", medication.resource.id);
															handleDiscontinue(medication.resource.id);
														}}
													>
														Discontinue
													</button>
												</span>
											</div>
										)}
														</div>
													</div>
												</button>
											))}
										<BackButton />
									</>
								)}
							</>
						);
					}
