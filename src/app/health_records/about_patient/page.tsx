import * as React from "react";
import Navbar from "../../navbar";
import HealthRecordsNav from "../healthRecordsNav";
import { useHRNav } from "@/app/store";

export default function MyComponent() {
	return (
		<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 h-[100vh]">
			<div className="w-full max-md:max-w-full h-full">
				<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0 h-full">
					<div className="flex flex-col items-stretch w-[17%] max-md:w-full max-md:ml-0 ">
						<Navbar />
					</div>

					<div className="flex flex-col items-stretch w-[83%] ml-5 max-md:w-full max-md:ml-0">
						<span className="flex flex-col mt-8 px-5 max-md:max-w-full max-md:mt-10">
							<span className="flex w-[221px] max-w-full flex-col items-stretch self-start">
								<div className="text-black text-xl font-semibold leading-8">Health Records</div>
								<div className="flex items-stretch justify-between gap-3.5 mt-10">
									<img
										loading="lazy"
										src="https://cdn.builder.io/api/v1/image/assets/TEMP/f93d5b041a77641729755adbc288033a6c368ab9f2f47627fb102ac12928179c?"
										className="aspect-square object-contain object-center w-[59px] overflow-hidden shrink-0 max-w-full"
									/>
									<span className="flex grow basis-[0%] flex-col items-stretch mt-4 self-start">
										<div className="text-black text-xs font-semibold leading-5">DELA CRUZ, JUAN</div>
										<div className="flex items-center">
											<div className="text-black text-xs leading-5 whitespace-nowrap pr-2">74 years old</div>
											<div className="relative">
												<div className="bg-stone-300 w-px h-4 top-0 bottom-0 left-1/2 transform -translate-x-1/2" />
											</div>
											<div className="text-black text-xs leading-5 whitespace-nowrap pl-2">Male</div>
										</div>
									</span>
								</div>
							</span>
							<HealthRecordsNav />
							<div className="text-black text-xs font-bold leading-5 mt-8 max-md:ml-1 max-md:mt-10">MASTER DATA</div>
							<div className="self-stretch mt-10 px-5 max-md:max-w-full max-md:mt-10 max-md:pr-5">
								<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
									<div className="flex flex-col items-stretch w-[44%] max-md:w-full max-md:ml-0">
										<div className="z-[1] flex items-stretch gap-4 my-auto max-md:mt-10">
											<div className="items-left flex-col max-md:hidden">
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?"
													className="aspect-square object-contain object-center w-5 overflow-hidden"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?"
													className="aspect-[1.25] object-contain object-center w-5 overflow-hidden mt-9"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?"
													className="aspect-[1.25] object-contain object-center w-5 fill-black overflow-hidden mt-9"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?"
													className="aspect-[1.25] object-contain object-center w-5 overflow-hidden mt-9"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"
													className="aspect-[1.11] object-contain object-center w-5 overflow-hidden mt-9"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/2afcd7832aea3646cef217f7aaf19b311bd3133a443e8b91269a59998c8333c5?"
													className="aspect-square object-contain object-center w-5 overflow-hidden mt-9"
												/>
												<img
													loading="lazy"
													src="https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?"
													className="aspect-[1.11] object-contain object-center w-5 overflow-hidden mt-9"
												/>
											</div>
											<span className="items-stretch flex grow basis-[0%] flex-col self-start">
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap">Name</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">Age</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
													Birthday
												</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">Gender</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">Address</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">Contact</div>
												<div className="text-black text-xs font-semibold leading-5 whitespace-nowrap mt-9">
													Allergies
												</div>
											</span>
										</div>
									</div>
									<div className="flex flex-col items-stretch w-[56%] ml-5 max-md:w-full max-md:ml-0">
										<span className="items-stretch flex flex-col my-auto max-md:mt-10">
											<div className="text-black text-xs leading-5">Juan Dela Cruz</div>
											<div className="text-black text-xs leading-5 mt-9">74</div>
											<div className="text-black text-xs leading-5 mt-9">January 01, 1950</div>
											<div className="text-black text-xs leading-5 mt-9">Male</div>
											<div className="text-black text-xs leading-5 whitespace-nowrap mt-9">
												1 Pasay Rd. Pasay City, Metro Manila
											</div>
											<div className="text-black text-xs leading-5 mt-9">0999 999 9999</div>
											<div className="text-black text-xs leading-5 mt-9">Penicillin</div>
										</span>
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
