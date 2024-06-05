"use client";
import * as React from "react";
import Navbar from "../../navbar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePatientHRNav } from "@/app/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import LabTest from "./components/labTests";
import { useEffect, useState } from "react";
import { Reusable } from "@/app/patient/letters/components/pdfs/reusable";
import { ReferralLetterPDF } from "./components/pdfs/referralletter";
import referralLetters from "@/backend/referral_letters/getData";

export default function Letters() {
	const [written_referrals, setWrittenReferrals] = useState([]);
  const [patientData, setPatientData] = useState({});
	const [selectedTab, setSelectedTab] = React.useState("prescription");

	const handleTabChange = (value) => {
		setSelectedTab(value);
	};

	useEffect(() => {
		if (selectedTab === "referral") {
			const fetchLetters = async () => {
				const letters = await referralLetters.getLetters();
				const patient = await referralLetters.getPatient();
        setPatientData(patient);
				setWrittenReferrals(letters);
			};
			fetchLetters();
		}
	}, [selectedTab]);

	return (
		<>
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 min-h-screen min-w-full">
				<div className="w-full max-md:max-w-full">
					<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
						<div className="flex flex-col items-stretch w-[70%] ml-5 max-md:w-full max-md:ml-0">
							<span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
								<span className="flex w-[100%] max-w-full flex-col items-stretch self-start mb-5">
									<div className="text-black text-xl font-semibold leading-8">Letters</div>
								</span>
								<hr style={{ borderTop: "1px solid #9CA3AF", width: "100%" }} />
							</span>
							<div className="w-full">
								<div className="flex justify-between items-center mb-10 mt-10">
									<Tabs defaultValue="prescription" onValueChange={handleTabChange} className="w-[600px]">
										<TabsList>
											<TabsTrigger value="prescription" color="#003168">
												Prescription
											</TabsTrigger>
											<TabsTrigger value="referral" color="#003168">
												Referral
											</TabsTrigger>
											<TabsTrigger value="labtestrequest" color="#003168">
												Lab Test Request
											</TabsTrigger>
										</TabsList>
										<TabsContent value="prescription">
											<div className="font-semibold text-s ml-5 mt-5">Prescriptions</div>
											<Tabs defaultValue="all" className="w-[600px] mt-10">
												<TabsList>
													<TabsTrigger value="all">All</TabsTrigger>
													<TabsTrigger value="endocrinologist">Endocrinologist</TabsTrigger>
													<TabsTrigger value="cardiologist">Cardiologist</TabsTrigger>
													<TabsTrigger value="gastroenterologist">Gastroenterologist</TabsTrigger>
												</TabsList>
												<TabsContent value="all">
													<div className="ml-5 gap-2 flex font-semibold mt-5">
														<Image
															alt="image"
															height={3}
															width={3}
															loading="lazy"
															src={
																"https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
															}
															className="aspect-square fill-black w-[10px]"
														/>
														{/* Name of Medicine */}
														<div className="text-xs font-semibold">
															{/*  {medication.resource.medicationCodeableConcept[0].text} */}
															Prescription #1
														</div>
													</div>

													<div className="flex w-full justify-between text-xs">
														<div className="flex gap-1 font-medium whitespace-nowrap ml-7">
															{/* Name of Provider */}
															<Image
																alt="image"
																height={0}
																width={0}
																loading="lazy"
																src={
																	"https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?"
																}
																className="w-4 aspect-square"
															/>
															<div className="grow my-auto">Dr. Harold Chiu</div>
															{/* Date of Medicine */}
															{/* <div className=" ml-16 justify-between flex-auto my-auto">{`${medication.resource.dispenseRequest.validityPeriod.start} to ${medication.resource.dispenseRequest.validityPeriod.end}`}</div>} */}
														</div>

														<Button variant="download"> ↓ Download (.pdf)</Button>
													</div>
												</TabsContent>
												<TabsContent value="endocrinologist">{/* Add contents here */}</TabsContent>
												<TabsContent value="cardiologist">{/* Add contents here */}</TabsContent>
												<TabsContent value="gastroenterologist">{/* Add contents here */}</TabsContent>
											</Tabs>
										</TabsContent>

										<TabsContent value="referral">
											<div className="font-semibold text-s ml-5 mt-5">Referral Letters</div>
											{written_referrals.map((referral, index) => (
												<div key={index} className="flex justify-between mt-5">
													<div className="ml-5 flex gap-2 items-center">
														<Image
															alt="image"
															height={0}
															width={0}
															loading="lazy"
															src={
																"https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
															}
															className="aspect-square fill-black w-[10px]"
														/>
														{/* Name of Medicine */}
														<div className="text-xs font-regular">
															{/*  {medication.resource.medicationCodeableConcept[0].text} */}
															Referral Letter to Dr. {referral.referral_data?.doctor_name}
														</div>
													</div>
												
													<Reusable
														child={<ReferralLetterPDF referralData={referral} patientData={patientData} />}
														filename={`referral_letter_${referral.referral_data?.doctor_name}`}
													/>
												</div>
											))}
										</TabsContent>
										<TabsContent value="labtestrequest" className="flex-1 min-h-screen w-full">
											<LabTest />
										</TabsContent>
									</Tabs>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
