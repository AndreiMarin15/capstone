"use client";
import * as React from "react";
import Navbar from "../navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navigation = [
	{
		name: "DELA CRUZ, Juan",
		age: "70",
		href: "",
		src: "",
	},
	{
		name: "RIZAL, Jose",
		age: "43",
		href: "",
		src: "",
	},
	{
		name: "BONIFACIO, Andres",
		age: "39",
		href: "",
		src: "",
	},
	{
		name: "QUEZON, Manuel",
		age: "44",
		href: "",
		src: "",
	},
	{
		name: "SORA, Tandang",
		age: "61",
		href: "",
		src: "",
	},
	{
		name: "LUNA, Juan",
		age: "30",
		href: "",
		src: "",
	},
	{
		name: "LUNA, Antonio",
		age: "18",
		href: "",
		src: "",
	},
];

export default function MyComponent() {
	const router = useRouter();
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen w-full">
			<div className="w-full max-md:max-w-full h-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 h-full">
					<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col items-stretch mt-8 ml-5 w-full max-md:max-w-full max-md:mt-10">
							<div className="text-black text-xl font-semibold leading-8 max-md:max-w-full">Health Records</div>
							<span className="flex w-full items-center justify-between gap-5 mt-8 mb-8 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
								<div className="text-black text-base font-medium leading-6 my-auto">PATIENTS</div>
								<div className="self-stretch flex items-stretch justify-between gap-2.5">
									<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
											className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-stone-300 text-xs leading-5 my-auto" style={{ paddingRight: "300px" }}>
											SEARCH
										</div>
									</span>
									<span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb5cbfd4816355a68999fef579bfbfa8293f7f160f1e1220e37a13fc40c2d858?"
											className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
										/>
										<button className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
											FILTER
										</button>
									</span>
								</div>
							</span>
						</span>

						{navigation.map((item) => (
							<div key={item.name} className="ml-5 flex w-full flex-col">
								<div className="flex w-full items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
									<div className="flex items-stretch justify-between gap-5">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee24394139ee09d61af596b82e9174ea8a73c2e68f5ff59e2c793c7b2e08ee?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">{item.name}</div>
											<div className="text-black text-xs leading-5 mt-2">AGE: {item.age}</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button
											onClick={() => {
												router.push("/health_records/about_patient");
											}}
											className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5"
										>
											View
										</button>
									</div>
								</div>
								<div className="bg-gray-400 self-stretch min-h-[1px] mt-2 mb-2 max-md:max-w-full w-full" />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
