import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import BackButton from "./sub_components/BackButton";
import { getMasterDataDoctor } from "@/app/lib/backend//patient/personal_details/master_data";
import ViewAttendingDoctors from "./sub_components/viewAttendingDoctors";
import AddAttendingDoctors from "./sub_components/addAttendingDoctors";
export default function MasterData({ patientId }) {
	const [currentScreen, setCurrentScreen] = useState(0);
	const [mData, setmData] = useState([
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/86bc0813aecf897cafa42df901705c229a0a744cbf822394277aece4f7f5aa61?",
			variable: "Name",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/bdc83ab0b012624934a85572bc069777ad324e289e4cc66764a07f718b44bf9d?",
			variable: "Age",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?",
			variable: "Birthday",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4c3ec2f045c5a91d05c1f074f660097897b8fc83403da81ed7f44111303ef22f?",
			variable: "Gender",
			value: "",
		},
		{
			src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e77ec5f69c4c6a607193ae426085edd6fc84819ef906d2d9ebb491b796c8519b?"',
			variable: "Address",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
			variable: "Stroke in the past year",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d354e02d857f0929bd9b58b2f172642a26d8df38bfdf167b22bd115bfe9b4fea?",
			variable: "Allergies",
			value: (
				<button
					onClick={() => {
						router.push(`/health_records/about_patient/${patientId}/allergies`);
					}}
					className="flex items-center justify-center px-3 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
				>
					View
				</button>
			),
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/cafd760f8d1e87590398c40d6e223fabf124ae3120c9f867d6b2fc048ac936ec?",
			variable: "Attending Doctors",
			value: (
				<div className="flex items-center justify-between mr-20 gap-3">
					<button
						onClick={() => {
							setCurrentScreen(1);
						}}
						className="flex px-4 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
					>
						Add
					</button>
					<button
						onClick={() => {
							setCurrentScreen(2);
						}}
						className="flex px-4 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
					>
						View
					</button>
				</div>
			),
		},
	]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const masterData = await getMasterDataDoctor(patientId);

				// Create a new array with updated values
				const updatedData = mData.map((item) => {
					switch (item.variable) {
						case "Name":
							return { ...item, value: masterData["name"] };
						case "Age":
							return { ...item, value: masterData["age"] };
						case "Birthday":
							return { ...item, value: masterData["birthday"] };
						case "Gender":
							return { ...item, value: masterData["gender"] };
						case "Address":
							return { ...item, value: masterData["address"] };
						case "Stroke in the past year":
							return {
								...item,
								value: masterData["stroke_in_the_past_year"] === "true" ? "Yes" : "No",
							};
						default:
							return item;
					}
				});

				// Set the state with the new array
				setmData(updatedData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(0);

	return (
		<>
			{currentScreen === 0 ? (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">MASTER DATA</div>
					<table className="max-w-fit border-spacing-y-7 border-separate">
						{mData.map((item) => (
							<tr key={item.variable}>
								<td className="w-5">
									<Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
								</td>
								<td className="border-l-[16px] border-transparent">
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
								</td>
								<td className="border-l-[5rem] border-transparent">
									{typeof item.value === "string" || typeof item.value === "number" ? (
										<div className="text-black text-xs leading-5 ml-auto">{item.value}</div>
									) : (
										<div className="ml-auto">{item.value}</div>
									)}
								</td>
							</tr>
						))}
					</table>
					<div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10"></div>
					<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
				</>
			) : null}
			{currentScreen === 1 ? (
				<>
					<AddAttendingDoctors currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
				</>
			) : currentScreen === 2 ? (
				<>
					<ViewAttendingDoctors currentScreen={currentScreen} setCurrentScreen={setCurrentScreen} />
				</>
			) : null}
		</>
	);
}
