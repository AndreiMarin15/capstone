"use client";

import * as React from "react";
import Image from "next/image";
import RegisterDoctor from "./components/doctorRegistration";
import { useDoctorInfo, useUserInfo } from "../store";
import { useRouter } from "next/navigation";
import { DoctorSignUp } from "../../../lib/backend/doctor_signup";
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

export default function DoctorInformation() {
	const router = useRouter();
	const doctorStore = useDoctorInfo();
	const userStore = useUserInfo();
	return (
		<div className=" bg-white flex flex-col items-stretch pb-8 h-auto">
			<span className="flex w-full flex-col mt-11 px-20 max-md:max-w-full max-md:mt-10 max-md:px-5">
				<span className="self-stretch flex items-center justify-between gap-5 ml-4 mr-4 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5">
					<div className="text-black text-xl font-semibold leading-8 my-auto">Doctor Registration</div>
					<span className="self-stretch flex items-center justify-between gap-5">
						<div className="text-gray-400 text-xs font-medium leading-5 grow whitespace-nowrap my-auto">
							Already have an account?
						</div>
						<button className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch grow px-6 py-2 rounded max-md:px-5">
							SIGN IN
						</button>
					</span>
				</span>

				<div className="mb-20">
					<RegisterDoctor />
				</div>

				<div
					onClick={() => {
						router.push("/");
					}}
					className="w-full flex justify-between px-14 max-md:max-w-full  max-md:px-5"
				>
					<button className=" text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2  px-6 py-2 rounded max-md:px-5">
						BACK
					</button>

					<div></div>

					<button
						onClick={async () => {
							const doctorInfo = {
								email: userStore.email,
								password: userStore.password,
								license_id: doctorStore.doctor_license.license_number,
								specialization_id: doctorStore.specialization_id,
								first_name: doctorStore.first_name,
								last_name: doctorStore.last_name,
								gender: doctorStore.gender,
								birthdate: doctorStore.birthdate,
								years_of_practice: doctorStore.years_of_practice,
							};

							const account = await DoctorSignUp.signUpAsDoctor(doctorInfo);
							console.log(account.message);
							if (account.message) {
								toast.error(account.message, {
									position: "top-left",
									theme: "colored",
									autoClose: 2000,
								});
							} else {
								toast.success("Registration Success! Redirecting...", {
									position: "top-left",
									theme: "colored",
									autoClose: 2000,
								});

								setTimeout(() => {
									router.push("/dashboard");
								}, 2500);
							}
						}}
						className="text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
					>
						NEXT
					</button>
				</div>
			</span>
		</div>
	);
}
