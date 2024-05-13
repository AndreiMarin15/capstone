import Image from "next/image";

export default function ViewDiagnosis() {
	const pDiagnosis = [
		{
			name: "Type 2 Diabetes Mellitus (Being Managed)",
		},
	];
	const fHistory = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Date",
			value: "2020-01-02",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Doctor Who Diagnose",
			value: "Dr. John Doe",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e7fc050d0c8638880c4dd0d81910b474c6f08916ab81ba6b4cc46f975682cbb0?",
			variable: "Hospital",
			value: "Philippine General Hospital",
		},
	];
	return (
		<>
			{pDiagnosis?.map((val) => (
				<div key={val.name} className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
					{val.name}
				</div>
			))}
			<table className="max-w-fit border-spacing-y-7 border-separate">
				{fHistory?.map((item) => (
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
			{/*BACK BUTTON */}
			<div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10">
				<button className="flex items-center justify-center px-10 py-1 w-full rounded border-sky-900 border-solid font-semibold border-1.5">
					<div className="flex gap-0.5 justify-between items-center">
						<Image
							width={0}
							height={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
							className="w-4 h-4 aspect-square"
							alt="Back Arrow"
						/>
						<div className="ml-1">BACK</div>
					</div>
				</button>
			</div>
		</>
	);
}
