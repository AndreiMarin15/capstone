import Image from "next/image";
import * as React from "react";

export default function ViewCarePlan() {
	const cplan = [
		{
			variable: "Brand Name",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: ["Losartan"],
		},
		{
			variable: "Generic Name",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: ["Losartan"],
		},
		{
			variable: "Dose",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/4ed9fdfc8e5d8d154f4e19144450c46befc8c837076372eb4558e3c022a2dd62?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: ["50mg"],
		},
		{
			variable: "Form",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/87ca70ae252b347ccd1a7f94322c75fde5eccbeaecf0c288f0c1483be1e110ce?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: ["Tablet"],
		},
		{
			variable: "Quantity",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/0cab09a72c90afc03696d3dc2ca45a2e63e8b730e21455af9a7bf1772fd796a5?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: ["30"],
		},
		{
			variable: "Note",
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/d4f42d9fd339eec4a1dd4cc1ab3febb85775d21fcc445ac09b38ef2ea22866d1?apiKey=66e07193974a40e683930e95115a1cfd&",
			value: [
				"1 tablet 1x/ day for 30 days",
				"30 minutes of moderate-intensity exercise (e.g., brisk walking, swimming, or cycling) at least five days a week.",
			],
		},
	];
	return (
		<div className="h-[100vh] border bg-white flex flex-col px-20 py-12 border-solid border-stone-300 max-md:px-5 w-full">
			<span className="self-start flex w-full max-w-[918px] items-center justify-between gap-5 mt-12 px-px max-md:max-w-full max-md:flex-wrap max-md:mt-10">
				<div className="text-black text-xl font-semibold leading-8 flex-1 my-auto">Care Plan #1</div>
				<span className="self-stretch flex items-stretch justify-between gap-2">
					<Image
						alt="picture"
						height={0}
						width={0}
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/dd24b9989b2d32393ba168dd2d578d88a7f713a84668cedf9fa458e426c6e512?"
						className="aspect-square object-contain object-center w-[19px] fill-black fill-opacity-0 overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-blue-500 text-base font-semibold leading-6 self-center grow whitespace-nowrap my-auto">
						Print as PDF
					</div>
				</span>
			</span>
			<span className="flex items-stretch gap-1 mt-4 self-start max-md:ml-2.5">
				<Image
					alt="picture"
					height={0}
					width={0}
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/a85a467796d751cb5ded5847f2714f4bae82ca57ba65095b371ed09797bd0658?"
					className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
				/>
				<div className="text-black text-sm font-semibold leading-5 grow whitespace-nowrap mt-2 self-start">
					CREATED BY: <span className="">Dr. Johnny Santos - Endocrinology</span>
				</div>
			</span>
			<span className="flex items-stretch gap-1 mt-2.5 self-start max-md:ml-2.5">
				<Image
					alt="picture"
					height={0}
					width={0}
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/8f26cf3ca72d3c8bb2d17ce4d79fc83934f949a85f101f5fbea54a4c1cda3229?"
					className="aspect-[1.06] object-contain object-center w-[19px] overflow-hidden shrink-0 max-w-full"
				/>
				<div className="text-black text-sm font-semibold leading-5 self-center grow whitespace-nowrap my-auto">
					CREATED ON: <span className="">2023-01-07</span>
				</div>
			</span>

			<table className="max-w-fit border-spacing-y-7 border-separate">
				{cplan.map((item) => (
					<tr key={item.variable}>
						<td className="w-5">
							<Image alt="picture" height={0} width={0} loading="lazy" src={item.imgsrc} className="w-5" />
						</td>
						<td className="border-l-[16px] border-transparent">
							<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
						</td>
						<td className="border-l-[5rem] border-transparent">
							{item.value.map((val) => (
								<div key={val} className="text-black text-xs leading-5 ml-auto">
									{val}
								</div>
							))}
						</td>
					</tr>
				))}
			</table>
		</div>
	);
}
