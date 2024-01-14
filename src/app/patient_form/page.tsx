import * as React from "react";
import Image from "next/image";
import ProgressBar from "./components/progressBar";
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
	return (
		<div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300">
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

				<ProgressBar currentStep={1} />

				
				<div className="w-full flex justify-end">
					<button className="text-white text-xs font-semibold whitespace-nowrap justify-center flex items-stretch bg-sky-900 mr-2 mt-12 px-7 py-2 rounded max-md:mr-2.5 max-md:px-5">
						NEXT
					</button>
				</div>
			</span>
		</div>
	);
}
