"use client";

import * as React from "react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getMedicalHistory, getMedications } from "@/backend/pdfBackend/getPDFData";
export default function WriteReferral({ referralData, setReferralData, selectedPatientId }) {
	useEffect(() => {
		console.log(referralData);
	}, [referralData]);

	const [diagnoses, setDiagnoses] = useState([]);
	const [medications, setMedications] = useState([]);

	const [diagnosisText, setDiagnosisText] = useState("");
	const [medicationText, setMedicationText] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const diagnosis = await getMedicalHistory(selectedPatientId);
			console.log(diagnosis);
			const medication = await getMedications(selectedPatientId);
			console.log(medication);

			setDiagnoses(
				diagnosis
					.filter((medicalhistory) => medicalhistory.resource.valueString)
					.map((medicalhistory) => medicalhistory.resource.valueString)
			);
			setMedications(medication.map((medication) => medication.resource.medicationCodeableConcept[0].text));
		};
		fetchData();
	}, []);

	useEffect(() => {
		setDiagnosisText(`Diagnoses: \n${diagnoses.join("\n")}`);
	}, [diagnoses]);

	useEffect(() => {
		setMedicationText(`Here are the medications I am giving the patient:\n${medications.join("\n")}`);

		
	}, [medications]);

	useEffect(() => {
		console.log(diagnosisText);
		setReferralData((currentReferralData) => ({ ...currentReferralData, reason_for_referral: diagnosisText }));
	}, [diagnosisText]);

	useEffect(() => {
		console.log(medicationText);
		setReferralData((currentReferralData) => ({ ...currentReferralData, medications: medicationText }));
	}, [medicationText]);

	useEffect(() => {
		console.log(referralData);
	}, [referralData]);
	return (
		<div className="flex flex-col m-5 max-md:mt-10 max-md:max-w-full">
			<div className="mt-16 text-xl font-semibold leading-8 text-black max-md:mt-10 max-md:max-w-full">
				Write a Referral Letter
			</div>
			<div className="pt-7 pr-20 pb-12 pl-9 mt-9 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:px-5 max-md:max-w-full">
				<div className="flex max-md:flex-col max-md:gap-0">
					<div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
						<div className="flex grow gap-4 max-md:mt-10">
							<Image
								alt="img"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/e80fd4f7e67b4f0d3c46d75e3c8fcd5b038ba176a835fc6fbfa07ccbc0ae7748?apiKey=66e07193974a40e683930e95115a1cfd&"
								className="shrink-0 w-14 aspect-square"
							/>
							<div className="flex flex-col grow shrink-0 my-auto basis-0 w-fit">
								<div className="flex mt-1.5 text-xs font-semibold  text-black whitespace-nowrap">
									<div className=" my-auto mr-5">{"Doctor's Name"}</div>
									<input
										value={referralData.doctor_name}
										onChange={(e) => setReferralData({ ...referralData, doctor_name: e.target.value })}
										type="text"
										className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
									/>
								</div>
								<div className="flex mt-1.5 text-xs font-semibold  text-black whitespace-nowrap">
									<div className=" my-auto mr-5">Specialization</div>
									<input
										value={referralData.specialization}
										onChange={(e) => setReferralData({ ...referralData, specialization: e.target.value })}
										type="text"
										className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col w-[44%] ">
						<div className="flex gap-5 mt-3.5 text-xs font-semibold  text-black max-md:mt-10">
							<div className=" my-auto mr-5">Place of Clinic</div>
							<input
								value={referralData.place_of_clinic}
								onChange={(e) => setReferralData({ ...referralData, place_of_clinic: e.target.value })}
								type="text"
								className="p-2 shrink-0 rounded border border-black border-solid h-[22px] w-[170px]"
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col px-6 py-5 mt-2.5 bg-white rounded border border-gray-200 border-solid shadow-sm max-md:pl-5 max-md:max-w-full">
				<div className="flex flex-col px-6 py-5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
					<div className="text-base font-semibold leading-6 text-black max-md:max-w-full">Reason for Referral</div>
					<textarea
						value={referralData.reason_for_referral}
						onChange={(e) => setReferralData({ ...referralData, reason_for_referral: e.target.value })}
						placeholder=""
						className="mt-3 min-h-32 p-2 max-md:max-w-full"
					/>
				</div>
				<div className="flex flex-col px-6 py-5 mt-3.5 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
					<div className="text-base font-semibold leading-6 text-black max-md:max-w-full">Medication/s</div>
					<textarea
						value={referralData.medications}
						onChange={(e) => setReferralData({ ...referralData, medications: e.target.value })}
						placeholder=""
						className="mt-3 min-h-32 p-2 max-md:max-w-full"
					/>
				</div>
				<div className="flex flex-col px-6 py-5 mt-4 rounded-lg bg-stone-50 max-md:px-5 max-md:max-w-full">
					<div className="text-base font-semibold leading-6 text-black max-md:max-w-full">Notes/ Other Remarks:</div>
					<textarea
						value={referralData.other_remarks}
						onChange={(e) => setReferralData({ ...referralData, other_remarks: e.target.value })}
						placeholder=""
						className="mt-3 min-h-32 p-2 max-md:max-w-full"
					/>
				</div>
			</div>
		</div>
	);
}
