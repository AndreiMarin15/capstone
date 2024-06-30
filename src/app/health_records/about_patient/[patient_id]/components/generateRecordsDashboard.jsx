"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { CarePlansPDF } from "./PDF_templates/careplanlistPDF";
import { FamilySocialHistoryPDF } from "./PDF_templates/familysocialhistoryPDF";
import { LabTestHistoryPDF } from "./PDF_templates/labtesthistoryPDF";
import { MasterDataPDF } from "./PDF_templates/masterdataPDF";
import { MedicalHistoryPDF } from "./PDF_templates/medicalhistoryPDF";
import { MedicationHistoryPDF } from "./PDF_templates/medicationhistoryPDF";
import { ReferralHistoryPDF } from "./PDF_templates/referralhistoryPDF";
import { ClinicVisitsPDF } from "./PDF_templates/clinicvisitPDF";
import { VitalsPDF } from "./PDF_templates/vitalsPDF";
import { UploadSignature } from "./sub_components/uploadSignature";
import { useRecordValidity } from "@/app/store";

export default function GenerateRecords({ patientId, patientData }) {
	const validityStore = useRecordValidity.getState();
	const [date, setDate] = useState();

	const dates = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Start Date",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "End Date",
			value: "",
		},
	];

	const [validityStart, setValidityStart] = useState();
	const [validityEnd, setValidityEnd] = useState();
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	const handleCheckboxChange = (event) => {
		setIsCheckboxChecked(!isCheckboxChecked);
	};

	return (
		<>
			<div className="text-black text-base font-bold leading-5 mt-8  max-md:ml-1 max-md:mt-10 mb-10">
				GENERATE RECORDS
			</div>
			<Checkbox checked={isCheckboxChecked} onClick={handleCheckboxChange}>
				Generate All Records
			</Checkbox>

			<div className="text-xs">
				<div className="flex gap-5 mb-12 w-full">
					{dates?.map((item, index) => (
						<div key={index} className="flex gap-2 my-auto text-black">
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src={item.src}
								className="aspect-square fill-black w-[15px]"
							/>
							<div className="flex-auto my-auto">{item.variable}</div>
							{item.variable === "Start Date" || item.variable === "End Date" ? (
								<input
									type="date"
									className="grow justify-center items-start py-1.5 pr-5 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[205px]"
									value={item.variable === "Start Date" ? validityStart : validityEnd}
									disabled={isCheckboxChecked}
									onChange={(e) => {
										const { value } = e.target;
										if (item.variable === "Start Date") {
											setValidityStart(value);
											validityStore.setStart(value);
											console.log("Start Date", value);
											console.log("validityStore", validityStore);
										} else if (item.variable === "End Date") {
											setValidityEnd(value);
											validityStore.setEnd(value);
											console.log("End Date", value);
											console.log("validityStore", validityStore);
										}
									}}
								/>
							) : (
								<input
									className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-stone-300 max-md:pr-5 w-[205px]"
									value={item.value}
								/>
							)}
						</div>
					))}
				</div>
			</div>
			<div className="text-xs">
				<table>
					<tr>
						<td className="gap-3"> Master Data</td>
						<td>
							<MasterDataPDF patientId={patientId} patientData={patientData} />
						</td>

						<td>Family & Social History</td>
						<td>
							<FamilySocialHistoryPDF patientId={patientId} patientData={patientData} />
						</td>
					</tr>

					<tr>
						<td>Medical History</td>
						<td>
							<MedicalHistoryPDF patientId={patientId} patientData={patientData} />
						</td>

						<td>Medication History</td>
						<td>
							<MedicationHistoryPDF patientId={patientId} patientData={patientData} />
						</td>
					</tr>

					<tr>
						<td>Lab Test History</td>
						<td>
							<LabTestHistoryPDF patientId={patientId} patientData={patientData} />
						</td>

						<td>List of Care Plans</td>
						<td>
							<CarePlansPDF patientId={patientId} patientData={patientData} />
						</td>
					</tr>

					<tr>
						<td>Referral History</td>
						<td>
							<ReferralHistoryPDF patientId={patientId} patientData={patientData} />
						</td>

						<td>Vitals & Biometrics</td>
						<td>
							<VitalsPDF patientId={patientId} patientData={patientData} />
						</td>
					</tr>

					<tr>
						<td> Clinic Visits</td>
						<td>
							<ClinicVisitsPDF patientId={patientId} patientData={patientData} />
						</td>
					</tr>
				</table>

				{/* <UploadSignature /> */}
			</div>
		</>
	);
}
