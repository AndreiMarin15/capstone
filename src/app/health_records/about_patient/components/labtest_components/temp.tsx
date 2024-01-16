import * as React from "react";

function MyComponent(props) {
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
			<div className="shadow-sm bg-white flex w-full items-stretch justify-between gap-5 pl-4 pr-10 py-3 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
				<span className="flex items-stretch justify-between gap-2">
					<div className="flex-col fill-[radial-gradient(59.93%_59.93%_at_50%_50%,#D9D9D9_0%,#3B82F6_0.01%,#A4CFFF_45.83%,#00358C_100%)] overflow-hidden relative flex aspect-square w-[22px] items-center pt-2.5">
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/67518a03d7d9b190591bc1e91aec061f3f8788dde095ebf9b2f3a3952338fff5?apiKey=66e07193974a40e683930e95115a1cfd&"
							className="absolute h-full w-full object-cover object-center inset-0"
						/>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/7204bd4be7b4735e9959aba0cff45025d64479507af5cbb0ca9eb4fb316c613c?apiKey=66e07193974a40e683930e95115a1cfd&"
							className="aspect-[1.69] object-contain object-center w-full fill-[radial-gradient(50.07%_88.54%_at_50.07%_11.46%,#3B82F6_0%,rgba(30,64,175,0.00)_100%)] overflow-hidden"
						/>
					</div>
					<div className="text-blue-500 text-base font-bold leading-6 self-center grow whitespace-nowrap my-auto">
						EndoTracker
					</div>
				</span>
				<span className="flex items-stretch gap-3 self-start">
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/f42b85cb98c63bd0b461bc27517f3b694c1a4f40611456b73b8018b96c7bac55?apiKey=66e07193974a40e683930e95115a1cfd&"
						className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
					/>
					<div className="text-black text-xs font-semibold leading-5 self-center my-auto">John Doe</div>
					<img
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/850e1212f2e2a2e181cf24b4224a15b094709337f2b2ee8e5e7fd5e7556566dc?apiKey=66e07193974a40e683930e95115a1cfd&"
						className="aspect-[2] object-contain object-center w-2.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
					/>
				</span>
			</div>
			<div className="w-full max-md:max-w-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
					<div className="flex flex-col items-stretch w-[18%] max-md:w-full max-md:ml-0">
						<div className="items-stretch shadow-sm flex w-full grow flex-col mx-auto pt-7 pb-12 px-3 max-md:mt-10">
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 p-2.5 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/9a7eb150aa08b356e2276b9b080e9cc04d23ffcc4436a7ab4385cf33b71c156f?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">Dashboard</div>
							</span>
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 p-2.5 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/0e12252bbfe8dfe128e494688de487f08a550f381e2da7aab8cb5bd423496237?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">Health Records</div>
							</span>
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 p-2.5 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/414d2c84e43011889f279f248f2b841463e0958f74d855ba3a423d99b2d0b90a?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">
									Predictive Analytics
								</div>
							</span>
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 p-2.5 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/25e2ea12d6b40068c427545d9dda67e6af3004bb1adf12d17c9eca25a22f8483?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">Referral</div>
							</span>
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 p-2.5 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/1f97c38d1861c9f15e7785d2fb60aa2e67056d9cbf10b632c0a227519b230848?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">Messages</div>
							</span>
							<span className="items-stretch rounded shadow-sm bg-white bg-opacity-0 flex justify-between gap-2.5 mt-2.5 mb-80 p-2.5 max-md:mb-10 max-md:pr-5">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/d41bf994cb2e1710a76a78287e3ae20c9a08a054bf33cedc4bebbd79bdeafcb5?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
								/>
								<div className="text-white text-xs font-semibold grow whitespace-nowrap self-start">Account</div>
							</span>
						</div>
					</div>
					<div className="flex flex-col items-stretch w-[82%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col mt-14 px-5 max-md:max-w-full max-md:mt-10">
							<div className="text-black text-xl font-semibold leading-8 self-stretch max-md:max-w-full">
								Health Records
							</div>
							<div className="flex items-stretch gap-3.5 mt-10 self-start">
								<img
									loading="lazy"
									src="https://cdn.builder.io/api/v1/image/assets/TEMP/711077e329ef1d216b1773c45beacdc67e7614f96c33621e116754a30a79f8b5?apiKey=66e07193974a40e683930e95115a1cfd&"
									className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
								/>
								<span className="flex grow basis-[0%] flex-col items-stretch mt-4 self-start">
									<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">DELA CRUZ, JUAN</div>
									<span className="flex items-center justify-between gap-2 mt-2.5">
										<div className="text-black text-xs leading-5 grow whitespace-nowrap my-auto">74 years old</div>
										<div className="bg-stone-300 self-stretch w-px shrink-0 h-4" />
										<div className="text-black text-xs leading-5 whitespace-nowrap self-start">Male</div>
									</span>
								</span>
							</div>
							<div className="self-stretch flex w-full justify-between gap-5 mt-9 items-start max-md:max-w-full max-md:flex-wrap">
								<span className="flex items-start justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
									<div className="text-black text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto">
										Master Data
									</div>
									<span className="text-white text-xs font-medium leading-5 whitespace-nowrap bg-sky-900 self-stretch grow justify-center items-stretch px-3 py-3 rounded-3xl">
										Medical History
									</span>
									<div className="text-black text-xs font-medium leading-5 self-center my-auto">Family History</div>
									<div className="text-black text-xs font-medium leading-5 self-center grow whitespace-nowrap my-auto">
										Vitals & Social History
									</div>
								</span>
								<div className="flex items-stretch gap-2.5 mt-3">
									<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=66e07193974a40e683930e95115a1cfd&"
											className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-stone-300 text-xs leading-5 my-auto">SEARCH</div>
									</span>
									<span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb61b32675241a7ebfe33dce826fe585cb88f85559c41df6c2931fc4dcca6de2?apiKey=66e07193974a40e683930e95115a1cfd&"
											className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
											FILTER
										</div>
									</span>
								</div>
							</div>
							<div className="self-stretch mt-8 max-md:max-w-full">
								<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
									<div className="flex flex-col items-stretch w-[16%] max-md:w-full max-md:ml-0">
										<span className="flex flex-col items-stretch max-md:mt-7">
											<div className="text-black text-xs font-semibold leading-5">Lab Test #4</div>
											<span className="flex items-stretch justify-between gap-4 mt-9">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/798b92816d5e4474ac5a607a73b0f265a91812d1eeefbdb24b50aa0731f2feb9?apiKey=66e07193974a40e683930e95115a1cfd&"
													className="aspect-square object-contain object-center w-[23px] overflow-hidden shrink-0 max-w-full"
												/>
												<div className="text-black text-xs font-semibold leading-5 my-auto">Date</div>
											</span>
											<span className="flex items-stretch justify-between gap-4 mt-12 max-md:mt-10">
												<img
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
											<span className="text-zinc-400 text-xs font-medium leading-5 rounded justify-center items-stretch pl-2 pr-4 py-2 border-[0.5px] border-solid border-black self-start">
												YYYY-MM-DD
											</span>
											<span className="text-zinc-400 text-xs leading-5 rounded justify-center items-stretch mt-12 py-2 border-[0.5px] border-solid border-black self-start max-md:mt-10">
												HbA1c Test
											</span>
											<div className="bg-white flex w-[329px] max-w-full flex-col justify-center items-center mt-6 px-16 py-2 border-[0.5px] border-solid border-black self-start max-md:px-5">
												<span className="flex w-[122px] max-w-full flex-col items-stretch">
													<img
														loading="lazy"
														src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6c796a611eaeec1898b8daca74745a97882433891e131c0a1c9daeee26da5a3?apiKey=66e07193974a40e683930e95115a1cfd&"
														className="aspect-[1.05] object-contain object-center w-[39px] overflow-hidden self-center max-w-full"
													/>
													<div className="text-black text-center text-xs leading-5 mt-1.5">Drag or drop here.</div>
													<div className="text-sky-600 text-center text-xs font-light leading-5 underline self-center whitespace-nowrap mt-3.5">
														Upload
													</div>
												</span>
											</div>
											<span className="text-white text-xs font-semibold whitespace-nowrap bg-sky-900 justify-center items-stretch mt-28 px-14 py-2.5 rounded self-end max-md:mt-10 max-md:px-5">
												Save
											</span>
										</div>
									</div>
								</div>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
