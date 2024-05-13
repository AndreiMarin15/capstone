"use client";
import Image from "next/image";
import * as React from "react";
import { useState, useEffect } from "react";
import { useCPNav } from "@/app/store";
import ViewCarePlan from "../careplan/components/viewCarePlan";
import { careplanInfo } from "@/backend/patient/careplan/careplan";
import { currentUser } from "@/app/store";
{
	/* TO DO: Turn into component */
}

export default function CarePlanDashboard() {
	const { selected } = useCPNav();
	const [careplanInfor, setCareplanInfor] = useState([]);
	const [currentScreen, setCurrentScreen] = useState(0);
	const [carePlan, setCarePlan] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const careplanInformation = await careplanInfo.getCareplanInformation(currentUser.getState().info.id);
			console.log(careplanInformation);
			setCareplanInfor(careplanInformation);
		};

		fetchData();
	}, []);

	const [isTest, setTest] = useState(false);
	const handleSetCurrentScreen = (screen) => {
		// Reset isTest to false when navigating back to screen 2
		setCurrentScreen(screen);
		// if (screen === 2) {
		//   setTest(false);
		// }
	};

	return (
		<>
			{currentScreen == 1 ? (
				<ViewCarePlan
					currentScreen={currentScreen}
					carePlan={carePlan?.activity}
					setCurrentScreen={handleSetCurrentScreen}
				/>
			) : (
				<>
					<div className="border h-full w-full bg-white flex flex-col items-center px-20 py-12 border-solid border-stone-300 max-md:px-5">
						<div className="flex w-full items-stretch justify-between gap-5 mt-11 max-md:max-w-full max-md:flex-wrap max-md:mt-10">
							<span className="flex flex-col items-stretch">
								<div className="text-black text-xl font-semibold leading-8 whitespace-nowrap">Care Plan</div>
							</span>
							<div className="flex items-stretch gap-2.5 mt-8 self-end">
								<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
										className=" ml-2 aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
									/>
									<input className="text-stone-300 text-xs leading-5 my-auto" placeholder="SEARCH"></input>
								</span>
								<button className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
									<Image
										alt="picture"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/7824f47aef79f0674e3de34f06de56a14c198999165016166b0825bd17c7945d?"
										className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">FILTER</div>
								</button>
							</div>
						</div>
						<div className=" bg-white flex flex-col items-stretch min-h-screen w-full">
							<div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
								<div className="flex gap-1.5 p-2.5">
									<div className="mt-3 grow font-semibold text-black">Status: </div>
									<button className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
										<div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
											ACTIVE
										</div>
									</button>
								</div>
							</div>
							{careplanInfor &&
								careplanInfor?.map((value, index) => (
									<button
										key={index}
										className="flex flex-col mt-5 items-start text-xs leading-5 text-black max-w-[800px]"
										onClick={() => {
											setCarePlan(value.resource);
											setCurrentScreen(1);
										}}
									>
										<div className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[1000px]">
											<div className="flex gap-3.5 font-semibold whitespace-nowrap ">
												<Image
													alt="image"
													height={0}
													width={0}
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
													className="aspect-square fill-black w-[15px]"
												/>
												<div className="my-auto">{value["resource"]?.["title"]}</div>
											</div>
											<div className="flex gap-5 justify-between ml-7 max-md:ml-2.5 max-w-[1000px]">
												<div className="flex gap-1 justify-between font-medium whitespace-nowrap">
													<Image
														alt="image"
														height={0}
														width={0}
														loading="lazy"
														src="https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
														className="w-4 aspect-square"
													/>
													<div className="grow my-auto">
														{value["resource"]?.contributor.length === 1
															? value["resource"]?.contributor[0].display
															: value["resource"]?.contributor[0].display +
																` +${value["resource"]?.contributor.length - 1} other/s`}
													</div>
													<div className=" ml-16 justify-between flex-auto my-auto">{`${value.resource?.period.start} - ${value.resource?.period.end}`}</div>
												</div>
											</div>
										</div>
									</button>
								))}
						</div>
					</div>
				</>
			)}
		</>
	);
}
