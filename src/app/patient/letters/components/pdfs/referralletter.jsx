"use client";
import * as React from "react";
import Image from "next/image";
import referralLetters from "@/backend/referral_letters/getData";
import { Label } from "@/components/ui/label";
export function ReferralLetterPDF({ referralData, patientData, referred_by_id }) {
	function getAge(birthdate) {
		const birthDate = new Date(birthdate);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();

		if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		console.log(referred_by);
		return age;
	}

	const [referred_by, setReferredBy] = React.useState({});
	React.useEffect(() => {
		const fetchDoctor = async () => {
			const doctor = await referralLetters.getDoctor(referred_by_id);
			setReferredBy(doctor);
		};
		fetchDoctor();
	}, [referred_by_id]);
	return (
		<div
			className={`flex flex-col px-14 py-20 rounded border border-gray-200 border-solid shadow-sm max-w-[867px] max-md:px-5`}
		>
			<div className="flex gap-5 font-semibold leading-5 text-black max-md:flex-wrap max-md:max-w-full">
				<div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
					<div className="flex flex-col self-center leading-[150%] max-md:max-w-full">
						<div className="self-center text-xl">{referralData?.referral_data.doctor_name ?? ""}</div>
						<div className="mt-4 text-base max-md:max-w-full">{referralData?.referral_data.specialization ?? ""}</div>
					</div>
					<div className="flex flex-row items-start text-start justify-between mt-16 text-xs max-md:mt-10 max-md:max-w-full w-full">
						<div className="items-start text-start">
							{referred_by?.hospital?.name ?? ""} <br />
							<span className="font-normal items-start text-start">
								{referred_by?.hospital?.clinic ?? ""} {referred_by?.hospital?.schedule ?? ""} Contact:{" "}
								{referred_by?.hospital?.contact ?? ""}
							</span>
						</div>
						<div className="justify-between text-right">
							Date Requested <br />{" "}
							<span className="font-normal"> {new Date(referralData?.created_at).toISOString().split("T")[0]}</span>
						</div>
					</div>
					<div className="mt-4 text-xs items-start text-start max-md:max-w-full">
						{referralData?.referral_data.place_of_clinic ?? ""}
						<br />
						<span className="font-normal">Contact: {referralData?.referral_data.contact ?? ""}</span>
					</div>
				</div>
			</div>
			<div className="mt-14 max-w-full w-[436px] max-md:mt-10">
				<div className="flex gap-5 max-md:flex-col max-md:gap-0">
					<div className="flex flex-col w-[37%] max-md:ml-0 max-md:w-full">
						<div className="flex flex-col grow text-xs font-semibold leading-5 text-black max-md:mt-10">
							<div className="leading-[150%]">PATIENT INFORMATION</div>
							<div className="mt-6 items-start text-start">
								Name
								<br />
								<span className="font-normal">
									{patientData?.personal_information?.first_name ?? ""}{" "}
									{patientData?.personal_information?.last_name ?? ""}
								</span>
							</div>
							<div className="mt-6 items-start text-start">
								Age
								<br />
								<span className="font-normal">{getAge(patientData?.personal_information?.birthdate) ?? ""}</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col ml-5 w-[63%] max-md:ml-0 max-md:w-full">
						<div className="items-start text-start self-stretch my-auto text-xs font-semibold leading-5 text-black max-md:mt-10">
							Address
							<br />
							<span className="font-normal">
								{patientData?.personal_information?.street_address ?? ""},{" "}
								{patientData?.personal_information?.state ?? ""}, {patientData?.personal_information?.city ?? ""}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-16 whitespace-pre-wrap text-xs leading-5 text-black items-start text-start max-md:mt-10 max-md:max-w-full">
				<span className="font-semibold">Diagnosis</span>:{referralData?.referral_data.reason_for_referral ?? ""}
			</div>
			<div className="mt-5 whitespace-pre-wrap text-xs leading-5 items-start text-start text-black max-md:max-w-full">
				{referralData?.referral_data.medications ?? ""}
			</div>
			<div className="flex gap-5 justify-between items-start mt-11 w-full text-xs leading-5 text-black max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
				<div className="flex gap-5 justify-between self-start font-semibold">
					<div className="flex flex-col self-start">
						{referralData?.referral_data.lab_tests?.map((labtest, index) => (
							<div key={index} className={"p-2"}>
								<div className="grid grid-cols-2 items-start text-start gap-7">
									<Label htmlFor="name">{labtest.resource.codeText}</Label>
									<Label>Lab Values:</Label>
								</div>
								<div className="mt-2 grid grid-cols-2 items-start text-start gap-7">
									<Label htmlFor="username">
										{labtest.resource.uploadedDateTime && `Laboratory Test Date: ${labtest.resource.uploadedDateTime}`}
									</Label>
									<Label>
										{labtest.resource.valueQuantity?.valueQuantities[0]?.display ?? ""}{" "}
										{labtest.resource.valueQuantity?.valueQuantities[0]?.display && "="}{" "}
										{labtest.resource.valueQuantity?.valueQuantities[0]?.value ?? ""}{" "}
										{labtest.resource.valueQuantity?.valueQuantities[0]?.unit ?? ""}
									</Label>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex flex-col self-end mt-32 max-md:mt-10">
					<Image
						alt="image"
						loading="lazy"
						src={referralData?.referral_data.signature ?? ""}
						className="self-center aspect-[1.92] w-[130px]"
						height={0}
						width={0}
					/>
					<div className="flex flex-col mt-2.5">
						<div>License No. {referred_by?.license_id}</div>
						<div className="self-end mt-2.5">PTR #{referred_by?.ptr}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
