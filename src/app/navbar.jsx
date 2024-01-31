"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { noNavPaths, pathIncluded } from "../../globals";
import { useEffect } from "react";

const navigation = [
	{
		name: "Dashboard",
		href: "/dashboard",
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
		name: "Messages",
		href: "/messages",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f97c38d1861c9f15e7785d2fb60aa2e67056d9cbf10b632c0a227519b230848?",
	},
	{
		name: "Account",
		href: "/account",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/eaae319e37fb27c62aab1d5827ee3cda4208176639bcfdd1abb7781f36505a6c?",
	},
];

const patientNavigation = [
	{
		name: "Dashboard",
		href: "/patient/dashboard",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8c918617a9191e94be3756699add9828c7972f6092c7a5aad4ba4bc3881ef28?",
	},
	{
		name: "My Health Records",
		href: "/patient/health_records",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f9c43abea937dfcb94c562af7386aed6ebf39633f38ef2eb125de44f44e12f1?",
	},
	{
		name: "Care Plans and Laboratory Tests",
		href: "/patient/careplan_list",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b6de349e8c69b6b0060cd2e1b31fc9db9b32f5ffe30c9fc9c4fa3011da0d1873?apiKey=66e07193974a40e683930e95115a1cfd&",
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
					{!path.includes("/patient")
						? navigation.map((item) => (
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
						: patientNavigation.map((item) => (
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