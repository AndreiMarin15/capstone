"use client";

import Image from "next/image";
import * as React from "react";
import { currentUser, useUserInfo } from "@/app/store";
import referral from "@/backend//referral/getRequests";
import Request from "./components/request";

export default function ViewSharing() {
	const [sharing, setSharing] = React.useState(null);
	const handleApproval = async (value, id) => {
		const response = await fetch(
			(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") +
				"/updateRequestStatus",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					id: id,
					status: value,
				}),
			}
		);

		console.log(response);
	};

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				(process.env.NEXT_PUBLIC_MIDDLEWARE_API_CALLS ?? "https://cap-middleware.onrender.com/user") + "/getRequests",
				{
					method: "POST", // or 'PUT'
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						api_key: "6d5d2d80-b0c7-4e3a-8622-65813c693d96",
						requested_from: `${currentUser.getState().user.email ?? "testpatient@gmail.com"}`,
					}), // replace this with your actual data
				}
			);

			if (!response.ok) {
				const message = `An error has occurred: ${response.status}`;
				throw new Error(message);
			}

			const data = await response.json();
			console.log(data);

			const clean = data?.map(async (item) => {
				const doctor = await referral.getDoctorData(item.requested_by);
				const specialization = await referral.getDoctorSpecialization(doctor.specialization_id);

				const toReturn = {
					id: item.id,
					name: `${doctor.first_name} ${doctor.last_name}`,
					specialization: specialization,
					document: [item.content.data_requested],
					status: item.status,
				};

				return toReturn;
			});

			const toShare = await Promise.all(clean);
			console.log(toShare);

			setSharing(toShare);
			console.log(sharing);
		};

		fetchData().catch((error) => console.error(error.toString()));
	}, []);
	return (
		<>
			<div className="border bg-white flex flex-col items-stretch border-solid border-stone-300 h-[100vh] pt-10">
				<div className="w-full max-md:max-w-full">
					<div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
						<div className="flex flex-col items-stretch w-[82%] ml-5 max-md:w-full max-md:ml-0">
							<span className="flex flex-col my-auto px-5 max-md:max-w-full max-md:mt-10">
								<div className="text-black text-xl font-semibold leading-8 self-stretch max-md:max-w-full">
									Sharing Request
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
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Specialization
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Requested Document
										</th>
										<th className="px-6 py-3 text-left text-m font-semibold text-black uppercase tracking-wider">
											Approve Request
										</th>
									</tr>
								</thead>

								{sharing != null && sharing.length > 0 ? (
									<>
										<tbody className="bg-white divide-y divide-gray-200">
											{sharing?.map((sharing, index) => (
												<>
													{sharing.status === null && (
														<Request sharing={sharing} index={index} handleApproval={handleApproval} />
													)}
												</>
											))}
										</tbody>
									</>
								) : Array.isArray(sharing) && sharing.length === 0 ? (
									<tbody className="bg-white divide-y divide-gray-200">
										<tr>
											<td className="px-6 py-4 whitespace-nowrap">No Data Found</td>
										</tr>
									</tbody>
								) : (
									<tbody className="bg-white divide-y divide-gray-200">
										<tr>
											<td className="px-6 py-4 whitespace-nowrap">Loading...</td>
										</tr>
									</tbody>
								)}
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
