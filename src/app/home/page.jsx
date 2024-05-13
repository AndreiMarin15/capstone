"use client";

import Image from "next/image";
import * as React from "react";
import dashboard from "@/backend//doctor/doctor_dashboard/dashboard";

export default function Home() {
	const [editState, setEditState] = React.useState(false);
	const [doctorInfo, setDoctor] = React.useState({
		photoSrc:
			"https://cdn.builder.io/api/v1/image/assets/TEMP/e08e006064acc91eb2be418d8e3ebc37f55fda5b8a64767df11d658a5723ca26?apiKey=66e07193974a40e683930e95115a1cfd&",
		name: "John Doe",
		specialization: "Internal Medicine",
		yearsOfExperience: 8,
		about:
			"I am an Endocrinologist practicing for 5 years. You can reach me through Cardinal Santos clinic’s telephone number +888888.",
	});

	const [managedPatients, setPatients] = React.useState([
		{
			name: "Dela Cruz, Juan",
			handledBy: [
				{
					name: "Dr. Aimee Ramirez",
					specialty: "Nephrologist",
				},
			],
		},
	]);

	const [notifications, setNotifications] = React.useState([
		{
			imageSrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/4e200b4f856742582f5e0e389be9f0e37a54ceeade0f863f225fac2f02a2371f?apiKey=66e07193974a40e683930e95115a1cfd&",
			title: "Messages",
			content: "You have 4 unread messages.",
		},
		{
			imageSrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/dea6bee3adc06f5e28838c43497ed31c14d61da632e1e5c0d2cbf2d92a1cd813?apiKey=66e07193974a40e683930e95115a1cfd&",
			title: "Referral",
			content: "You have an unread message from Dr. Maria Santos",
		},
		{
			imageSrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/dea6bee3adc06f5e28838c43497ed31c14d61da632e1e5c0d2cbf2d92a1cd813?apiKey=66e07193974a40e683930e95115a1cfd&",
			title: "Referral",
			content: "You have an unread message from Dr. Aimee Ramirez",
		},
	]);

	React.useEffect(() => {
		const retrieveData = async () => {
			const doctor = await dashboard.getDoctorData();
			setDoctor({
				photoSrc:
					"https://cdn.builder.io/api/v1/image/assets/TEMP/e08e006064acc91eb2be418d8e3ebc37f55fda5b8a64767df11d658a5723ca26?apiKey=66e07193974a40e683930e95115a1cfd&",
				name: doctor.name,
				specialization: doctor.specialization,
				yearsOfExperience: doctor.yearsOfExperience,
				about: doctor.about ?? "No Information Provided",
			});
		};

		retrieveData();
	}, []);

	React.useEffect(() => {
		const getPatients = async () => {
			const patients = await dashboard.getPatients();

			console.log(patients);

			const formattedPatientsPromises = patients?.map(async (patient) => {
				const doctors = await dashboard.getHandledBy(patient.handled_by.referred_practitioners ?? []);

				console.log(doctors);
				return {
					name: `${patient?.personal_information?.first_name ?? ""} ${patient?.personal_information?.last_name ?? ""}`,
					handledBy:
						doctors.data.length > 0
							? doctors.data?.map((doctor) => ({
									name: `${doctor.first_name} ${doctor.last_name}`,
									specialty: "Cardiologist",
								}))
							: [
									{
										name: doctorInfo.name,
										specialty: doctorInfo.specialization,
									},
								],
				};
			});

			const formattedPatients = await Promise.all(formattedPatientsPromises);
			console.log(formattedPatients);
			setPatients(formattedPatients);
		};

		getPatients();
	}, []);

	React.useEffect(() => {
		console.log(managedPatients);
	}, [managedPatients]);
	return (
		<div className={" bg-white flex flex-col items-stretch " + (managedPatients.length > 3 ? "h-auto" : "h-[100vh]")}>
			<div className="w-full px-5 max-md:max-w-full h-[100vh]">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
					<div className="flex flex-col items-stretch w-[49%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col items-stretch my-auto pt-10 max-md:max-w-full max-md:mt-10">
							<div className="text-black text-xl font-semibold leading-8 max-md:max-w-full">Home</div>
							<div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex justify-between gap-5 mt-6 pl-14 pr-2.5 py-6 rounded border-solid items-start max-md:max-w-full max-md:flex-wrap max-md:pl-5">
								<Image
									alt="picture"
									height={0}
									width={0}
									loading="lazy"
									src={doctorInfo.photoSrc}
									className="aspect-square object-contain object-center w-14 overflow-hidden shrink-0 max-w-full mt-4"
								/>
								<span className="self-stretch flex grow basis-[0%] flex-col max-md:max-w-full">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/730d2ab85133d5682bb6f3ed87608a6813275f4528df2353bda8d0db54e60882?apiKey=66e07193974a40e683930e95115a1cfd&"
										onClick={() => {
											setEditState(!editState);
										}}
										className="aspect-square object-contain object-center w-5 overflow-hidden max-w-full self-end"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-stretch max-md:max-w-full">
										Dr. {doctorInfo.name}
									</div>
									<div className="text-black text-xs leading-5 self-stretch mt-2.5 max-md:max-w-full">
										<span className="font-medium">Specialization</span>: {doctorInfo.specialization}
									</div>
									<div className="text-black text-xs leading-5 self-stretch mt-2 max-md:max-w-full">
										<span className="font-medium">Years of Experience</span>:{" "}
										{!editState ? (
											doctorInfo.yearsOfExperience
										) : (
											<input
												type="number"
												className="border border-black rounded-md shadow-sm bg-white border-solid p-2"
												value={doctorInfo.yearsOfExperience}
												onChange={(e) => setDoctor({ ...doctorInfo, yearsOfExperience: e.target.value })}
											/>
										)}
									</div>
									<div className="text-black text-xs leading-5 self-stretch mt-11 max-md:max-w-full max-md:mt-10">
										About Doctor: <br />
										{!editState ? (
											doctorInfo.about
										) : (
											<textarea
												className="border border-black rounded-md shadow-sm bg-white border-solid p-2 h-36 w-full"
												value={doctorInfo.about}
												onChange={(e) => {
													setDoctor({ ...doctorInfo, about: e.target.value });
												}}
											/>
										)}
									</div>
									{editState && (
										<button
											onClick={() => {
												dashboard.updateDoctorInfo(doctorInfo.about, doctorInfo.yearsOfExperience);
												setEditState(false);
											}}
											className="bg-blue-500 p-2 rounded-md text-white"
										>
											Save
										</button>
									)}
								</span>
							</div>
							<div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex flex-col my-6 pl-8 pr-20 py-10 border-solid items-start max-md:max-w-full max-md:px-5">
								<span className="flex items-stretch justify-between gap-5">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/859711bfb179eea2831ffb5fb15c526ddcabc0f40d5059ab0fdd63e056afa3bb?apiKey=66e07193974a40e683930e95115a1cfd&"
										className="aspect-square object-contain object-center w-[17px] overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto">
										Multidisciplinary Managed Patients
									</div>
								</span>
								<div className="flex gap-4 mt-8 items-start w-full overflow-auto" style={{ maxHeight: "300px" }}>
									<span className="self-stretch flex grow basis-[0%] flex-col items-stretch">
										{managedPatients
											.filter((patient) => patient.handledBy.length > 0) // Filter patients with more than 1 doctor
											?.map((patient) => (
												<>
													<div className="text-black text-xs font-semibold leading-5">{patient.name}</div>
													<span className="flex flex-col items-stretch  mb-2">
														{patient.handledBy?.map((doctor) => {
															console.log(patient);
															return (
																<>
																	{" "}
																	<div className="text-black text-xs leading-5 mt-2">
																		Handled by Dr. {doctor.name} - {doctor.specialty}
																	</div>
																</>
															);
														})}
													</span>
													<div className="border-b border-gray-300 w-full mb-4"></div>
												</>
											))}
									</span>
								</div>
							</div>
						</span>
					</div>
					<div className="flex flex-col items-stretch w-[30%] ml-5 max-md:w-full max-md:ml-0">
						<div className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex w-full flex-col items-stretch m-auto pt-4 pb-12 px-7 border-solid max-md:mt-10 max-md:px-5">
							<span className="flex items-stretch justify-between gap-5">
								<Image
									alt="picture"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cf686ec2e95bccdc2019a3ed27571cb8d91814d20d6e3653960477e65ab4a27?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-[1.18] object-contain object-center w-5 fill-black overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-black text-xs font-semibold leading-5 self-center grow shrink basis-auto my-auto">
									Notifications
								</div>
							</span>
							{notifications?.map((notification) => (
								<div
									key={notification.title}
									className="border border-[color:var(--background-background-600,#E8E8E8)] shadow-sm bg-white flex justify-between gap-3.5 mt-3.5 pl-5 pr-20 pt-3 pb-6 rounded border-solid items-start max-md:pr-5"
								>
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src={notification.imageSrc}
										className="aspect-square object-contain object-center w-[22px] overflow-hidden shrink-0 max-w-full"
									/>
									<span className="flex grow basis-[0%] flex-col items-stretch">
										<div className="text-black text-xs font-medium leading-5">{notification.title}</div>
										<div className="text-black text-xs leading-5 mt-2.5">{notification.content} </div>
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
