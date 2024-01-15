"use client";
import * as React from "react";
import Navbar from "../navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProgressBarReferral from "./components/progressBar";

export default function MyComponent() {
	const router = useRouter();
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
			<div className="flex flex-col max-md:max-w-full max-md:mt-10">
				<span className="self-stretch flex items-center justify-between gap-5 px-5 max-md:max-w-full max-md:flex-wrap">
					<div className="text-black text-xl font-semibold leading-8 grow whitespace-nowrap my-auto">Referral</div>
					<ProgressBarReferral currentStep={1} />
					
				</span>
				<span className="self-center flex w-[804px] max-w-full items-start justify-between gap-5 mt-3 px-5 max-md:flex-wrap" />
				<span className="self-stretch flex w-full items-center justify-between gap-5 mt-12 pr-20 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
					<div className="text-black text-base font-medium leading-6 my-auto">SELECT PATIENT</div>
				</span>
				<div className="self-stretch flex flex-col mt-6 pl-6 items-start max-md:max-w-full max-md:pl-5">
					<div className="flex items-stretch gap-5 ml-3.5 max-md:ml-2.5" />
				</div>
				<span className="text-white text-xs font-semibold justify-center items-stretch bg-sky-900 mt-11 px-7 py-2 rounded self-end max-md:mt-10 max-md:px-5">
					NEXT
				</span>
			</div>
		</div>
	);
}
