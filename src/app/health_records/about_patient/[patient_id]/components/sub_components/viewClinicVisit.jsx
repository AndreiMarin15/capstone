import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitMedications from "./visitMedications";
import VisitLabtests from "./visitLabTests";
import LabTestList from "./labTestList";
import BackButton from "./BackButton";
import { getEncounters } from "../../../../../lib/backend/health_records/getEncounter";
import { getObservation } from "../../../../../lib/backend/health_records/getObservation";
export default function ViewClinicVisit({ currentPage, setCurrentPage, patientId, encounterId, clinicVisitNumber }) {
	const [currentScreen, setCurrentScreen] = useState(0);
	const [followupData, setFollowupData] = useState([]);
	const [encounterDate, setEncounterDate] = useState("");
	const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
	const [diagnosis, setDiagnosis] = useState("");
	const [finalDiagnosis, setFinalDiagnosis] = useState("");
	const [reviewOfSystems, setReviewOfSystems] = useState("");
	const [otherConcerns, setOtherConcerns] = useState("");
	const [suggestedNextVisit, setSuggestedNextVisit] = useState("");
	const [systolic, setSystolic] = useState(null);
	const [diastolic, setDiastolic] = useState(null);
	const [heartRate, setHeartRate] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [bmi, setBMI] = useState(null);

	const followup = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Date",
			value: encounterDate || "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Initial Diagnosis",
			value: diagnosis || "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Final Diagnosis",
			value: finalDiagnosis || "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Signs and Symptoms",
			value: signsAndSymptoms || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Review of Systems",
			value: reviewOfSystems || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Other Concerns",
			value: otherConcerns || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
			variable: "Tests",
			value: {
				label: "View",
				onClick: () => {
					setCurrentScreen(currentScreen + 2);
				},
			},
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Suggested Next Clinic Visit",
			value: suggestedNextVisit || "",
		},
	];

	const clinicVitals = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Systolic Blood Pressure",
			value: systolic || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Diastolic Blood Pressure",
			value: diastolic || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Heart Rate (beats/min)",
			value: heartRate || "",
		},
	];

	const clinicBiometrics = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Height (cm) ",
			value: height || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Weight (kg)",
			value: weight || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Body Mass Index",
			value: bmi || "",
		},
	];

	const [containedIDs, setContainedIDs] = useState([]);

	React.useEffect(() => {
		async function fetchEncountersAndObservations() {
			try {
				// Fetch encounters
				const encountersData = await getEncounters();

				// Find the encounter with the matching ID
				const selectedEncounter = encountersData.find((encounter) => encounter.id === encounterId);
				console.log(selectedEncounter);

				if (!selectedEncounter) {
					console.error("Encounter not found with ID:", encounterId);
					return;
				}
				setEncounterDate(selectedEncounter.resource.period.start);

				// Extract contained IDs from the selected encounter
				const encounterContained = selectedEncounter.resource.contained;
				const uniqueContainedIDs = new Set();
				if (Array.isArray(encounterContained) && encounterContained.length > 0) {
					encounterContained.forEach((id) => {
						uniqueContainedIDs.add(id);
					});
				}

				// Convert the Set back to an array and update state
				const newContainedIDs = Array.from(uniqueContainedIDs);
				setContainedIDs(newContainedIDs);
				console.log(newContainedIDs);
				// Fetch observations
				const observationsData = await getObservation();

				const observationIds = observationsData.map((observation) => observation.id);

				// Filter observationIds by newContainedIDs
				const filteredObservationIds = observationIds.filter((id) => newContainedIDs.includes(id));

				// Extract data within observation.resource based on filteredObservationIds
				const filteredObservationData = observationsData
					.filter((observation) => filteredObservationIds.includes(observation.id))
					.map((observation) => observation.resource);

				const diagnosisObservation = filteredObservationData.find((observation) => observation.id === "diagnosis");

				if (diagnosisObservation) {
					setDiagnosis(diagnosisObservation.valueString);
					console.log(diagnosisObservation.valueString);
				}

				const finalDiagnosisObservation = filteredObservationData.find(
					(observation) => observation.id === "finalDiagnosis"
				);

				if (finalDiagnosisObservation) {
					setFinalDiagnosis(finalDiagnosisObservation.valueString);
					console.log(finalDiagnosisObservation.valueString);
				}

				const signsAndSymptomsObservation = filteredObservationData.find(
					(observation) => observation.id === "signsAndSymptoms"
				);

				if (signsAndSymptomsObservation) {
					setSignsAndSymptoms(signsAndSymptomsObservation.valueString);
					console.log(signsAndSymptomsObservation.valueString);
				}

				const reviewOfSystemsObservation = filteredObservationData.find(
					(observation) => observation.id === "reviewOfSystems"
				);
				if (reviewOfSystemsObservation) {
					setReviewOfSystems(reviewOfSystemsObservation.valueString);
					console.log(reviewOfSystemsObservation.valueString);
				}

				const otherConcernsObservation = filteredObservationData.find(
					(observation) => observation.id === "otherConcerns"
				);
				if (otherConcernsObservation) {
					setOtherConcerns(otherConcernsObservation.valueString);
					console.log(otherConcernsObservation.valueString);
				}

				const suggestedNextVisitObservation = filteredObservationData.find(
					(observation) => observation.id === "suggestedNextVisit"
				);
				if (suggestedNextVisitObservation) {
					setSuggestedNextVisit(suggestedNextVisitObservation.valueString);
					console.log(suggestedNextVisitObservation.valueString);
				}

				const systolicObservation = filteredObservationData.find((observation) => observation.id === "systolic");
				if (systolicObservation) {
					setSystolic(systolicObservation.valueQuantity.value);
				}

				const diastolicObservation = filteredObservationData.find((observation) => observation.id === "diastolic");
				if (diastolicObservation) {
					setDiastolic(diastolicObservation.valueQuantity.value);
				}

				const heartRateObservation = filteredObservationData.find((observation) => observation.id === "heartRate");
				if (heartRateObservation) {
					setHeartRate(heartRateObservation.valueQuantity.value);
				}

				const heightObservation = filteredObservationData.find((observation) => observation.id === "height");
				if (heightObservation) {
					setHeight(heightObservation.valueQuantity.value);
				}

				const weightObservation = filteredObservationData.find((observation) => observation.id === "weight");
				if (weightObservation) {
					setWeight(weightObservation.valueQuantity.value);
				}

				const bmiObservation = filteredObservationData.find((observation) => observation.id === "bmi");
				if (bmiObservation) {
					setBMI(bmiObservation.valueQuantity.value);
				}

				console.log(filteredObservationData);
			} catch (error) {
				console.error("Error fetching encounters and observations:", error);
			}
		}

		fetchEncountersAndObservations();
	}, [patientId, encounterId]);

	return (
		<>
			{currentScreen === 0 ? (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
						CLINIC VISIT {clinicVisitNumber}
					</div>

					<div>
						<div className="flex gap-[4rem] align-baseline">
							<table className="max-w-fit border-spacing-y-7 border-separate">
								<tbody className=" text-xs leading-5 text-black">
									{followup.map((item, index) => (
										<tr key={index} className="h-8">
											<td className="w-5">
												<Image
													alt="image"
													height={0}
													width={0}
													loading="lazy"
													src={item.src}
													className="self-start aspect-square fill-black w-[15px]"
												/>
											</td>
											<td className="border-l-[16px] border-transparent">
												<div className="text-black text-xs font-semibold leading-5 self-center my-auto">
													{item.variable}
												</div>
											</td>
											<td className="border-l-[5rem] border-transparent">
												{typeof item.value === "string" ? (
													<div className="text-black text-xs leading-5 ml-auto">{item.value}</div>
												) : (
													<div className="ml-auto">
														<button
															onClick={item.value.onClick}
															className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[3.33] font-semibold text-xs border-1.5 bg-blue-900 text-white"
														>
															{item.value.label}
														</button>
													</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{/*  VITALS AND BIOMETRICS */}
							<table className="max-w-fit border-spacing-y-7 border-separate">
								<tbody className=" text-xs leading-5 text-black">
									<div className="text-large leading-5 text-black font-bold">
										{" "}
										Vitals
										{clinicVitals.map((item, index) => (
											<tr key={index} className="h-8">
												<td className="w-5">
													<Image
														alt="image"
														height={0}
														width={0}
														loading="lazy"
														src={item.src}
														className="self-start aspect-square fill-black w-[15px]"
													/>
												</td>
												<td className="border-l-[16px] border-transparent">
													<div className="text-black text-xs font-semibold leading-5 self-center my-auto">
														{item.variable}
													</div>
												</td>
												<td className="border-l-[5rem] border-transparent">
													<div className="text-black text-xs font-normal leading-5 ml-auto">
														{item.variable === "Heart Rate" ? 70 : item.value}
													</div>
												</td>
											</tr>
										))}
									</div>

									<div className="text-large leading-5 text-black font-bold">
										{" "}
										Biometrics
										{clinicBiometrics.map((item, index) => (
											<tr key={index} className="h-8">
												<td className="w-5">
													<Image
														alt="image"
														height={0}
														width={0}
														loading="lazy"
														src={item.src}
														className="self-start aspect-square fill-black w-[15px]"
													/>
												</td>
												<td className="border-l-[16px] border-transparent">
													<div className="text-black text-xs font-semibold leading-5 self-center my-auto">
														{item.variable}
													</div>
												</td>
												<td className="border-l-[5rem] border-transparent">
													<div className="text-black text-xs font-normal leading-5 ml-10">
														{item.variable === "Heart Rate" ? 70 : item.value}
													</div>
												</td>
											</tr>
										))}
									</div>
								</tbody>
							</table>
						</div>
					</div>
					<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : (
				""
			)}

			{currentScreen === 1 && (
				<>
					<VisitMedications currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
				</>
			)}

			{currentScreen === 2 && (
				<>
					<LabTestList
						currentScreen={currentScreen}
						setCurrentScreen={setCurrentScreen}
						patientId={patientId}
						encounterId={encounterId}
						clinicVisitNumber={clinicVisitNumber}
					/>
				</>
			)}
		</>
	);
}
