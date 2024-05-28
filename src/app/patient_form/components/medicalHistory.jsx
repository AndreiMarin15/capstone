"use client";

import { usePatientInfo } from "@/app/store";
import { useEffect, useState } from "react";
import { PatientSignUp as signUp } from "@/backend//signup/patient_signup";
export default function SignUpMedicalHistory() {
	const patientStore = usePatientInfo();
	const [medications, setMedications] = useState([]);
	const [filteredMedications, setFilteredMedications] = useState([]);
	const [medicationList, setMedicationList] = useState([]);
	const [selectedMedication, setSelectedMedication] = useState(null);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const getMedications = async () => {
			const drugs = await signUp.retrieveMedications();

			console.log(drugs);
			setMedications(drugs);
		};

		getMedications();
	}, []);

	useEffect(() => {
		patientStore.setMedications(medicationList);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [medicationList]);
	return (
		<div className="container mx-auto mt-16 flex h-auto pb-10">
			{/* Left Column */}
			<div className="w-1/2 pr-8">
				<div className="text-black text-base font-semibold leading-6">Medical History</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly answer the following regarding your medical history.
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-6 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you had hypertension in the past year?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input
							onChange={(e) => {
								patientStore.setHypertension(e.target.checked);
							}}
							value={patientStore.medical_history.hypertensions}
							type="checkbox"
							id="bloodPressureYes"
							name="bloodPressure"
							className="mr-2"
						/>
						Yes
					</label>
				</div>
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-4 mt-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you been taking any blood pressure medications?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input
							onChange={(e) => {
								patientStore.setBloodPressureMedication(e.target.checked);
							}}
							value={patientStore.medical_history.blood_pressure_medications}
							type="checkbox"
							id="bloodPressureYes"
							name="bloodPressure"
							className="mr-2"
						/>
						Yes
					</label>
				</div>

				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-6 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you had a stroke in the past year?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input
							onChange={(e) => {
								patientStore.setStroke(e.target.checked);
							}}
							value={patientStore.medical_history.stroke}
							type="checkbox"
							id="bloodPressureYes"
							name="bloodPressure"
							className="mr-2"
						/>
						Yes
					</label>
				</div>
				
				<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-6 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					Have you been diagnosed with diabetes?
				</div>
				<div className="flex items-center gap-2 text-sm">
					<label htmlFor="bloodPressureYes" className="flex items-center">
						<input
							onChange={(e) => {
								patientStore.setDiabetes(e.target.checked);
								console.log(patientStore.medical_history.diabetes)
							}}
							value={patientStore.medical_history.diabetes}
							type="checkbox"
							id="bloodPressureYes"
							name="bloodPressure"
							className="mr-2"
						/>
						Yes
					</label>
				</div>
				

				<div className="flex items-stretch self-stretch mt-5 flex-grow flex-col">
					<div className="text-black text-sm font-semibold leading-5">Enter Medications </div>

					<div className="flex gap-2.5 justify-between mt-2 text-lg text-start text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
						{medications.length > 0 ? (
							<div className="flex">
								<div className="inline-block relative">
									<input
										onChange={(e) => {
											setInputValue(e.target.value);
											let filteredMedicines = [];
											medications.forEach((medication) => {
												if (e.target.value.length > 0) {
													if (
														medication["Generic Name"]?.toLowerCase().includes(e.target.value.toLowerCase()) ||
														medication["Brand Name"]?.toLowerCase().includes(e.target.value.toLowerCase())
													) {
														filteredMedicines.push(medication);
													}
												} else {
													filteredMedicines = [];
												}

												setFilteredMedications(filteredMedicines);
											});
										}}
										id="medInput"
										type="text"
										value={inputValue}
										className="text-black rounded text-xs shadow-sm h-[30px]  flex-grow flex-col mt-2 border-[0.5px] px-auto py-4 border-solid border-black text-left"
										style={{ width: "700px", textIndent: "5px" }}
									/>
									{filteredMedications.length > 0 ? (
										<>
											<ul
												style={{
													listStyle: "none",
													padding: "unset",
													margin: "unset",
													position: "absolute",
													width: "600px",
													maxHeight: "200px",
													overflowY: "auto",
													overflowX: "hidden",
												}}
											>
												{filteredMedications.slice(0, 50)?.map((med) => (
													<li
														key={med["Registration Number"]}
														className="border text-black text-sm border-t-0 border-gray-300 bg-gray-200 hover:bg-blue-300"
													>
														<button
															className="whitespace-pre-wrap border-none cursor-pointer block w-full text-left py-2 px-4"
															onClick={() => {
																setMedicationList((prev) => {
																	return [...prev, med];
																});
																setSelectedMedication(
																	`${med["Generic Name"]} - ${med["Brand Name"]} ${med["Dosage Strength"]}`
																);
																setInputValue(
																	`${med["Generic Name"]} - ${med["Brand Name"]} ${med["Dosage Strength"]}`
																);
																setFilteredMedications([]);
															}}
														>
															{`${med["Generic Name"]} - ${med["Brand Name"]} ${med["Dosage Strength"]}`}
														</button>
													</li>
												))}
											</ul>
										</>
									) : (
										""
									)}
								</div>
							</div>
						) : (
							<p>Loading...</p>
						)}

						<button className="justify-center items-center px-2 my-auto bg-gray-400 rounded-full aspect-square h-[25px]">
							+
						</button>
					</div>
				</div>

				<div className="flex items-stretch self-stretch mt-5 flex-grow flex-col">
					<div className="text-black text-sm font-semibold leading-5">Past Medical Procedures </div>

					<div className="flex gap-2.5 justify-between mt-2 text-lg text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
						<input
							onChange={(e) => {
								patientStore.setPastMedicalProcedures(e.target.value);
							}}
							value={patientStore.medical_history.past_medical_procedures}
							className="text-black rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>

						<button className="justify-center items-center px-2 my-auto bg-gray-400 rounded-full aspect-square h-[25px]">
							+
						</button>
					</div>
				</div>

				<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
					<div className="flex items-stretch gap-2.5 mt-1. self-start">
						<span className="flex grow basis-[0%] flex-col items-stretch">
							<div className="text-black text-sm font-semibold leading-5">
								When were you diagnosed with Hypertension?{" "}
							</div>

							<div className="flex justify-between gap-2.5 mt-2">
								<input
									onChange={(e) => {
										patientStore.setDateOfProcedures(e.target.value);
									}}
									value={patientStore.medical_history.date_of_hypertension}
									type="number"
									className="text-black text-sm leading-5 whitespace-nowrap rounded shadow-sm flex-shrink-0  justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
									placeholder="YYYY"
								/>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
