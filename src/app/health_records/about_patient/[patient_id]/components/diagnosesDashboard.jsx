import Image from "next/image";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/react";
import BackButton from "./sub_components/BackButton";
import * as React from "react";
import { getFinalDiagnosisObservations } from "@/backend//health_records/getObservation";
import { getEncounterByPatientId } from "@/backend//health_records/getEncounter";

export default function Diagnoses({ patientId }) {
	const variables = ["Diagnoses", "Date of Diagnosis", "Doctor", "Hospital"];
	const [finalDiagnoses, setFinalDiagnoses] = React.useState([]);
	const [encounters, setEncounters] = React.useState([]);

	React.useEffect(() => {
		async function fetchFinalDiagnoses() {
			try {
				// Fetch all final diagnosis observations
				const allFinalDiagnoses = await getFinalDiagnosisObservations();
				console.log(allFinalDiagnoses);

				// Filter the observations by patientId
				const filteredDiagnoses = allFinalDiagnoses.filter((diagnosis) => {
					return diagnosis.resource.subject.reference === patientId;
				});

				console.log(filteredDiagnoses);

				setFinalDiagnoses(filteredDiagnoses);
			} catch (error) {
				console.error("Error fetching final diagnoses:", error);
			}
		}

		fetchFinalDiagnoses(); // Call the function to fetch final diagnoses
	}, [patientId]); // Only run once when patientId changes

	React.useEffect(() => {
		async function findEncounters() {
			try {
				if (!finalDiagnoses || finalDiagnoses.length === 0) {
					// If finalDiagnoses is undefined or empty, no need to proceed
					return;
				}

				// Fetch encounters by patientId
				const patientEncounters = await getEncounterByPatientId(patientId);
				console.log("Patient Encounters:", patientEncounters);

				// Filter encounters whose contained array contains any ID from finalDiagnoses
				const foundEncounters = patientEncounters.filter((encounter) => {
					// Check if any ID in the contained array matches any ID from finalDiagnoses
					const matchingItem = encounter.resource.contained.some((item) => {
						const isMatching = finalDiagnoses.some((diagnosis) => diagnosis.id === item);
						return isMatching;
					});
					return matchingItem;
				});

				console.log("Found Encounters:", foundEncounters);
				setEncounters(foundEncounters);
			} catch (error) {
				console.error("Error finding encounters:", error);
			}
		}

		findEncounters(); // Call the function to find encounters
	}, [patientId, finalDiagnoses]); // Include finalDiagnoses as a dependency

	return (
		<>
			<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">DIAGNOSES</div>

			<table className="pt-1.5 leading-5 text-black mt-10 max-w-[914px]">
				<thead>
					<tr className="font-medium text-left">
						{variables.map((variable, index) => (
							<th key={index} className={index === 0 ? "" : ""}>
								<span className="text-sm">{variable}</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{/* Empty row for spacing */}
					<tr>
						<td colSpan={variables.length} className="h-8"></td>
					</tr>
					{finalDiagnoses.map((diagnosis, index) => {
						if (diagnosis.resource.valueString.length > 0) {
							return (
								<React.Fragment key={index}>
									{variables.map((variable, variableIndex) => (
										<td key={variableIndex} className={`${variableIndex === 0 ? "font-normal" : "mt-4 mb-4"}`}>
											<span className={`text-sm ${variable === "Diagnoses" ? "font-bold" : ""}`}>
												{variable === "Diagnoses"
													? diagnosis.resource.valueString
													: variable === "Date of Diagnosis"
														? encounters[index]?.resource.period.start
														: variable === "Doctor"
															? diagnosis.resource.participant.actor
															: diagnosis.resource[variable]}
											</span>
										</td>
									))}
									{index < finalDiagnoses.length - 1 && (
										<tr key={`gap-${index}`}>
											<td colSpan={variables.length} className="border-t border-transparent h-4" />
										</tr>
									)}
								</React.Fragment>
							);
						} else {
							return "";
						}
					})}
				</tbody>
			</table>

			<BackButton />
		</>
	);
}
