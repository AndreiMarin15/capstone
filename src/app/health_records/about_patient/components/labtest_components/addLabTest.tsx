import Image from "next/image";
import React from "react";

function AddLabTest() {
	return (
		<div className="self-stretch mt-8 max-md:max-w-full">
			<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
				<div className="flex flex-col items-stretch w-[16%] max-md:w-full max-md:ml-0">
					<span className="flex flex-col items-stretch max-md:mt-7">
						<div className="text-black text-xs font-semibold leading-5">Lab Test #4</div>
						<span className="flex items-stretch justify-between gap-4 mt-9">
							<Image
								alt="picture"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/798b92816d5e4474ac5a607a73b0f265a91812d1eeefbdb24b50aa0731f2feb9?apiKey=66e07193974a40e683930e95115a1cfd&"
								className="aspect-square object-contain object-center w-[23px] overflow-hidden shrink-0 max-w-full"
							/>
							<div className="text-black text-xs font-semibold leading-5 my-auto">Date</div>
						</span>
						<span className="flex items-stretch justify-between gap-4 mt-12 max-md:mt-10">
							<Image
								alt="picture"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/c30a6e4fc539ac988d28f6ab6785ceeca11c1aaa77f6d0272dd9cc6a0a0d3820?apiKey=66e07193974a40e683930e95115a1cfd&"
								className="aspect-square object-contain object-center w-6 overflow-hidden shrink-0 max-w-full"
							/>
							<div className="text-black text-xs font-semibold leading-5 my-auto">Name of Lab Test</div>
						</span>
					</span>
				</div>
				<div className="flex flex-col items-stretch w-[84%] ml-5 max-md:w-full max-md:ml-0">
					<div className="flex grow flex-col mt-11 max-md:max-w-full max-md:mt-10">
						<input
							type="date"
							className="text-xs font-medium leading-5 rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start"
							placeholder="YYYY-MM-DD"
						></input>

						<input
							type="text"
							className="text-xs leading-5 rounded justify-center items-stretch mt-12 py-2 border-[0.5px] border-solid border-black self-start max-md:mt-10"
							placeholder="HbA1c Test"
						></input>

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

						<span className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-28 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">
							Save
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AddLabTest;
