import Image from "next/image";
import * as React from "react";
export default function Vitals() {
	const vitals = [
		
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Systolic Blood Pressure",
			value1: "110",
			value2: "110",
			value3: "110",
			value4: "110",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Diastolic Blood Pressure",
			value1: "90",
			value2: "90",
			value3: "90",
			value4: "90",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Heart Rate",
			value1: "60",
			value2: "60",
			value3: "60",
			value4: "60",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Height",
			value1: "180cm",
			value2: "180cm",
			value3: "180cm",
			value4: "180cm",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?",
			variable: "Weight",
			value1: "70kg",
			value2: "70kg",
			value3: "70kg",
			value4: "70kg",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Body Mass Index",
			value1: "50",
			value2: "50",
			value3: "50",
			value4: "50",
		},
	];
	return (
		<>
			<div className="max-w-fit text-black">
				<table className="border-spacing-y-7 border-separate">
					<tr>
					<td colSpan="2" className="text-base font-bold leading-5 mt-10 mb-1 max-md:ml-1 max-md:mt-10">
						VITALS
					</td>
					<td className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2023-12-01</td>
					<td className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-02-15</td>
					<td className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-05-25</td>
					<td className="border-l-[5rem] border-transparent text-black text-xs leading-5 font-semibold">2024-08-01</td>
					</tr>

					{vitals.map((item) => (
					<React.Fragment key={item.variable}>
						<tr>
						<td>
							<Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
						</td>
						<td className="border-l-[16px] border-transparent">
							<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
						</td>
						<td className="border-l-[5rem] border-transparent text-center">
							<div className="text-black text-xs leading-5 ml-auto">{item.value1}</div>
						</td>
						<td className="border-l-[5rem] border-transparent text-center">
							<div className="text-black text-xs leading-5 ml-auto">{item.value2}</div>
						</td>
						<td className="border-l-[5rem] border-transparent text-center">
							<div className="text-black text-xs leading-5 ml-auto">{item.value3}</div>
						</td>
						<td className="border-l-[5rem] border-transparent text-center">
							<div className="text-black text-xs leading-5 ml-auto">{item.value4}</div>
						</td>
						</tr>

						{item.variable === "Heart Rate" && (
						<tr>
							<td colSpan="6">
							<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
								BIOMETRICS 
							</div>
							</td>
						</tr>
						)}
					</React.Fragment>
					))}
				</table>
				<button className="flex gap-1.5 justify-end text-xs font-bold text-blue-800 whitespace-nowrap">
					<div className="flex gap-1.5 justify-between px-8 py-1.5 rounded border border-blue-800 border-solid">
						<div>Add New</div>
					</div>
				</button>
			</div>
		</>
	);
}
