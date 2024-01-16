import Image from "next/image";
import React from "react";

function AddLabTest() {
	const labtest = [
		{
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/c15ef0ded6b69046a1b632a3bb59f27fc703e9179d2b27b4c4362b9fb05a4935?",
			variable: "Date Taken",
			value: (
				<input
					type="date"
					className="text-zinc-400 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
					placeholder="YYYY-MM-DD"
				/>
			),
		},

		{
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?",
			variable: "Name of Lab Test",
			value: (
				<input
					type="text"
					className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
					placeholder="Hb1AC Test"
				/>
			),
		},
		{
			imgsrc: "",
			variable: "",
			value: (
				<div className="bg-white flex w-[329px] max-w-full flex-col justify-center items-center mt-6 px-16 py-2 border-[0.5px] border-solid border-black self-start max-md:px-5">
					<span className="flex w-[122px] max-w-full flex-col items-stretch">
						<Image
							alt="picture"
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6c796a611eaeec1898b8daca74745a97882433891e131c0a1c9daeee26da5a3?apiKey=66e07193974a40e683930e95115a1cfd&"
							className="aspect-[1.05] object-contain object-center w-[39px] overflow-hidden self-center max-w-full"
						/>
						<div className="text-black text-center text-xs leading-5 mt-1.5">Drag or drop here.</div>
						<label className="bg-sky-900 text-white px-4 py-2 cursor-pointer rounded-full mt-5">
							Upload
							<input type="file" className="hidden" />
						</label>
					</span>
				</div>
			),
		},
	];
	return (
		<span className=" bg-white flex flex-col max-md:px-5 h-full w-full">
			<div className="text-black text-xl font-semibold leading-8 mt-12 self-start max-md:max-w-full max-md:mt-10">
				Lab Test #4
			</div>
			
			
			<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
				<div className="self-start w-full max-w-[925px] mt-12  max-md:max-w-full max-md:my-10">
					<table className="max-w-fit border-spacing-y-7 border-separate">
						{labtest.map((item) => (
							<tr key={item.variable}>
								<td className="w-5">
									{item.imgsrc && (
										<Image alt="picture" height={0} width={0} loading="lazy" src={item.imgsrc} className="w-5" />
									)}
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
					<div className="flex flex-col items-stretch w-[84%] ml-5 max-md:w-full max-md:ml-0">
						<div className="flex grow flex-col max-md:max-w-full max-md:mt-7">
							<button className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-12 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</span>
	);
}

export default AddLabTest;
