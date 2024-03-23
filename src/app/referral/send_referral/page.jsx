"use client";

import * as React from "react";
import ProgressBar from "../components/progressBar";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/referralPatients";
import ReferralDoctors from "../components/referralDoctor";
import NotesAndReview from "../components/notesAndReview";
import retrieveReferralData from "../../../../lib/backend/referral/retrieveReferralData";

export default function SendReferral() {
	const [patients, setPatients] = React.useState([]);

	const [doctors, setDoctors] = React.useState([]);
	const router = useRouter();
	const [currentState, setCurrentState] = React.useState(1);
	const [selectedPatientId, setSelectedPatientId] = React.useState(null);
	const [selectedDoctorId, setSelectedDoctorId] = React.useState(null);
	const handleSelect = () => {
		if (currentState < 3) {
			setCurrentState(currentState + 1);
		}
		console.log(currentState);
	};

	const handleBack = () => {
		if (currentState > 1) {
			setCurrentState(currentState - 1);
		}
	};

	React.useEffect(() => {
		console.log(currentState);
	}, [currentState]);

	React.useEffect(() => {
		console.log(patients, doctors);
	}, [patients, doctors]);
	React.useEffect(() => {
		const fetchData = async () => {
			const patients = await retrieveReferralData.getPatients();
			const doctors = await retrieveReferralData.getDoctors();

			console.log(patients);

			console.log(doctors);
			setPatients(patients);
			setDoctors(doctors);
		};

		fetchData();
	}, []);

	return (
		<div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300 h-[120vh]">
			<div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>
			<ProgressBar currentStep={currentState} />
			<>
				<div className={currentState === 3 ? "pb-20" : ""}>
					{patients.length > 0 && doctors.length > 0 && (
						<>
							{currentState === 1 ? (
								patients.map((item) => (
									<div key={item.id}>
										<div
											onClick={() => {
												setSelectedPatientId(item.id);
											}}
										>
											<ReferralPatients name={item.name} age={item.age} id={item.id} selectedId={selectedPatientId} />
										</div>
									</div>
								))
							) : currentState === 2 ? (
								doctors.map((item) => (
									<div key={item.id}>
										<div
											onClick={() => {
												setSelectedDoctorId(item.id);
											}}
										>
											<ReferralDoctors name={item.name} age={item.age} id={item.id} selectedId={selectedDoctorId} />
										</div>
									</div>
								))
							) : (
								<NotesAndReview />
							)}
						</>
					)}
				</div>
			</>
			<div className="w-full flex justify-between px-14 max-md:max-w-full max-md:px-5">
				{currentState > 1 ? (
					<button
						onClick={() => {
							if (currentState > 1) {
								setCurrentState(currentState - 1);
							}
						}}
						className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2 px-6 py-2 rounded max-md:px-3"
					>
						BACK
					</button>
				) : (
					<div></div>
				)}

				{currentState === 1 && (
					<button
						onClick={() => {
							router.push("/referral");
						}}
						className="mt-5 text-white text-xs font-semibold whitespace-nowrap items-stretch bg-gray-400 mr-2 px-6 py-2 rounded"
						style={{ marginRight: "auto" }}
					>
						BACK
					</button>
				)}

				<button
					onClick={() => {
						if (currentState < 3) {
							setCurrentState(currentState + 1);
						}
					}}
					className={`mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2 px-6 py-2 rounded max-md:px-3`}
				>
					{currentState === 3 ? "SEND" : "NEXT"}
				</button>
			</div>
		</div>
	);
}
