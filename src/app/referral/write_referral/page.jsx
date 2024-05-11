"use client";

import * as React from "react";
import ProgressBarWrite from "../components/progressBarWrite";
import { useRouter } from "next/navigation";
import ReferralPatients from "../components/referralPatients";
import WriteReferral from "../components/writeReferral";
import retrieveReferralData from "@/backend//referral/retrieveReferralData";
import sendReferralData from "@/backend//referral/sendReferralData";

export default function SendReferral() {
	const router = useRouter();
	const [patients, setPatients] = React.useState([]);
	const [currentState, setCurrentState] = React.useState(1);
	const [selectedPatientId, setSelectedPatientId] = React.useState(null);

	const [referralData, setReferralData] = React.useState({
		doctor_name: "",
		specialization: "",
		place_of_clinic: "",
		reason_for_referral: "",
		medications: "",
		other_remarks: "",
	});

	React.useEffect(() => {
		const fetchData = async () => {
			const patients = await retrieveReferralData.getFilteredPatients();
			console.log(patients);
			setPatients(patients);
		};

		fetchData();
	}, []);

	return (
		<div className="bg-white flex flex-col items-stretch pb-8 h-[100vh]">
			<div className="ml-6 mt-8 text-black text-xl font-semibold leading-8">Referral</div>
			<ProgressBarWrite currentStep={currentState} />
			<>
				<div className={(currentState === 2 ? "pb-20" : "") + " overflow-auto"}>
					{patients.length > 0 ? (
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
							) : (
								<WriteReferral referralData={referralData} setReferralData={setReferralData} />
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
							router.back();
						}}
						className="mt-5 text-white text-xs font-semibold whitespace-nowrap items-stretch bg-gray-400 mr-2 px-6 py-2 rounded"
						style={{ marginRight: "auto" }}
					>
						BACK
					</button>
				)}

				<button
					onClick={async () => {
						if (currentState < 2) {
							setCurrentState(currentState + 1);
						} else if (currentState === 2) {
							await sendReferralData.sendWrittenReferral(referralData, selectedPatientId);
							router.push("/referral");
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
