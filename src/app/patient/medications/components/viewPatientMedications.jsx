import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LabTestList from "../../lab_tests/page";
import { getMedicationRequests } from "../../../../../lib/backend/health_records/getMedicationRequest";
import BackButton from "../../personal_details/components/sub_components/BackButton";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ViewMedications({ currentScreen, setCurrentScreen, medicationId }) {
	const pdfRef = React.useRef();
	const [medicineData, setMedicineData] = useState({
		medicineName: "",
		doseUnit: "",
		form: "",
		frequency: "",
		note: "",
		medicationStart: "",
		medicationEnd: "",
		sideEffect: "",
	});

	const dosage = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Medicine Name",
			value: medicineData.medicineName || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Dose/Unit",
			value: medicineData.doseUnit || "",
		},

		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ca34a79ae329b93379bbd953f43e6ea160ba22c48c92444cb1f35e3abeb03a50?",
			variable: "Form",
			value: medicineData.form || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
			variable: "Frequency",
			value: medicineData.frequency || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
			variable: "Patient Instructions",
			value: medicineData.note || "",
		},
	];

	const prescription = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Start Date",
			value: medicineData.medicationStart || "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "End Date",
			value: medicineData.medicationEnd || "",
		},
	];

	const others = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9cf040cc2fe578c14734fb9453f32c80a0fee5cad6206277a97628c75d51fee5?",
			variable: "Possible Side Effects",
			value: medicineData.sideEffect || "",
		},
	];

	React.useEffect(() => {
		const fetchMedications = async () => {
			try {
				const medicationRequestsData = await getMedicationRequests();
				console.log("Medication Requests Data:", medicationRequestsData);

				// Find the medication with the specified medicationId
				const filteredMedication = medicationRequestsData.find((medication) => medication.resource.id === medicationId);

				// Check if the filtered medication exists
				if (filteredMedication) {
					const medicationResource = filteredMedication.resource;

					// Extract relevant data from the medication resource
					setMedicineData({
						medicineName: medicationResource.medicationCodeableConcept[0]?.text || "",
						doseUnit: medicationResource.dosageInstruction[0]?.doseAndRate[0]?.doseQuantity?.doseUnit || "",
						form: medicationResource.form?.text || "",
						frequency: medicationResource.dispenseRequest?.dispenseInterval || "",
						note: medicationResource.note || "",
						medicationStart: medicationResource.dispenseRequest?.validityPeriod?.start || "",
						medicationEnd: medicationResource.dispenseRequest?.validityPeriod?.end || "",
						sideEffect: medicationResource.adverseEvent?.adverseReaction || "",
					});
				} else {
					// Handle case where no medication is found with the specified medicationId
					console.log("No medication found with the specified medicationId:", medicationId);
				}
			} catch (error) {
				console.error("Error fetching medication requests:", error);
			}
		};

		fetchMedications();
	}, [medicationId]);

	const [currentScreen3, setCurrentScreen3] = useState(0);
	const downloadPDF = () => {
		const input = pdfRef.current;

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF("landscape");
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save(`Medication_${medicineData.medicineName}.pdf`);
		});
	};
	return (
		<>
			{(currentScreen3 === 0 || currentScreen === 1) && (
				<>
					<div className="border h-screen w-full flex flex-col bg-white border-solid border-stone-300">
						<div className="items-stretch justify-between gap-5 mt-11 px-20 py-10">
							<div onClick={downloadPDF} className="text-blue-500 text-xs  flex items-center hover:cursor-pointer">
								<Image
									height={0}
									width={0}
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
									alt="icon"
									className="w-4 mr-2"
								/>
								<span>Download(.pdf)</span>
							</div>
							<span className="flex flex-col items-stretch">
								<div className="text-black text-base font-bold leading-5 mt-8 mb-5">VIEW MEDICATION</div>
							</span>
							<div ref={pdfRef} className="flex gap-[4rem] p-3">
								<table className="border-spacing-y-7 border-separate">
									<tbody className="text-xs leading-5 text-black">
										<div className="text-xs leading-5 text-black">
											<span className="font-bold"> Dosage Instructions</span>
											{dosage.map((item, index) => (
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
										</div>
									</tbody>
								</table>
								<table className="border-spacing-y-7 border-separate">
									<tbody className="text-xs leading-5 text-black">
										<div className="text-xs leading-5 text-black font-bold">
											Prescription Duration
											{prescription.map((item, index) => (
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
													</td>{" "}
												</tr>
											))}
										</div>

										<div className="text-xs leading-5 text-black font-bold">
											Other Remarks
											{others.map((item, index) => (
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
														<div className="text-black text-xs font-normal leading-5 ml-10">{item.value}</div>
													</td>
												</tr>
											))}
										</div>
									</tbody>
								</table>
							</div>

							<BackButton currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
						</div>
					</div>
				</>
			)}
		</>
	);
}
