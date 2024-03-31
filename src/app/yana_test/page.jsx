"use client";
import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Referral() {
	const router = useRouter();
	const [showOTP, setShowOTP] = React.useState(false);
	const [otpInput, setOTPInput] = React.useState("");
	const [step, setStep] = React.useState(0); // State to manage the steps of the pop-up

	const doctorInfo = {
		name: "Dr. Johnny Santos",
		specialty: "Cardiologist",
		patient: "Juan Dela Cruz",
	};

	const otherDoctorInfo = {
		name: "Dr. Micha Lee",
		specialty: "Gastroenterologist",
		patient: "Juan Luna",
	};

	const handlePullRecords = () => {
		//setShowOTP(true);
		setStep(1); // Move to the next step of the pop-up
	};

	const handleOTPSubmit = () => {
		//  add logic to verify the OTP
		// just closes the OTP pop-up for now
		// setShowOTP(false);
		setStep(2); // Move to the next step of the pop-up
	};

	const handleBack = () => {
		setStep(1); // Go back to step 1
	};

	const handleClose = () => {
		setShowOTP(false); // Close the pop-up
		setStep(0); // Reset step to initial state
	};

	return (
		<div className="bg-white border border-solid border-stone-300 h-screen flex">
			<div className="flex flex-col ml-5 w-full max-w-screen-xl mx-auto">
				<div className="flex gap-5 justify-between px-5 md:px-14 py-9 w-full">
					<div className="text-xl font-semibold text-black">Referral</div>
					<div className="flex gap-3.5 justify-between text-xs">
						<div className="flex gap-2 border-gray-300 border-[1px] rounded-lg">
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
								className="aspect-square fill-stone-300 w-[13px] ml-4"
							/>
							<input type="text" placeholder="Search..." />
						</div>
						<button
							onClick={() => {
								router.push("/referral/send_referral");
							}}
							className="text-white text-xs font-semibold bg-sky-900 px-4 py-1.5 rounded mr-2"
						>
							Refer a Patient
						</button>
					</div>
				</div>

				<div className="flex">
					{/* Left side tabs */}
					<div className="flex flex-col w-1/2 max-w-[50%] md:w-full px-5 mt-9">
						<div className="flex gap-5">
							{/* Left side tab with bg-blue-500 */}
							<div className="flex gap-5">
								<div className="w-2.5 bg-blue-500 h-[129px]" />
								<Image
									alt="image"
									height={0}
									width={0}
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c15d8e78fed1700b5a41fe03386945de7b86991164dd8f5e36bb4f2a9286b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
									className="self-start mt-7 w-[43px]"
								/>
								<div className="flex flex-col flex-1 my-auto">
									<div className="text-lg font-semibold whitespace-nowrap">
										{doctorInfo.name}
										<div className="text-m text-zinc-600">
											<span className="text-zinc-300 font-medium">{doctorInfo.specialty}</span>
											<div className="mt-4 text-xs font-medium text-zinc-600">
												<span className="font-bold">PATIENT</span>: {doctorInfo.patient}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Another left side tab with bg-orange-500 */}
						<div className="flex gap-5 mt-5">
							<div className="w-2.5 bg-orange-500 h-[129px]" />
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c15d8e78fed1700b5a41fe03386945de7b86991164dd8f5e36bb4f2a9286b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
								className="self-start mt-7 w-[43px]"
							/>
							<div className="flex flex-col flex-1 my-auto">
								<div className="text-lg font-semibold whitespace-nowrap">
									{otherDoctorInfo.name}
									<div className="text-m text-zinc-600">
										<span className="text-zinc-300 font-medium">{otherDoctorInfo.specialty}</span>
										<div className="mt-4 text-xs font-medium text-zinc-600">
											<span className="font-bold">PATIENT</span>: {otherDoctorInfo.patient}
										</div>
										<button className="flex gap-3 mt-6 whitespace-nowrap">
											<div className="px-2 py-2 text-white text-xs bg-sky-900 rounded max-md:px-2">Accept</div>
											<div className="px-2 py-2 text-sky-900  text-xs rounded border border-sky-900 border-solid max-md:px-5">
												Decline
											</div>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right side tabs */}
					<div className="flex flex-col w-1/2 max-w-[50%] md:order-last px-5">
						<div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
							<div className="pt-12 pr-20 pb-5 pl-6 bg-white shadow-sm max-md:px-5 max-md:max-w-full">
								<div className="flex max-md">
									<div className="flex flex-col">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/39731ee2758b1eb02660dc6f2d0e828ff80ed03d23c48b7c7070fb88d8da4492?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
											className="mt-4 aspect-square w-[43px]"
										/>
									</div>
									<div className="flex flex-col ml-5 w-[79%] max-md:ml-0 max-md:w-full">
										<div className="mt-2 text-lg font-semibold text-black">
											{doctorInfo.name}
											<div className="text-m text-zinc-600">
												<span className="text-zinc-300 font-medium">{doctorInfo.specialty}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className="flex z-10 flex-col py-11 mt-0 text-xs font-medium leading-5 shadow-sm bg-stone-50 max-md:max-w-full"
								style={{ width: "780px" }}
							>
								<div className="flex flex-col px-6 max-md:px-5 max-md:max-w-full">
									<div className="flex gap-4 justify-between text-zinc-600 max-md:flex-wrap max-md:max-w-full">
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/857eb5dff49a7bc5e61fc67448243f1588de729714292a08312c0482f523f5b8?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
											className="self-start w-7 aspect-square ml-2"
										/>
										<div className="grow justify-center px-2 py-5 bg-white rounded shadow-sm max-md:max-w-full">
											{"Hello, let's collaborate with this patient"}
										</div>
									</div>
									<div className="flex gap-4 self-end mt-6 text-white">
										<div className="grow justify-center px-2 py-3.5 bg-blue-500 rounded shadow-sm">
											{"Sure, I'd like to view the patient's records. I'll pull in a while."}
										</div>
										<Image
											alt="image"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f2fa9bc22c05f41ee1e70771f3bc8bd9a8823ec27a71159ef7db0a5a1f043e5?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
											className="self-start w-7 aspect-square "
										/>
									</div>
								</div>
								<div className="flex gap-4 self-center mt-6 mb-7 text-zinc-600 max-md:flex-wrap max-md:max-w-full">
									<Image
										alt="image"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/0607a8e021fe8ea071dc1eb7a94f5054c94c2800903170fcca4a9dc807e040ae?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
										className="self-start w-7 aspect-square ml-8"
									/>
									<div className="grow px-2 pt-5 pb-12 bg-white rounded shadow-sm max-md:max-w-full">
										{"Great. Update me after and let's talk about how to manage this patient again."}
									</div>
								</div>
							</div>
							<div className="flex flex-col px-7 mt-5 whitespace-nowrap grow justify-" style={{ width: "800px" }}>
								<div className="items-start pt-2 pr-2 pl-2 pb-14 rounded-lg bg-stone-50 text-zinc-500">
									<input type="text" placeholder="Message..." style={{ width: "100%", height: "300%" }} />
								</div>
								<div className="flex w-full items-center justify-between gap-5 mt-2.5 pr-4 max-md:max-w-full max-md:flex-wrap">
									<span className="flex items-stretch gap-2 my-auto">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/8392d4615ad6aedcb4840fcdc0ef1e57e16e40d09018c4aa7cc6e8dce68babb9?"
											className="aspect-square object-contain object-center w-4 fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
										/>
										<button
											className="text-zinc-500 text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto"
											onClick={handlePullRecords}
										>
											Pull Records
										</button>
									</span>
									<button className="text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 text-white self-stretch px-7 py-2 rounded max-md:px-5">
										SEND
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{step === 1 && ( // Step 1 of the pop-up
				<div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60">
					{" "}
					<div className="bg-white py-8 rounded shadow-lg flex flex-col items-center max-w-full w-[950px]">
						<div className="text-3xl font-semibold leading-10 text-black max-md:max-w-full">
							{"You’ve been referred to another doctor!"}
						</div>
						<div className="mt-5 leading-5 text-gray-500 text-center max-md:max-w-full">
							This means that our middleware will have to retrieve and store your personal health
							<br />
							data for referred doctors to be able to give you the best possible treatment possible.
						</div>
						<div className="justify-center items-center self-stretch px-16 py-2.5 mt-5 w-full font-bold text-center text-gray-500 bg-zinc-300 bg-opacity-50 leading-[93%] max-md:px-5 max-md:max-w-full">
							Share the following with our middleware:
						</div>
						<div className="flex gap-5 mt-8 max-md:flex-wrap w-[500px]">
							<Image
								alt="img"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/a82f08090a96877c2b1dbf200d8bdc20769fea0f7a754fd834125e09bc44dad4?"
								className="shrink-0 self-start mt-1 w-8 aspect-square fill-stone-500"
							/>
							<div className="flex-auto">
								<span className="font-bold">Personal Information</span>
								<br />
								<span className="text-xs">
									Such as but not limited to your full name, age, birthday, gender, address, and your contact
									information.
								</span>
							</div>
						</div>
						<div className="flex gap-5 mt-6 max-md:flex-wrap w-[500px]">
							<Image
								alt="img"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/afd428597a1eafc7659fbf03b5bb339e7f41b66c87faa6e03afae743076b07d9?"
								className="shrink-0 self-start mt-1.5 aspect-[0.81] fill-stone-500 w-[28px]"
							/>
							<div className="flex-auto">
								<span className="font-bold">Medical Records</span>
								<br />
								<span className="text-xs">
									Including clinic visits, biometrics, family, social, and medical history, allergens, recorded vital
									signs, medications, and care plans.
								</span>
							</div>
						</div>
						<div className="flex gap-4 mt-9 max-md:flex-wrap w-[500px]">
							<Image
								alt="img"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/d85bedd3b106616c6b8ede67f7197af8cd153e769c0f966475dc9ef1c0aeb9c4?"
								className="shrink-0 self-start mt-1.5 aspect-square object-top w-[36px]"
							/>
							<div className="flex-auto">
								<span className="font-bold">Uploaded Medical Documents</span>
								<br />
								<span className="text-xs">
									This includes laboratory tests that the referred doctor would want to view from your end.
								</span>
							</div>
						</div>
						<div className="shrink-0 self-center mt-8 h-px bg-gray-200 border border-gray-200 border-solid max-md:max-w-full w-[750px]" />

						<button
							className="justify-center px-16 py-2.5 mt-8 text-lg text-white whitespace-nowrap bg-sky-900 rounded max-md:px-6"
							onClick={handleOTPSubmit}
						>
							Next
						</button>
					</div>
				</div>
			)}
			{step === 2 && ( // Step 2 of the pop-up
				<div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60">
					<div className="bg-white py-8 rounded shadow-lg flex flex-col items-center max-w-full w-[950px]">
						{/* Step 2 content */}
						<div className="text-3xl font-semibold leading-10 text-black max-md:max-w-full">
							{"You’ve been referred to another doctor!"}
						</div>
						<div className="mt-5 leading-5 text-gray-500 text-center max-md:max-w-full">
							This means that our middleware will have to retrieve and store your personal health
							<br />
							data for referred doctors to be able to give you the best possible treatment possible.
						</div>
						<div className="justify-center items-center self-stretch px-16 py-2.5 mt-5 w-full font-bold text-center text-gray-500 bg-zinc-300 bg-opacity-50 leading-[93%] max-md:px-5 max-md:max-w-full">
							{"It’s important that you read the Terms & Conditions before agreeing."}{" "}
						</div>
						<button className="flex gap-5 px-5 py-5 mt-9 max-w-full rounded-xl border border-solid border-zinc-600 w-[366px]">
							<div className="flex-auto text-black text-start">Privacy Policy</div>
							<div className="my-auto text-blue-500">&gt;</div>
						</button>
						<button className="flex gap-5 px-5 py-5 mt-3 max-w-full rounded-xl border border-solid border-zinc-600 w-[366px]">
							<div className="flex-auto text-black text-start">Terms of Use</div>
							<div className="text-blue-500">&gt;</div>
						</button>
						<button className="flex gap-5 px-5 py-5 mt-3 max-w-full rounded-xl border border-solid border-zinc-600 w-[366px]">
							<div className="flex-auto text-black text-start">Middleware Policy</div>
							<div className="my-auto text-blue-500">&gt;</div>
						</button>

						<div className="shrink-0 self-center mt-8 h-px bg-gray-200 border border-gray-200 border-solid max-md:max-w-full w-[750px]" />

						<div className="flex gap-5 justify-between mt-6 text-lg font-semibold">
							<button
								className="justify-center px-16 py-2.5 text-sky-900 bg-white rounded border border-black border-solid max-md:px-5"
								onClick={handleBack}
							>
								Back
							</button>
							<button
								className="justify-center px-7 py-2.5 text-white bg-sky-900 rounded max-md:px-5"
								onClick={handleClose}
							>
								Confirm Consent
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
