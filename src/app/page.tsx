"use client"

import Image from "next/image";
import * as React from "react";
import sideImg from "./assets/national-cancer-institute-NFvdKIhxYlU-unsplash1.png";

export default function Home() {
	return (
		<div className="border bg-white pl-20 border-solid border-stone-300 max-md:pl-5">
			<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
				<div className="flex flex-col items-stretch w-[43%] max-md:w-full max-md:ml-0">
					<div className="flex flex-col my-auto max-md:mt-10">
						<div className="items-center self-stretch flex justify-between gap-3">
							<Image
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7c5568ce87fad250d8960d04c2e97ceaf002e72729e6cdcc5eda1af6f229ff5?"
								className="aspect-square object-contain object-center w-9 overflow-hidden shrink-0 max-w-full my-auto"
								width={0}
								height={0}
								alt="mImg"
							/>
							<div className="text-blue-500 text-3xl font-bold leading-10 self-stretch grow shrink basis-auto">
								EndoTracker
							</div>
						</div>
						<div className="text-black text-5xl font-bold leading-[72px] self-stretch mt-16 max-md:text-4xl max-md:mt-10">
							Get started
						</div>
						<div className="text-zinc-950 text-base leading-6 underline self-stretch mt-6">
							Already have an account? <span className="underline text-zinc-950">Sign in</span>
						</div>
						<div className="text-black text-lg font-semibold leading-7 self-stretch mt-7 max-md:ml-2">Email</div>
						<input type="text" className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3" />
						<div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">Password</div>
						<input type="text" className="shadow-sm self-stretch flex w-full shrink-0 h-[38px] flex-col mt-2.5 rounded-md border-[0.638px] border-solid border-black max-md:ml-2 text-black px-3" />
						<div className="text-black text-lg font-semibold leading-7 self-stretch mt-5 max-md:ml-2">
							I am signing up as a..
						</div>
						<div className="text-stone-300 text-xl leading-7 shadow-sm self-stretch w-full justify-center mt-2.5 pl-3 pr-16 py-3 rounded-md border-[0.638px] border-solid border-black items-start max-md:ml-2 max-md:pr-5">
							Select
						</div>
						<div className="items-center self-stretch flex justify-between gap-1.5 mt-6">
							<div className="border-gray-400 bg-white flex w-3 shrink-0 h-3 flex-col my-auto rounded-sm border-[0.4px] border-solid" />
							<div className="text-blue-500 text-sm leading-5 underline self-stretch grow whitespace-nowrap">
								I agree to the <span className="underline text-blue-500">terms of service</span> and{" "}
								<span className="underline text-blue-500">privacy policy</span>
							</div>
						</div>
						<button onClick={() => {window.location.href = "/personal_information"}} className="text-white text-lg font-semibold whitespace-nowrap justify-center items-stretch bg-sky-900 mt-10 px-8 py-3 rounded self-start max-md:px-5 hover:bg-sky-600">
							Sign Up
						</button>
					</div>
				</div>
				<div className="flex flex-col items-stretch w-[57%] ml-5 max-md:w-full max-md:ml-0">
					<Image
						src={sideImg}
						width={599}
						height={944}
						className="aspect-[0.63] object-contain object-center w-full overflow-hidden grow max-md:max-w-full max-md:mt-10"
						alt="side"
					/>
				</div>
			</div>
		</div>
	);
}
