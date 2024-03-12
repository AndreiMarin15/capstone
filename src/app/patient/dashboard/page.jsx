"use client";
import Image from "next/image";
import * as React from "react";
import dashboard from "../../../../lib/backend/patient/patient_dashboard/dashboard";
export default function Dashboard() {
	const [patientData, setPatient] = React.useState({
		name: "Juan Dela Cruz",
		age: 74,
		gender: "Male",
		birthday: "01 January 1950",
		address: "Quezon City",
		allergies: [],
		contact: "+63 917 000 000",
		memberSince: "06 January 2024",
		bmi: "24.9",
	});

	React.useEffect(() => {
		const getData = async () => {
			const patient = await dashboard.getPatientData();
      console.log(patient)

      setPatient(patient)
		};

		getData();
	}, []);

	return (
		<div className="px-5 w-full max-md:max-w-full h-auto bg-white">
			<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
				<div className="flex flex-col ml-5 w-[50%] max-md:ml-0 max-md:w-full">
					<div className="flex flex-col self-stretch my-auto max-md:mt-10 max-md:max-w-full">
						<div className="text-xl font-semibold leading-8 mt-10 text-black max-md:max-w-full">Dashboard</div>
						<div className="px-16 py-8 mt-6 bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:max-w-full">
							<div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
								<div className="flex flex-col max-md:ml-0 max-md:w-full">
									<Image
										alt="image"
										width={0}
										height={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/2973ce194094175870e4010225d7995b70a4add3f96a4c16d2302409e5e7ccd8?"
										className="w-14 aspect-square max-md:mt-10"
									/>
								</div>
								<div className="flex flex-col max-md:ml-0 max-md:w-full">
									<div className="flex flex-col self-stretch my-auto text-xs leading-5 text-black max-md:mt-10">
										<div className="font-semibold">{patientData.name}</div>
										<div className="flex gap-5 justify-between">
											<div>{patientData.age} years old</div>
											<div>{patientData.gender}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col justify-center px-7 py-7 mt-6 text-xs font-semibold leading-4 bg-white border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] text-zinc-500 max-md:px-5 max-md:max-w-full">
							<div className="flex gap-5 justify-between pr-5 max-md:flex-wrap max-md:max-w-full">
								<div className="flex flex-col flex-1">
									<div>Date of Birth</div>
									<div className="text-xs font-medium text-black whitespace-nowrap">{patientData.birthday}</div>
									<div className="mt-8 whitespace-nowrap">Contact Number</div>
									<div className="text-xs font-medium text-black whitespace-nowrap">{patientData.contact}</div>
								</div>
								<div className="flex flex-col flex-1">
									<div>Address</div>
									<div className="text-xs font-medium text-black ">{patientData.address}</div>
									<div className="mt-8">Member Since</div>
									<div className="text-xs font-medium text-black">{patientData.memberSince}</div>
								</div>
								<div className="flex flex-col flex-1 whitespace-nowrap">
									<div>Allergies</div>
									<div className="text-xs font-medium text-black">
										{patientData.allergies.length > 0 ? patientData.allergies.map((allergy) => <>{allergy.allergen}</>) : "None"}
									</div>
									<div className="mt-8">BMI</div>
									<div className="text-xs font-medium text-black">{patientData.bmi}</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col items-start py-6 pr-20 pl-8 mt-6 text-xs leading-5 text-black bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:max-w-full">
							<div className="text-base font-semibold">Latest Care Plan(s)</div>
							<div className="mt-4 font-semibold text-blue-500">Care Plan #2</div>
							<div className="flex gap-1 mt-3.5 whitespace-nowrap">
								<Image
									alt="image"
									width={0}
									height={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d2d16adc26cdf297cc56f2b11bf7445f300308e55e3580060a017039d865f09?"
									className="self-start w-3 aspect-square"
								/>
								<div className="grow">From Dr. John Doe - Endocrinologist</div>
							</div>
							<div className="flex gap-1 mt-1.5 whitespace-nowrap">
								<Image
									alt="image"
									width={0}
									height={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/c143ab5d1cdb22259fa52ecbdeff08a38239d2dc5c1367b795e50464ab9c2249?"
									className="w-2.5 aspect-square"
								/>
								<div className="flex-auto">2023-08-05</div>
							</div>
							<div className="mt-3.5 font-semibold text-blue-500">Prescribed Medication(s)</div>
							<div className="flex gap-5 justify-between pr-8 mt-1.5 max-w-full whitespace-nowrap w-[229px] max-md:pr-5">
								<div className="flex flex-col font-semibold">
									<div>Brand Name</div>
									<div className="mt-1.5">Generic Name</div>
									<div className="mt-1.5">Dose</div>
									<div className="mt-1.5">Form</div>
									<div className="mt-1.5">Quantity</div>
								</div>
								<div className="flex flex-col">
									<div>Metformin</div>
									<div className="mt-1.5">Metformin</div>
									<div className="mt-1.5">50 mg</div>
									<div className="mt-1.5">Tablet</div>
									<div className="mt-1.5">30</div>
								</div>
							</div>
							<div className="mt-11 text-xs font-medium text-blue-500 underline max-md:mt-10">
								View Complete Care Plan
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col ml-5 w-[40%] max-md:ml-0 max-md:w-full">
					<div className="flex flex-col self-stretch px-10 pt-7 pb-12 m-auto w-full text-xs text-black bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5 max-md:mt-10">
						<div className="flex gap-3 justify-between text-base font-semibold leading-6">
							<Image
								alt="image"
								width={0}
								height={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/5cf686ec2e95bccdc2019a3ed27571cb8d91814d20d6e3653960477e65ab4a27?"
								className="w-5 aspect-[1.18] fill-black"
							/>
							<div className="flex-auto">Recent Activity</div>
						</div>
						<div className="flex flex-col pt-2.5 pr-12 pb-4 pl-5 mt-8 w-full bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:pr-5">
							<div className="flex gap-2.5 justify-between font-medium whitespace-nowrap leading-[150%]">
								<Image
									alt="image"
									width={0}
									height={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/4e200b4f856742582f5e0e389be9f0e37a54ceeade0f863f225fac2f02a2371f?"
									className="aspect-square w-[25px]"
								/>
								<div className="flex-auto">Messages</div>
							</div>
							<div className="leading-5">You have 1 unread message from Dr. John Doe</div>
						</div>
						<div className="flex flex-col px-6 pt-2.5 pb-5 mt-8 w-full bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:px-5">
							<div className="flex gap-4 justify-between font-medium whitespace-nowrap leading-[150%]">
								<Image
									alt="image"
									width={0}
									height={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/7cae08d706b3994d9e190dda132eef11708140f917bbbb70e4390ffc05da87c6?"
									className="w-3.5 aspect-[0.78] fill-black"
								/>
								<div className="flex-auto self-start mt-1.5">Requests</div>
							</div>
							<div className="mt-1 leading-5">
								Dr. Johnny Santos has requested to have access to your lab Tests.
							</div>
						</div>
						<div className="flex flex-col px-7 pt-3 pb-5 mt-8 w-full bg-white rounded border border-solid shadow-sm border-[color:var(--background-background-600,#E8E8E8)] max-md:pl-5">
							<div className="flex gap-3.5 justify-between font-medium leading-[150%]">
								<Image
									alt="image"
									width={0}
									height={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/76b559e40e7bcac85478bdfc49e4d7db625a2ba823252a5bd2d39be1a347e733?"
									className="aspect-[0.93] fill-black w-[13px]"
								/>
								<div className="flex-auto my-auto">Lab Tests</div>
							</div>
							<div className="mt-1.5 leading-5">Dr. John Doe has requested a Fasting Blood Sugar (FBS) Test for your next clinic visit.</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
