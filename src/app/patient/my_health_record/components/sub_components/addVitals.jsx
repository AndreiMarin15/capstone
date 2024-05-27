import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importVitalsAndBiometrics } from "@/backend//patient/vitalsAndBiometrics/vitalsAndBiometrics";
import BackButton from "./BackButton";
import { currentUser, useUserInfo } from "@/app/store";

export default function AddVitals() {
	const [userId, setUserId] = useState(null);
	const [height, setHeight] = useState(null);
	const [weight, setWeight] = useState(null);
	const [bmi, setBMI] = useState(null);
	const [systolic, setSystolic] = useState(null);
	const [diastolic, setDiastolic] = useState(null);
	const [heartRate, setHeartRate] = useState(null);
	const [compactObservation, setCompactObservation] = useState([]);

	useEffect(() => {
		const insertObservations = async () => {
			if (compactObservation.length > 0) {
				await importVitalsAndBiometrics(compactObservation);
			}
		};
		insertObservations();
	}, [compactObservation]);

	const lookup = {
		height: { code: "8302-2", unit: "cm" }, //height
		weight: { code: "29463-7", unit: "kg" }, //weight
		bmi: { code: "39156-5", unit: "kg/m2" }, //bmi
		systolic: { code: "8480-6", unit: "mmHg" }, //systolic
		diastolic: { code: "8462-4", unit: "mmHg" }, //diastolic
		heartRate: { code: "8867-4", unit: "beats/minute" }, //heartRate
	};

	function convertToObservation(type, value) {
		return {
			status: "created",
			resource: {
				id: type,
				code: {
					coding: [
						{
							code: lookup[type].code,
							system: "http://loinc.org",
						},
					],
				},
				subject: currentUser.getState().info.id,
				resource_type: "Observation",
				valueQuantity: {
					unit: lookup[type].unit,
					value: value,
				},
			},
		};
	}

	const createCompactObservation = () => {
		const observationInsert = [];
		observationInsert.push(convertToObservation("height", height));
		observationInsert.push(convertToObservation("weight", weight));
		observationInsert.push(convertToObservation("bmi", bmi));
		observationInsert.push(convertToObservation("systolic", systolic));
		observationInsert.push(convertToObservation("diastolic", diastolic));
		observationInsert.push(convertToObservation("heartRate", heartRate));

		setCompactObservation(observationInsert);
	};

	const vitals = [
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
	const biometrics = [
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
	return (
		<>
			<table className="max-w-fit border-spacing-y-5 border-separate">
				<tbody className="text-xs leading-5 text-black">
					<div className="text-large leading-5 text-black font-bold">
						{" "}
						Vitals
						{vitals?.map((item, index) => (
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
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
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
						{biometrics?.map((item, index) => (
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
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
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
			{/* BACK & SAVE BUTTON */}
			<div className="flex justify-between items-center mt-5">
				<BackButton />
				<div>
					<button
						onClick={() => {
							createCompactObservation();
						}}
						className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
					>
						SAVE
					</button>
				</div>
			</div>
		</>
	);
}
