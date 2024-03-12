import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import VisitMedications from "./visitMedications";
import VisitLabtests from "./visitLabTests";
import CarePlanList from "./carePlanList";
import LabTestList from "./labTestList";
import BackButton from "./BackButton";
export default function ClinicVisit({ currentPage, setCurrentPage }) {
	const [currentScreen, setCurrentScreen] = useState(0);
	const followup = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Date",
			value: "2020-01-02",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Signs and Symptoms",
			value: "Frequent urination and increased thirst",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Review of Systems",
			value: "Eyes: No changes in vision, Gastrointestinal: Loose bowel movement",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Other Concerns",
			value: "Possibility of allergy due to recent skin rash",
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
			value: "2020-02-02",
		},
		
	];

	const clinicVitals = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Systolic Blood Pressure",
			value: "110",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Diastolic Blood Pressure",
			value: "90",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Heart Rate (beats/min)",
			value: "60",
		},
	];
	const clinicBiometrics = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Height (cm) ",
			value: "180",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Weight (kg)",
			value: "70",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Body Mass Index",
			value: "20",
		},
	];

	return (
		<>
			{currentScreen === 0 ? (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10">
						CLINIC VISIT #1
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
								<div className="text-large leading-5 text-black font-bold"> Vitals
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

									<div className="text-large leading-5 text-black font-bold"> Biometrics
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
					<VisitMedications currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
				</>
			)}

			{currentScreen === 2 && (
				<>
					<LabTestList currentScreen={currentScreen} setCurrentScreen={setCurrentScreen}/>
				</>
			)}
		</>
	);
}
