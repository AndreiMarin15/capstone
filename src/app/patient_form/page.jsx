"use client";

import * as React from "react";
import Image from "next/image";
import ProgressBar from "./components/progressBar";
import SignUpPersonalInformation from "./components/personalInformation";
import SignUpFamilyHistory from "./components/familyHistory";
import SignUpSocialHistory from "./components/socialHistory";
import SignUpMedicalHistory from "./components/medicalHistory";
import { useRouter } from "next/navigation";
import { usePatientInfo, useUserInfo } from "../store";
import { PatientSignUp } from "../../../lib/backend/patient_signup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

{
	/* MISSING ITEMS 
    - Progress Bar
    - Add buttons 
    - Upload profile picture
    - Multiple Choice options (Gender)
    - Restrict input (Contact number, birthdate)
    - NEED BACK BUTTON

    - WILL USE TO CONVERT TO DYNAMIC
    */
}

export default function PatientInformation() {
	const [currentState, setCurrentState] = React.useState(1);
	const router = useRouter();

	const user = useUserInfo();
	const patientInfo = usePatientInfo();
	const patientSignUp = PatientSignUp;
	return (
		<>
			<div className=" bg-white flex flex-col items-stretch pb-8 mb-10">
				<span className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
					<span className="self-stretch flex items-center justify-between gap-5 ml-4 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
						<div className="text-black text-xl font-semibold leading-8 my-auto">Patient Registration</div>
						<span className="self-stretch flex items-center justify-between gap-5">
							<div className="text-gray-400 text-xs font-medium leading-5 grow whitespace-nowrap my-auto">
								Already have an account?
							</div>
							<button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5">
								SIGN IN
							</button>
						</span>
					</span>

					<ProgressBar currentStep={currentState} />

					<div className="mb-20 pb-20 flex flex-col">
						<div>
							{currentState === 1 ? (
								<SignUpPersonalInformation />
							) : currentState === 2 ? (
								<SignUpFamilyHistory />
							) : currentState === 3 ? (
								<SignUpSocialHistory />
							) : currentState === 4 ? (
								<SignUpMedicalHistory />
							) : (
								<SignUpPersonalInformation />
							)}
						</div>

						<div className="w-full flex justify-between px-14 mb-10 max-md:max-w-full max-md:px-5">
							{currentState > 1 ? (
								<button
									onClick={() => {
										if (currentState > 1) {
											setCurrentState(currentState - 1);
										}
									}}
									className=" text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
								>
									BACK
								</button>
							) : (
								<div></div>
							)}
							<button
								onClick={async () => {
									if (currentState < 4) {
										setCurrentState(currentState + 1);
									} else if (currentState >= 4) {
										const account = await patientSignUp.signUpAsPatient(user, patientInfo);

										if (account.user) {
											router.push("/patient/dashboard");
										} else {
											toast.error(account.message, {
												position: "top-left",
												theme: "colored",
												autoClose: 2000,
											});
										}
									}
								}}
								className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
							>
								NEXT
							</button>
						</div>
					</div>
				</span>
			</div>
		</>
	);
}
