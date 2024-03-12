import Image from "next/image";
import * as React from "react";
import Link from "next/link";
export default function ViewDoctors() {
	const defaultIconSrc =
		"https://cdn.builder.io/api/v1/image/assets/TEMP/a8dedf603ab1b2738fdec0d172ab06fda7dd43e50364fe6839a4b4b5bacc7b06?apiKey=7e8c8e70f3bd479289a042d9c544736c&";

	const doctors = [
		{
			name: "Dr. Johnny Santos",
			hospital: "Philippine General Hospital",
			specialization: "Endocrinology",
			yearsOfExperience: 8,
		},
		{
			name: "Dr. John Doe",
			hospital: "Philippine General Hospital",
			specialization: "Internal Medicine",
			yearsOfExperience: 5,
		},
	];
	return (
		<>
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 h-[100vh] pt-10">
				<div className="w-full max-md:max-w-full">
					<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
						<div className="flex flex-col items-stretch w-[82%] ml-5 max-md:w-full max-md:ml-0">
							<span className="flex flex-col my-auto px-5 max-md:max-w-full max-md:mt-10">
								<div className="text-black text-xl font-semibold leading-8 self-stretch max-md:max-w-full">
									Attending Doctors
								</div>
								<div className="flex items-stretch gap-2.5 mt-3.5 pr-7 self-end max-md:pr-5">
									<span className="flex items-stretch justify-between gap-2 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2aee5eaae6c8b317fa94c9456603d2ba5c59247e65984390a06ee8f8b01312c?apiKey=66e07193974a40e683930e95115a1cfd&"
											className="aspect-square object-contain object-center w-[13px] fill-stone-300 overflow-hidden shrink-0 max-w-full ml-1"
										/>
										<input
											type="text"
											className="text-stone-300 text-xs leading-5 my-auto"
											placeholder="SEARCH"
										></input>
									</span>
									<span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/872489d37c6f07090c71fb194a8c077334f5ee8d7e865b4e470f49f5a27b95ba?apiKey=66e07193974a40e683930e95115a1cfd&"
											className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">
											FILTER
										</div>
									</span>
									<span className="flex items-stretch justify-between gap-1 px-2.5 py-2 rounded-md border-[0.5px] border-solid border-black">
										<Image
											alt="picture"
											height={0}
											width={0}
											loading="lazy"
											src="https://cdn.builder.io/api/v1/image/assets/TEMP/49eeb01b15c87289299d3123ede7ccfbf333d278cb9ddfc7f5674a94c5d52e26?apiKey=66e07193974a40e683930e95115a1cfd&"
											className="aspect-[0.86] object-contain object-center w-3 overflow-hidden shrink-0 max-w-full"
										/>
										<div className="text-black text-xs leading-5 self-center grow whitespace-nowrap my-auto">SORT</div>
									</span>
								</div>
							</span>
							<table className="min-w-full divide-y divide-gray-200 mt-10">
								<thead className="bg-gray-50 border border-gray-200 drop-shadow-xl rounded-md">
									<tr>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider ">
											Name
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Hospital
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Specialization
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Years of Experience
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider"></th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{doctors.map((doctor, index) => (
										<tr key={index}>
											<td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
											<td className="px-6 py-4 whitespace-nowrap">{doctor.hospital}</td>
											<td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
											<td className="px-6 py-4 whitespace-nowrap">{doctor.yearsOfExperience}</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<Link href="/patient/messages">
													<Image
														height={0}
														width={0}
														src={doctor.iconSrc || defaultIconSrc}
														alt="Icon"
														className="h-8 w-8 cursor-pointer"
													/>
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
