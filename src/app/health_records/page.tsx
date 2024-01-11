import * as React from "react";
import Navbar from "../navbar";

export default function MyComponent() {
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
			<div className="flex flex-col justify-center items-stretch">
				<div className="shadow-sm bg-white flex w-full items-stretch justify-between gap-5 pl-4 pr-10 py-3 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
					<span className="flex items-stretch justify-between gap-2">
						<div className="flex-col fill-[radial-gradient(59.93%_59.93%_at_50%_50%,#D9D9D9_0%,#3B82F6_0.01%,#A4CFFF_45.83%,#00358C_100%)] overflow-hidden relative flex aspect-square w-[22px] items-center pt-2.5">
							<img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/11efb3fef2425fdc9cdccdcee3df7b23e11ca383998f6efbfa494ee2928a29fd?"
								className="absolute h-full w-full object-cover object-center inset-0"
							/>
							<img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/f55325f229d99ff0d6a9b83c783243a3e58d5962443a64b817621b8854c296e3?"
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
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdb718aff695bf5b5acafd7d7d097231aa261109f542eef272693d4f0668c75b?"
							className="aspect-square object-contain object-center w-[21px] overflow-hidden shrink-0 max-w-full"
						/>
						<div className="text-black text-xs font-semibold leading-5 self-center my-auto">John Doe</div>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/850e1212f2e2a2e181cf24b4224a15b094709337f2b2ee8e5e7fd5e7556566dc?"
							className="aspect-[2] object-contain object-center w-2.5 overflow-hidden self-center shrink-0 max-w-full my-auto"
						/>
					</span>
				</div>
			</div>
			<div className="w-full max-md:max-w-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
					<div className="flex flex-col items-stretch w-[17%] max-md:w-full max-md:ml-0">
						<Navbar />
					</div>
					<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col items-stretch mt-8 px-5 max-md:max-w-full max-md:mt-10">
							<div className="text-black text-xl font-semibold leading-8 max-md:max-w-full">Health Records</div>
							<span className="flex w-full items-center justify-between gap-5 mt-8 pr-16 max-md:max-w-full max-md:flex-wrap max-md:mt-10 max-md:pr-5">
								<div className="text-black text-base font-medium leading-6 my-auto">PATIENTS</div>
								<div className="self-stretch flex items-stretch justify-between gap-2.5">
									<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?"
											className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-stone-300 text-xs leading-5 my-auto" style={{ paddingRight: "300px" }}>
											SEARCH
										</div>
									</span>
									<span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb5cbfd4816355a68999fef579bfbfa8293f7f160f1e1220e37a13fc40c2d858?"
											className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
										/>
										<button className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
											FILTER
										</button>
									</span>
								</div>
							</span>
							<div className="flex flex-col items-stretch mt-8 pl-3.5 pr-20 max-md:max-w-full max-md:pr-5">
								<div className="flex w-full items-stretch justify-between gap-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/c389cff7fd79d2d12cc0ed7c292e5809ac87b9a64ef863fa7036a9a3e9c2cf8e?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
									</div>
								</div>
								<div className="flex w-full items-stretch justify-between gap-5 mt-5 pr-14 max-md:max-w-full max-md:flex-wrap max-md:pr-5">
									<div className="flex items-stretch justify-between gap-5">
										<img
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/09d495857b94bb2ba4fbb11f923f035e57e1c4b11f976b910fd888c303af7f81?"
											className="aspect-square object-contain object-center w-[49px] overflow-hidden shrink-0 max-w-full"
										/>
										<span className="self-center flex grow basis-[0%] flex-col items-stretch my-auto">
											<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">
												DELA CRUZ, JUAN
											</div>
											<div className="text-black text-xs leading-5 mt-3">AGE: 70</div>
										</span>
									</div>
									<div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
										<button className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
											View
										</button>
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
