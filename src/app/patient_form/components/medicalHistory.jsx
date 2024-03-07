import { usePatientInfo } from "@/app/store";
import { useEffect, useState } from "react";
import { PatientSignUp as signUp } from "../../../../lib/backend/signup/patient_signup";
export default function SignUpMedicalHistory() {
	const patientStore = usePatientInfo();
	const [medications, setMedications] = useState([])
	useEffect(() => {
		const getMedications = async () => {
			const drugs = await signUp.retrieveMedications();

			console.log(drugs);
			setMedications(drugs)
		};

		getMedications();
	}, []);
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

				<div className="flex items-stretch self-stretch mt-5 flex-grow flex-col">
					<div className="text-black text-sm font-semibold leading-5">Enter Medications </div>

					<div className="flex gap-2.5 justify-between mt-2 text-lg text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
						<input
							onChange={(e) => {
								patientStore.setMedications(e.target.value);
							}}
							value={patientStore.medical_history.medications}
							type="text"
							className="text-black rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
						/>

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
							<div className="text-black text-sm font-semibold leading-5">Date of Procedures</div>

							<div className="flex justify-between gap-2.5 mt-2">
								<input
									onChange={(e) => {
										patientStore.setDateOfProcedures(e.target.value);
									}}
									value={patientStore.medical_history.date_of_procedures}
									type="date"
									className="text-black text-sm leading-5 whitespace-nowrap rounded shadow-sm flex-shrink-0  justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
									placeholder="MM"
								/>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
