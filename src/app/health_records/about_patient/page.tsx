import * as React from "react";
import Navbar from "../../navbar";
import HealthRecordsNav from "../healthRecordsNav";
import PatientProfile from "../patientProfile";

export default function MyComponent() {
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300">
			
			<div className="w-full max-md:max-w-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
					<div className="flex flex-col items-stretch w-[17%] max-md:w-full max-md:ml-0">
						<Navbar />
					</div>

					<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0 h-[100vh]">
						<span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
							<span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
								<div className="text-black text-xl font-semibold leading-8">Health Records</div>
								<PatientProfile />
								{/* <div className="flex items-stretch justify-between gap-3.5 mt-10">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?"
										className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
									/>
									<span className="flex grow basis-[0%] flex-col items-stretch mt-4 self-start">
										<div className="text-black text-xs font-semibold leading-5">DELA CRUZ, Juan</div>
										<div className="flex items-center">
											<div className="text-black text-xs leading-5 whitespace-nowrap pr-2">74 years old</div>
											<div className="relative">
												<div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
											</div>
											<div className="text-black text-xs leading-5 whitespace-nowrap pl-2">Male</div>
										</div>
									</span>
								</div> */}
							</span>
							<HealthRecordsNav />
							<div className="text-black text-xs font-bold leading-5 mt-8 mb-8 max-md:ml-1 max-md:mt-10">
								MEDICAL HISTORY
							</div>

							<span className="flex items-center gap-2.5 mb-8">
								<div className="text-black text-xs font-bold leading-5 whitespace-nowrap">STATUS:</div>
								<span className="border self-stretch flex justify-between gap-5 pl-6 pr-2 py-1.5 rounded-md border-solid border-zinc-400 items-start">
									<div className="text-black text-xs font-medium leading-5">Active</div>
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/554c1e18059b6f0490f9d598b5f23e6954398601ddfbab70a22496a73e532e48?"
										className="aspect-[0.55] object-contain object-center w-1.5 overflow-hidden self-stretch shrink-0 max-w-full"
									/>
								</span>
							</span>

							<div className="flex grow flex-col items-stretch max-md:mt-10 gap-y-[30px]">
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?"
										className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Diagnosis</div>
								</span>
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?"
										className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">
										Date of Diagnosis
									</div>
								</span>
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/abf6097d90bb41a27fe7af53db50a7e72d58f98784d373f3d96269100499e801?"
										className="aspect-[0.88] object-contain object-center w-3.5 fill-black overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Doctor</div>
								</span>
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?"
										className="aspect-square object-contain object-center w-4 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Procedure/s</div>
								</span>
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/7902b2ce256c214a23ab208ae308822af7403afd38460b9ef2c7f83be18954b6?"
										className="aspect-square object-contain object-center w-[18px] overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Care Plan</div>
								</span>
								<span className="flex items-stretch gap-4">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/73a75686b5cd170bb3f25deb8f06c42c071c4ba5dc25573afa2fcfb453e5b5f4?"
										className="aspect-square object-contain object-center w-5 overflow-hidden shrink-0 max-w-full"
									/>
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">Lab Tests</div>
								</span>
							</div>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
