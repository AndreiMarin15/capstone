import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getMasterData } from "../../../../../lib/backend/patient/personal_details/master_data";
import EditMasterData from "./sub_components/editMasterData";
import { currentUser } from "../../../store";
import { PatientEditInfo as editInfo } from "../../../../../lib/backend/patient/edit/edit_info";
export default function MasterData() {
	const [currentPage, setCurrentPage] = useState(0);

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
						router.push("/patient/personal_details/allergies");
					}}
					className="flex items-center px-8 py-1 rounded border-sky-900 border-solid aspect-[5] font-semibold text-xs border-1.5 bg-sky-900 text-white"
				>
					VIEW
				</button>
			),
		},
	]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const masterData = await getMasterData();

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

	const handleMasterChange = (e, index) => {
		const newMaster = [...mData];
		newMaster[index].value = e.target.value;
		setmData(newMaster);
	};

	const handleSaveChanges = async () => {
		const updatedInfo = mData.reduce((acc, item) => {
			acc[item.variable] = item.value;
			return acc;
		}, {});

		try {
			const resp = await editInfo.updateMasterData(currentUser.getState().info.id, updatedInfo);

			console.log("Master data updated successfully:", resp);
			setIsEditingMaster(false); // Exit edit mode after saving
		} catch (error) {
			console.error("Error saving changes:", error);
		}
	};

	return (
		<>
			{currentPage === 0 ? (
				<>
					<div className="text-black text-base font-bold leading-5 mt-8 mb-5 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
						MASTER DATA
						<button
							className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5"
							onClick={() => setCurrentPage(1)}
						>
							Edit Master Data
						</button>
					</div>
					<table className="max-w-fit border-spacing-y-7 border-separate">
						{mData.map((item) => (
							<tr key={item.variable} suppressHydrationWarning>
								<td className="w-5">
									<Image alt="picture" height={0} width={0} loading="lazy" src={item["src"]} className="w-5" />
								</td>
								<td className="border-l-[16px] border-transparent">
									<div className="text-black text-xs font-semibold leading-5 self-center my-auto">
										{item["variable"]}
									</div>
								</td>
								<td className="border-l-[5rem] border-transparent">
									{typeof item.value === "string" || typeof item.value === "number" ? (
										<div className="text-black text-xs leading-5 ml-auto">{item["value"]}</div>
									) : (
										<div className="ml-auto">{item["value"]}</div>
									)}
								</td>
							</tr>
						))}
					</table>
					{isEditingMaster && (
						<button
							className="self-end gap-1.5 justify-between px-10 py-1 rounded border-sky-900 bg-sky-900 text-white border-solid text-xs font-semibold border-1.5"
							onClick={() => {
								// Call the handleSaveChanges function here
								handleSaveChanges();
								setIsEditingMaster(false); // Optionally, perform additional logic after calling the function
							}}
						>
							Save
						</button>
					)}
					<div className="flex flex-col items-start justify-end text-xs font-semibold text-black whitespace-nowrap rounded max-w-[137px] mt-10"></div>
				</>
			) : (
				""
			)}

			{currentPage === 1 ? (
				<>
					<EditMasterData />
				</>
			) : (
				""
			)}
		</>
	);
}
