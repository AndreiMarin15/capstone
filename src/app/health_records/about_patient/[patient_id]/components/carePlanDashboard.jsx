import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BackButton from "./sub_components/BackButton";
import ViewCarePlan from "./sub_components/viewCarePlan";
import AddCarePlan from "./sub_components/addCarePlan";
import { careplanInfo } from "@/app/lib/backend//patient/careplan/careplan";

export default function CarePlan({ patientId, patientData }) {
	const [careplanInfor, setCareplanInfor] = useState([]);
	const [currentScreen, setCurrentScreen] = useState(0);
	const [carePlan, setCarePlan] = useState({});

	useEffect(() => {
		const fetchData = async () => {
			const careplanInformation = await careplanInfo.getCareplanInformation(patientId);
			console.log(careplanInformation);
			setCareplanInfor(careplanInformation);
		};

		fetchData();
	}, []);

	const [isTest, setTest] = useState(false);
	const [isAdd, setAdd] = useState(false);
	const handleSetCurrentScreen = () => {
		setTest(false);
		setAdd(false);
	};

	return (
		<>
			{isTest ? (
				<ViewCarePlan carePlan={carePlan?.activity} setCurrentScreen={handleSetCurrentScreen} />
			) : isAdd ? (
				<AddCarePlan setCurrentScreen={handleSetCurrentScreen} patientData={patientData} patientId={patientId} />
			) : (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
						CARE PLANS
						<button
							className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
							onClick={() => {
								setAdd(true);
							}}
						>
							Add
						</button>
					</div>
					<div className="flex gap-5 justify-between text-xs max-w-[100%] max-md:flex-wrap">
						<div className="flex gap-1.5 p-2.5">
							<div className="mt-3 grow font-semibold text-black">Status: </div>
							<button className="flex flex-col flex-1 justify-center font-bold text-green-600 whitespace-nowrap leading-[150%] hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
								<div className="justify-center items-start py-2 pr-16 pl-3 rounded border border-black border-solid shadow-sm max-md:pr-5">
									ACTIVE
								</div>
							</button>
						</div>
						<div className="flex gap-1 my-auto text-black whitespace-nowrap leading-[150%]">
							<button className="flex gap-1 px-5 py-2 rounded-md border border-black border-solid">
								<Image
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/1815063a9248e003b79041a817235f1997954e6c1ef9ef5b1f105c020315d455?"
									width="100"
									height="100"
									className="shrink-0 w-3 aspect-[0.85]"
									alt="image"
								/>
								<div className="self-start">FILTER</div>
							</button>
							<button className="grow justify-center px-6 py-2.5 rounded-md border border-black border-solid max-md:pl-5">
								SORT
							</button>
						</div>
					</div>
					{careplanInfor &&
						careplanInfor.map((careplan, index) => (
							<button
								key={index}
								className="flex flex-col mt-5 items-start text-xs leading-5 text-black max-w-[800px]"
								onClick={() => {
									setCarePlan(careplan.resource);
									setTest(true);
								}}
							>
								<div className="flex gap-3.5 font-semibold whitespace-nowrap">
									<Image
										alt="image"
										height={0}
										width={0}
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
										className="aspect-square fill-black w-[15px]"
									/>
									<div className="my-auto">{careplan["resource"]?.["title"]}</div>
								</div>

								<div className="flex gap-5 justify-between self-stretch ml-7 w-full max-md:flex-wrap max-md:max-w-full">
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
											{careplan["resource"]?.contributor.length === 1
												? careplan["resource"]?.contributor[0].display
												: careplan["resource"]?.contributor[0].display +
													` +${careplan["resource"]?.contributor.length - 1} other/s`}
										</div>
									</div>
									<div className="pr-8">
										<div className="flex-auto my-auto">{`${careplan.resource?.period.start} - ${careplan.resource?.period.end}`}</div>
									</div>
									<div className="pr-8">
										<div className="flex gap-2 px-5 text-xs leading-5 text-black whitespace-nowrap">
											<div className="shrink-0 self-start mt-2 w-2 h-2 bg-green-700 rounded-full" />
											<div>Active</div>
										</div>{" "}
									</div>
									<div className="pr-8"></div>
								</div>
							</button>
						))}

					<BackButton />
				</>
			)}
		</>
	);
}
