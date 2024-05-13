import Image from "next/image";
import BackButton from "./BackButton";
import * as React from "react";
import { useState, useEffect } from "react";

//NO BACK END YET
// import { client } from "@/backend//initSupabase";
// import { MedicationHistoryPDF } from "./PDF_templates/medicationhistory";

export default function AttendingDoctors({ currentScreen, setCurrentScreen }) {
	// const supabase = client("public");
	const [medications, setMedications] = useState([]);
	const [attendingDoctors, setAttendingDoctors] = useState([]);

	const sampleAttendingDoctors = [
		{
			name: "Dr. Maria Santos",
			specialty: "Cardiologist",
			hospital: "RM 123 Philippine General Hospital",
			status: "Accepted",
		},
		{
			name: "Dr. Angelo Cruz",
			specialty: "Gastroenterologist",
			hospital: "RM O124 Taytay Hospital",
			status: "Accepted",
		},
	];

	useEffect(() => {
		// Load sample attending doctors when component mounts
		setAttendingDoctors(sampleAttendingDoctors);
	}, []);

	const [status, setStatus] = useState("ACCEPTED");
	// const [currentUser, setCurrentUser] = useState(null);
	const [refresh, setRefresh] = useState(false);

	React.useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				const currentUserData = await doctor.getDoctorByCurrentUser(); // Fetch current user data using the doctor module
				setCurrentUser(currentUserData);
			} catch (error) {
				console.error("Error fetching current user:", error);
			}
		};
		fetchCurrentUser();
	}, []);

	React.useEffect(() => {
		const interval = setInterval(() => {
			setRefresh((prevRefresh) => !prevRefresh);
		}, 1000); // Adjust the interval time as needed

		return () => {
			clearInterval(interval);
		};
	}, []);

	const toggleStatus = () => {
		setStatus(status === "ACCEPTED" ? "PENDING" : "ACCEPTED");
	};

	return (
		<div>
			<div className="flex flex-col">
				<div className="text-black text-base font-bold leading-5 mt-8  max-md:ml-1 max-md:mt-10 flex justify-between items-center">
					ATTENDING DOCTOR/S
					<button
						className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
						onClick={() => {
							setCurrentScreen(1);
						}}
					>
						Add
					</button>
				</div>
				<div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
					<div className="flex gap-1.5 p-2.5">
						<div className="mt-3 font-semibold text-black flex gap-1 items-center">
							Status:
							<button
								className={`flex flex-col flex-1 justify-center font-bold ${
									status === "ACCEPTED" ? "text-green-600" : "text-red-600"
								} whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none`}
								onClick={toggleStatus}
							>
								<div className="justify-center items-start py-2 pr-4 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
									{status}
								</div>
							</button>
						</div>
					</div>
					<div className="flex gap-1 my-auto text-black whitespace-nowrap leading-[150%]">
						<button className="flex gap-1 px-5 py-2 rounded-md border border-black border-solid">
							<Image
								alt="update"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
								className="shrink-0 w-3 aspect-[0.85]"
							/>
							<div className="self-start">FILTER</div>
						</button>
						<button className="grow justify-center px-6 py-2.5 rounded-md border border-black border-solid max-md:pl-5">
							SORT
						</button>
					</div>
				</div>
				{attendingDoctors
					.filter((doctor) => {
						if (status === "ACCEPTED") {
							return doctor.status === "Accepted";
						} else {
							return doctor.status === "Pending";
						}
					})
					?.map((doctor, index) => (
						<div key={index} className="mt-5 items-start text-xs leading-5 text-black max-w-[1000px]">
							<div className="items-start text-xs  text-black max-w-[1000px]">
								<div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
									<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src={
												"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
											}
											className="w-4 aspect-square"
										/>
										<div className="grow my-auto">{doctor.name}</div>
									</div>
								</div>
								<div className="flex justify-between mt-2 ml-12 gap-5">
									<div>{doctor.specialty}</div>
									<div>{doctor.hospital}</div>
									<div className="flex flex-grow justify-end">
										{doctor.status === "Accepted" && (
											<button className="border border-red-500 font-bold rounded px-3 py-1 text-red-600">Remove</button>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
				<BackButton currentScreen={2} setCurrentScreen={setCurrentScreen} />
			</div>
		</div>
	);
}
