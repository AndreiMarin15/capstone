"use client";

import * as React from "react";
import ProgressBar from "../components/otherDoctorProgressBar";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/otherDoctorReferralPatients";
import ReferralDoctors from "../components/otherDoctorReferralDoctor";
import NotesAndReview from "../components/otherDoctorNotesAndReview";
import retrieveReferralData from "../../../../../lib/backend/referral/retrieveReferralData";
import sendReferralData from "../../../../../lib/backend/referral/sendReferralData";

export default function SendReferral() {
	const router = useRouter();
	const [patients, setPatients] = React.useState([]);

	const [doctors, setDoctors] = React.useState([]);

	const [currentState, setCurrentState] = React.useState(1);
	const [selectedPatientId, setSelectedPatientId] = React.useState(null);
	const [selectedDoctorId, setSelectedDoctorId] = React.useState(null);

	const [selectedPatient, setSelectedPatient] = React.useState({});
	const [selectedDoctor, setSelectedDoctor] = React.useState({});

	const [notes, setNotes] = React.useState("");

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
		<div className="bg-white flex flex-col items-stretch pb-8 h-[100vh]">
			<div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>
			<ProgressBar currentStep={currentState} />
			<>
				<div className={(currentState === 3 ? "pb-20" : "") + " overflow-auto"}>
					{patients.length > 0 && doctors.length > 0 ? (
						<>
							{currentState === 1 ? (
								patients.map((item) => (
									<div key={item.id}>
										<div
											onClick={() => {
												setSelectedPatientId(item.id);
												setSelectedPatient(item);
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
												setSelectedDoctor(item);
											}}
										>
											<ReferralDoctors
												name={item.name}
												specialization={item.specialization}
												id={item.id}
												selectedId={selectedDoctorId}
											/>
										</div>
									</div>
								))
							) : (
								<NotesAndReview
									selectedDoctor={selectedDoctor}
									selectedPatient={selectedPatient}
									notes={notes}
									setNotes={setNotes}
								/>
							)}
						</>
					) : (
						<>Loading Data...</>
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
							router.push("/other_doctor/referrals");
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
						} else if (currentState === 3) {
							const referralData = {
								patient_id: selectedPatientId,
								doctor_id: selectedDoctorId,
								notes: notes,
							};
							sendReferralData.newReferralRequest(referralData);
							router.push("/other_doctor/referrals");
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
