"use client";

import * as React from "react";
import Image from "next/image";
import ProgressBar from "./components/progressBar";

export default function PatientInformation() {
	const [currentState, setCurrentState] = React.useState<1 | 2 | 3 | 4>(1);
	return (
		<div className="border bg-white flex flex-col items-stretch pb-8 border-solid border-stone-300 h-[100vh]">
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
				<>
					{/* PUT YOUR COMPONENTS HERE, REPLACE THE EMPTY QUOTES CALLING THE COMPONENTS
        see patient_form/page.tsx for reference
        */}
					<div className={"pb-20"}>
						{currentState === 1 ? "" : currentState === 2 ? "" : currentState === 3 ? "" : currentState === 4 ? "" : ""}
					</div>
				</>

				<div className="w-full flex justify-between px-14 max-md:max-w-full  max-md:px-5">
					{currentState > 1 ? (
						<button
							onClick={() => {
								if (currentState > 1) {
									setCurrentState((currentState - 1) as 1 | 2 | 3 | 4);
								}
							}}
							className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-gray-400 self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
						>
							BACK
						</button>
					) : (
						<div></div>
					)}
					<button
						onClick={() => {
							if (currentState < 4) {
								setCurrentState((currentState + 1) as 1 | 2 | 3 | 4);
							}
							console.log(currentState);
						}}
						className="mt-5 text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 self-stretch mr-2  px-6 py-2 rounded max-md:px-3"
					>
						NEXT
					</button>
				</div>
			</span>
		</div>
	);
}
