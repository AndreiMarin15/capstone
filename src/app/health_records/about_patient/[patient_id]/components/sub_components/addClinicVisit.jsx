import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddMedications from "./addMedication";
import RequestLabTest from "./requestLabTest";
import RecordLabTest from "./recordLabTest";
import BackButton from "./BackButton";

import uploadEncounter from "../../../../../../../lib/backend/encounter/encounter";
export default function AddClinicVisit({ currentPage, setCurrentPage }) {
    const [clinicDate, setClinicDate] = useState("");
    const [suggestedClinicDate, setSuggestedClinicDate] = useState("");
    const [height, setHeight] = useState(null); 
    const [weight, setWeight] = useState(null); 
    const [bmi, setBMI] = useState(null); 
    const [systolic, setSystolic] = useState(null);
    const [diastolic, setDiastolic] = useState(null); 
    const [heartRate, setHeartRate] = useState(null);
    const [reviewOfSystems, setReviewOfSystems] = useState("");
    const [signsAndSymptoms, setSignsAndSymptoms] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
    const [otherConcerns, setOtherConcerns] = useState("");

	const handleSave = async () => {
		try {
			const dataToSave = {
				id: "example",
				period: {
					start: clinicDate,
                    suggested: suggestedClinicDate,
				},
				subject: {
					reference: "Patient/example",
				},
				contained: [
					{
						id: "height",
						code: {
							coding: [
								{
									code: "8302-2",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "cm",
							value: height,
						},
					},
					{
						id: "systolic",
						code: {
							coding: [
								{
									code: "8480-6",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "mmHg",
							value: systolic,
						},
					},
					{
						id: "diastolic",
						code: {
							coding: [
								{
									code: "8462-4",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "mmHg",
							value: diastolic,
						},
					},
					{
						id: "reviewOfSystems",
						code: {
							coding: [
								{
									code: "8687-6",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						valueString: reviewOfSystems,
						resource_type: "Observation",
					},
					{
						id: "weight",
						code: {
							coding: [
								{
									code: "29463-7",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "kg",
							value: weight,
						},
					},
					{
						id: "signsAndSymptoms",
						code: {
							coding: [
								{
									code: "33483-9",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						valueString: signsAndSymptoms,
						resource_type: "Observation",
					},
					{
						id: "bmi",
						code: {
							coding: [
								{
									code: "39156-5",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "kg/m2",
							value: bmi,
						},
					},
					{
						id: "heartRate",
						code: {
							coding: [
								{
									code: "8867-4",
									system: "http://loinc.org",
								},
							],
						},
						subject: "sample_id",
						resource_type: "Observation",
						valueQuantity: {
							unit: "beats/minute",
							value: heartRate,
						},
					},
                    {
						id: "diagnosis",
						code: {
							coding: [
								{
									code: "",
									system: "",
								},
							],
						},
						subject: "sample_id",
						valueString: diagnosis,
						resource_type: "Observation",
					},
                    {
						id: "otherConcerns",
						code: {
							coding: [
								{
									code: "",
									system: "",
								},
							],
						},
						subject: "sample_id",
						valueString: otherConcerns,
						resource_type: "Observation",
					},
                    {
						id: "suggestedNextVisit",
						code: {
							coding: [
								{
									code: "",
									system: "",
								},
							],
						},
						subject: "sample_id",
						valueString: suggestedClinicDate,
						resource_type: "Observation",
					},
				],
				resource_type: "Encounter",
			};
			// Call the uploadEncounter function with the data to save
			const savedData = await uploadEncounter(dataToSave);

			console.log("Data saved successfully:", savedData);

			// You can also update state or perform other actions after saving data
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	const date = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Date",
			value: "",
		},
	];
	const followup = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Diagnosis",
			value: "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Signs and Symptoms",
			value: "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Review of Systems",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Other Concerns",
			value: "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
			variable: "Tests",
			value: "",
			component: 2,
			requestcomponent: 3,
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Suggested Next Clinic Visit",
			value: "",
		},
	];

	const clinicVitals = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Systolic Blood Pressure",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Diastolic Blood Pressure",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Heart Rate (beats/min)",
			value: "",
		},
	];
	const clinicBiometrics = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Height (cm)",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Weight (kg)",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Body Mass Index",
			value: "",
		},
	];
	const [currentScreen, setCurrentScreen] = useState(0);

	return (
		<>
			{currentScreen === 0 ? (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
						ADD CLINIC VISIT
					</div>

					<div>
						<div className="flex gap-[4rem] align-baseline">
							<table className="max-w-fit border-spacing-y-5 border-separate">
								<tbody className="text-xs leading-5 text-black">
									{date.map((item, index) => (
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
												{item.variable === "Date" ? (
													<input
                                                    type="date"
                                                    value={clinicDate} // Bind value to clinicDate state
                                                    onChange={(e) => setClinicDate(e.target.value)} // Update clinicDate state on change
                                                    className="grow justify-center items-start py-1.5  pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]"
                                                    />
												) : (
													<>
														<input className="grow justify-center items-start py-1.5 pr-8 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5" />
														{item.variable === "" ? "" : item.value}
													</>
												)}
											</td>
										</tr>
									))}

									{followup.map((item, index) => (
										<tr
											key={index}
											className={`h-${
												item.variable === "Review of Systems" || item.variable === "Signs and Symptoms" ? "14" : "8"
											}`}
										>
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
													["Tests"].includes(item.variable) ? (
														<div className="flex gap-2">
															<button
																onClick={() => {
																	setCurrentScreen(item.component);
																}}
																className="flex gap-1.5 justify-between px-8 py-1 rounded border border-blue-800 text-blue-800 border-solid font-semibold border-1.5"
															>
																{item.variable === "Tests" ? "Record" : "Add"}
															</button>
															{item.variable === "Tests" && (
																<button
																	onClick={() => {
																		setCurrentScreen(item.requestcomponent);
																	}}
																	className="flex gap-1.5 justify-between px-8 py-1 rounded border border-blue-800 text-blue-800 border-solid font-semibold border-1.5"
																>
																	Request
																</button>
															)}
														</div>
													) : item.variable === "Suggested Next Clinic Visit" ? (
														<input
                                                            type="date"
                                                            value={suggestedClinicDate || ""}
                                                            onChange={(e) => setSuggestedClinicDate(e.target.value)}
                                                            className="grow justify-center items-start py-1.5  pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black max-md:pr-5 w-[78%]"
                                                        />
													) : (
                                                        <textarea
                                                        placeholder={
                                                            item.variable === "Diagnosis"
                                                                ? "Add Diagnosis"
                                                                : item.variable === "Signs and Symptoms"
                                                                ? "Add signs and symptoms"
                                                                : item.variable === "Review of Systems"
                                                                ? "Add Review"
                                                                : item.variable === "Other Concerns"
                                                                ? "Add Concern/s"
                                                                : ""
                                                        }
                                                        onChange={(e) => {
                                                            // Update the corresponding state variable based on the input field
                                                            if (item.variable === "Diagnosis") {
                                                                setDiagnosis(e.target.value);
                                                            } else if (item.variable === "Signs and Symptoms") {
                                                                setSignsAndSymptoms(e.target.value);
                                                            } else if (item.variable === "Review of Systems") {
                                                                setReviewOfSystems(e.target.value);
                                                            } else if (item.variable === "Other Concerns") {
                                                                setOtherConcerns(e.target.value);
                                                            }
                                                        }}
                                                        className={`grow justify-center items-start py-1.5 pl-2 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[180px]`}
                                                        style={{
                                                            height: ["Review of Systems", "Signs and Symptoms"].includes(item.variable)
                                                                ? "3rem"
                                                                : "auto",
                                                            whiteSpace: "pre-wrap",
                                                        }}
                                                        wrap="soft" // "soft" allows wrapping
                                                    />
													)
												) : (
													<div className="ml-auto">{/* Handle other cases if needed */}</div>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							{/* VITALS AND BIOMETRICS */}
							<table className="max-w-fit border-spacing-y-5 border-separate">
								<tbody className="text-xs leading-5 text-black">
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
												<td className="border-l-[5rem] border-transparent text-xs font-normal">
                                                <input
                                                    placeholder={
                                                        item.variable === "Systolic Blood Pressure"
                                                            ? "120"
                                                            : item.variable === "Diastolic Blood Pressure"
                                                            ? "80"
                                                            : item.variable === "Heart Rate (beats/min)"
                                                            ? "72"
                                                            : ""
                                                    }
                                                    value={
                                                        item.variable === "Systolic Blood Pressure"
                                                            ? systolic || ""
                                                            : item.variable === "Diastolic Blood Pressure"
                                                            ? diastolic || ""
                                                            : heartRate || ""
                                                    }
                                                    onChange={(e) => {
                                                        // Update the corresponding state variable based on the input field
                                                        if (item.variable === "Systolic Blood Pressure") {
                                                            setSystolic(e.target.value);
                                                        } else if (item.variable === "Diastolic Blood Pressure") {
                                                            setDiastolic(e.target.value);
                                                        } else if (item.variable === "Heart Rate (beats/min)") {
                                                            setHeartRate(e.target.value);
                                                        }
                                                    }}
                                                    className="grow justify-center items-start py-1.5  text-center whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[60px]"
                                                />
													{item.variable === item.value}
												</td>
											</tr>
										))}
									</div>
									<div className="text-large leading-5 text-black font-bold items-center">
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
												<td className="border-l-[5rem] border-transparent text-xs font-normal">
                                                <input
                                                    placeholder={
                                                        item.variable === "Height (cm)"
                                                            ? "180"
                                                            : item.variable === "Weight (kg)"
                                                            ? "65"
                                                            : item.variable === "Body Mass Index"
                                                            ? "20"
                                                            : ""
                                                    }
                                                    value={item.variable === "Height (cm)" ? height : item.variable === "Weight (kg)" ? weight : bmi}
                                                    onChange={(e) => {
                                                        // Update the corresponding state variable based on the input field
                                                        if (item.variable === "Height (cm)") {
                                                            setHeight(e.target.value);
                                                        } else if (item.variable === "Weight (kg)") {
                                                            setWeight(e.target.value);
                                                        } else if (item.variable === "Body Mass Index") {
                                                            setBMI(e.target.value);
                                                        }
                                                    }}
                                                    className="grow justify-center items-start py-1.5  ml-10 text-center whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] text-black w-[60px]"
                                                />
													{item.variable === item.value}
												</td>
											</tr>
										))}
									</div>
								</tbody>
							</table>
						</div>
					</div>
					{/* BACK & SAVE BUTTON */}
					<div className="flex justify-between items-center mt-5">
						<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
						<div>
							<button
								onClick={handleSave}
								className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
							>
								SAVE
							</button>
						</div>
					</div>
				</>
			) : currentScreen === 1 ? (
				<AddMedications currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
			) : currentScreen === 2 ? (
				<RecordLabTest currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
			) : currentScreen === 3 ? (
				<RequestLabTest currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
			) : (
				""
			)}
		</>
	);
}