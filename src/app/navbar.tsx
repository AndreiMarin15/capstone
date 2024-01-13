"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { noNavPaths, pathIncluded } from "../../globals";
import { useEffect } from "react";

const navigation = [
	{
		name: "Dashboard",
		href: "dashboard",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b8c918617a9191e94be3756699add9828c7972f6092c7a5aad4ba4bc3881ef28?",
	},
	{
		name: "Health Records",
		href: "health_records",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8f9c43abea937dfcb94c562af7386aed6ebf39633f38ef2eb125de44f44e12f1?",
	},
	{
		name: "Predictive Analytics",
		href: "predictive_analytics",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a45516ac3673ac81db0f38b3586d9e129d0181c1734edf497d91b48346f8cc51?",
	},
	{
		name: "Referral",
		href: "referral",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/a5e4e41b96b3a1133c733ca6c34896fe7a85b581c2bce0b6d63f16bd85dd4deb?",
	},
	{
		name: "Messages",
		href: "messages",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/1f97c38d1861c9f15e7785d2fb60aa2e67056d9cbf10b632c0a227519b230848?",
	},
	{
		name: "Account",
		href: "account",
		src: "https://cdn.builder.io/api/v1/image/assets/TEMP/eaae319e37fb27c62aab1d5827ee3cda4208176639bcfdd1abb7781f36505a6c?",
	},
];

export default function Navbar() {
	const router = useRouter();
	const path = usePathname();
	
	return (
		<>
			{path !== "/" && !pathIncluded(path) && (
				<div
					className="items-stretch shadow-sm flex w-1/6 grow flex-col mx-auto pt-7 pb-12 px-3 max-md:mt-10"
					style={{
						background:
							"linear-gradient(180deg, #00296C 0%, rgba(0, 82, 216, 0.51) 99.99%, rgba(0, 97, 255, 0.57) 100%)",
					}}
				>
					{navigation.map((item) => (
						<span
							className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 p-2.5 max-md:pr-5"
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
							<button
								onClick={() => router.push(item.href)}
								className="text-white text-sm font-semibold grow whitespace-nowrap self-start"
							>
								{item.name}
							</button>
						</span>
					))}
				</div>
			)}
		</>
	);
}
