import React from "react";
import Image from "next/image";

const AddLab = () => {
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
				"https://cdn.builder.io/api/v1/image/assets/TEMP/629161d56926e554813699b5b55238dbaa9e1f8d86dd945077ab737732efda15?",
			variable: "Name of Machine Used",
			value: (
				<input
					type="text"
					className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
					placeholder="ABC Machine"
				/>
			),
		},
		{
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/fa7bbcb39aa8476a8ef65b6cebfbb0385029750dafba0401c696d3d62d2caed6?",
			variable: "Value",
			value: (
				<input
					type="text"
					className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
					placeholder="120"
				/>
			),
		},
		{
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/c89dc9b514825602c60719ec8014192881b974324619a7a625dcbbe9b49e9f56?",
			variable: "Unit",
			value: (
				<input
					type="text"
					className="text-zinc-400 mt-3 text-xs font-medium leading-5 whitespace-nowrap rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
					placeholder="g/moL"
				/>
			),
		},
		{
			imgsrc:
				"https://cdn.builder.io/api/v1/image/assets/TEMP/04feedd180d99a276d32b47268955875856411c5fd622922cd3c35776c289845?",
			variable: "Ranges",
			value: (
				<div className="flex flex-col">
					<input type="text" className="text-xs font-semibold leading-5 text-black" placeholder="Low" />
					<div className="flex gap-4 px-px mt-1.5">
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
						<input type="text" className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]" />
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
					</div>
					<input type="text" className="mt-7 text-xs font-semibold leading-5 text-black" placeholder="Normal" />
					<div className="flex gap-4 px-px mt-1.5">
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
						<input type="text" className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]" />
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
					</div>
					<input type="text" className="mt-7 text-xs font-semibold leading-5 text-black" placeholder="High" />
					<div className="flex gap-4 px-px">
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
						<input type="text" className="shrink-0 rounded border border-black border-solid h-[23px] w-[35px]" />
						<input type="text" className="shrink-0 w-14 rounded border border-black border-solid h-[23px]" />
					</div>
				</div>
			),
		},
	];

	return (
		<span className="bg-white flex flex-col px-20 py-12 h-auto max-md:px-5">
			<div className="text-black text-xl font-semibold leading-8 mt-12 self-start max-md:max-w-full max-md:mt-10">
				Self Pricking
			</div>

			<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
				<div className="self-start w-full max-w-[925px] mt-12 mb-56 max-md:max-w-full max-md:my-10">
					<table className="max-w-fit  border-separate">
						{labtest?.map((item) => (
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
					<div className="flex flex-col items-stretch w-full ml-5 max-md:w-full max-md:ml-0">
						<div className="flex grow flex-col max-md:max-w-full max-md:mt-7">
							<button className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-12 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">
								SAVE
							</button>
						</div>
					</div>
				</div>
			</div>
		</span>
	);
};
export default AddLab;
