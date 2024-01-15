import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AttendingDoctor from "./sub_components/attendingDoctor";

export default function MasterData() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(0);
	const mHistory = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?",
			variable: "Diagnosis",
			value: "Type 2 Diabetes Mellitus with Diabetic Peripheral Angiopathy Without Gangrene",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
			variable: "Date of Diagnosis",
			value: "2020-01-02",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Doctor",
			value: (
				<button
					onClick={() => {
						setCurrentPage(currentPage + 1);
					}}
					className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded text-center"
				>
					Dr. Johnny Santos - Cardiologist
				</button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?",
			variable: "Procedure/s",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded text-center">
					View
				</button>
			),
		},
		{
			src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/7902b2ce256c214a23ab208ae308822af7403afd38460b9ef2c7f83be18954b6?"',
			variable: "Care Plan",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded">
					View
				</button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/73a75686b5cd170bb3f25deb8f06c42c071c4ba5dc25573afa2fcfb453e5b5f4?",
			variable: "Lab Tests",
			value: (
				<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 items-stretch pt-1.5 px-6 rounded">
					View
				</button>
			),
		},
	];
	return (
		<>
			<div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">MEDICAL HISTORY</div>

			<span className="flex items-center gap-2.5 mb-1">
				<div className="text-black text-xs font-bold leading-5 whitespace-nowrap">Status:</div>
				<span className="border self-stretch flex justify-between gap-5 pl-6 pr-2 rounded-md border-solid border-zinc-400 items-start">
					<div className="text-black text-xs font-medium leading-5">Active</div>
					<Image
						alt="picture"
						height={0}
						width={0}
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/554c1e18059b6f0490f9d598b5f23e6954398601ddfbab70a22496a73e532e48?"
						className="aspect-[0.55] object-contain object-center w-1.5 overflow-hidden self-stretch shrink-0 max-w-full"
					/>
				</span>
			</span>

			{currentPage === 0 ? (
				<table className="max-w-fit border-spacing-y-7 border-separate">
					{mHistory.map((item) => (
						<tr key={item.variable}>
							<td className="w-5">
								<Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
							</td>
							<td className="border-l-[16px] border-transparent">
								<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
							</td>
							<td className="border-l-[5rem] border-transparent">
								<div className="text-black text-xs leading-5 ml-auto">{item.value}</div>
							</td>
						</tr>
					))}
				</table>
			) : (
				""
			)}

			{currentPage === 1 ? <AttendingDoctor /> : ""}
		</>
	);
}
