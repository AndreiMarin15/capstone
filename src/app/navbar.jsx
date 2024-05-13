"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { noNavPaths, pathIncluded } from "../../globals";
import { useEffect } from "react";

const navigation = [
	{
		name: "Home",
		href: "/home",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8c918617a9191e94be3756699add9828c7972f6092c7a5aad4ba4bc3881ef28?",
	},
	{
		name: "Health Records",
		href: "/health_records",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f9c43abea937dfcb94c562af7386aed6ebf39633f38ef2eb125de44f44e12f1?",
	},
	{
		name: "Referral",
		href: "/referral",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a5e4e41b96b3a1133c733ca6c34896fe7a85b581c2bce0b6d63f16bd85dd4deb?",
	},
	{
		name: "Reports",
		href: "/reports",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/574a698f1468d5545e4eedb8fccf1abaa56da5e6ee9316255231d565d91ad572?",
	},
	{
		name: "Messages",
		href: "/messages",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f97c38d1861c9f15e7785d2fb60aa2e67056d9cbf10b632c0a227519b230848?",
	},

	{
		name: "Legal Notices",
		href: "/doctor_legal",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b215db570dce3331c1d756a9bd33ac4707518a8b2db9764d3818bef87b91718?apiKey=7e8c8e70f3bd479289a042d9c544736c&",
	},
];

const patientNavigation = [
	{
		name: "Home",
		href: "/patient/home",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8c918617a9191e94be3756699add9828c7972f6092c7a5aad4ba4bc3881ef28?",
	},
	{
		name: "My Personal Details",
		href: "/patient/personal_details",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f9c43abea937dfcb94c562af7386aed6ebf39633f38ef2eb125de44f44e12f1?",
	},
	{
		name: "Medications",
		href: "/patient/medications",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/46cc5725acb618df69825eb223b3a750ecd1f916b972ef6d4cd581c01c80a752?",
	},
	{
		name: "Care Plans",
		href: "/patient/careplan",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/46cc5725acb618df69825eb223b3a750ecd1f916b972ef6d4cd581c01c80a752?",
	},
	{
		name: "Lab Tests",
		href: "/patient/lab_tests",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d9227b6298b463189efefc5f7ac4076d3f31e5c8cf805f3377eeac6b717d533b?",
	},
	{
		name: "Sharing Request",
		href: "/patient/sharing_request",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/83dda067dae7a93c2533039e7b5c4922a5216df1fd9d3775dd133dc76cdf3f39?",
	},
	{
		name: "Referral Letters",
		href: "/patient/referral_letters",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/80ec5745b3c89f516b630be3539da47b763b7777db5771da5e6cad082d8b954e?apiKey=66e07193974a40e683930e95115a1cfd&",
	},
	{
		name: "Attending Doctors",
		href: "/patient/attending_doctors",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9bfe239de7436e1a5ccdf8e9101e8309504ed5be4cee54e8d40c9c559ab454fc?apiKey=66e07193974a40e683930e95115a1cfd&",
	},
	{
		name: "Messages",
		href: "/patient/messages",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/063c268a9f424e0e0c97823839d31d7e6e4a6fe89c695fae78cd54a65904d508?apiKey=66e07193974a40e683930e95115a1cfd&",
	},
	{
		name: "Account",
		href: "/patient/account",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/64cfae19a1f1172eaa2aebcdfb3bc8b64a258ba1c3da5eed2e8e3dd58470d1dc?apiKey=66e07193974a40e683930e95115a1cfd&",
	},

	{
		name: "Legal Notices",
		href: "/patient/patient_legal",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/5b215db570dce3331c1d756a9bd33ac4707518a8b2db9764d3818bef87b91718?apiKey=7e8c8e70f3bd479289a042d9c544736c&",
	},
];

const otherDoctorNavigation = [
	{
		name: "Referral",
		href: "/other_doctor/referrals",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a5e4e41b96b3a1133c733ca6c34896fe7a85b581c2bce0b6d63f16bd85dd4deb?",
	},
];

export default function Navbar() {
	const router = useRouter();
	const path = usePathname();

	return (
		<>
			{path !== "/" && !pathIncluded(path) && (
				<div
					className="items-stretch shadow-sm flex w-1/5 grow flex-col mx-auto pt-7 pb-12 px-3 max-md:mt-10"
					style={{
						background:
							"linear-gradient(180deg, #00296C 0%, rgba(0, 82, 216, 0.51) 99.99%, rgba(0, 97, 255, 0.57) 100%)",
					}}
				>
					{!path.includes("/patient") && !path.includes("/other_doctor")
						? navigation?.map((item) => (
								<span
									onClick={() => router.push(item.href)}
									className={
										path.includes(item.href)
											? "items-start rounded shadow-sm  flex justify-start gap-2.5 p-2.5 max-md:pr-5 bg-[#3B82F6] my-1"
											: "items-start rounded shadow-sm bg-white bg-opacity-0 flex justify-start gap-2.5 p-2.5 max-md:pr-5 hover:bg-[#3B82F6] my-1"
									}
									key={item.name}
								>
									<Image
										loading="lazy"
										src={item.src}
										height={0}
										width={0}
										alt={item.name}
										className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-white text-sm font-semibold grow whitespace-nowrap self-start cursor-default">
										{item.name}
									</div>
								</span>
							))
						: path.includes("/patient") && !path.includes("/other_doctor")
							? patientNavigation?.map((item) => (
									<span
										onClick={() => router.push(item.href)}
										className={
											path.includes(item.href)
												? "items-start rounded shadow-sm  flex justify-start gap-2.5 p-2.5 max-md:pr-5 bg-[#3B82F6] my-1"
												: "items-start rounded shadow-sm bg-white bg-opacity-0 flex justify-start gap-2.5 p-2.5 max-md:pr-5 hover:bg-[#3B82F6] my-1"
										}
										key={item.name}
									>
										<Image
											loading="lazy"
											src={item.src}
											height={0}
											width={0}
											alt={item.name}
											className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-white text-sm font-semibold grow whitespace-nowrap self-start cursor-default">
											{item.name}
										</div>
									</span>
								))
							: otherDoctorNavigation?.map((item) => (
									<span
										onClick={() => router.push(item.href)}
										className={
											path.includes(item.href)
												? "items-start rounded shadow-sm  flex justify-start gap-2.5 p-2.5 max-md:pr-5 bg-[#3B82F6] my-1"
												: "items-start rounded shadow-sm bg-white bg-opacity-0 flex justify-start gap-2.5 p-2.5 max-md:pr-5 hover:bg-[#3B82F6] my-1"
										}
										key={item.name}
									>
										<Image
											loading="lazy"
											src={item.src}
											height={0}
											width={0}
											alt={item.name}
											className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-white text-sm font-semibold grow whitespace-nowrap self-start cursor-default">
											{item.name}
										</div>
									</span>
								))}
				</div>
			)}
		</>
	);
}
