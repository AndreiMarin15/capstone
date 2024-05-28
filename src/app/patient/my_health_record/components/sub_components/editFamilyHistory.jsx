import Image from "next/image";
import * as React from "react";
import { useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { importVitalsAndBiometrics } from "@/backend//patient/vitalsAndBiometrics/vitalsAndBiometrics";
import BackButton from "./BackButton";
import { currentUser, useUserInfo } from "@/app/store";
import { PatientSignUp } from "@/backend//signup/patient_signup";

import { usePatientInfo } from "@/app/store";

import { getMasterData } from "@/backend//patient/personal_details/master_data";

export default function EditFamilyHistory({ currentPage, setCurrentPage }) {
	const [fHistory, setFHistory] = useState([
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "First Name",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Last Name",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b947b8e54bf04f2cb0c3ec2f17d835819b72247144f9a6d4d213b09ee01afe5a?",
			variable: "Relationship",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/936d5969435e0b8888fc1c49414bdbbea73d3ea25eb29b5a417543d297cd6624?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Condition",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Date",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3989204c70d706bac6f9f46ddda5aa4e7e97fa6018e996dd7dc93112d8fd1b8b?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Outcome",
			value: "",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f4d912f8102b745e1cadcdfa06bd7d42c5f96a1f5470e70c3e8d52350dbb2192?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Procedure/s",
			value: "",
		},
	]);

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const masterData = await getMasterData();
				// Set the state with the fetched data
				setFHistory((prevFHistory) => {
					return prevFHistory?.map((item) => {
						switch (item.variable) {
							case "First Name":
								return { ...item, value: masterData["firstName"] };
							case "Last Name":
								return { ...item, value: masterData["lastName"] };
							// Add cases for other variables as needed
							default:
								return item;
						}
					});
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e, variable) => {
		const updatedFHistory = fHistory?.map((item) =>
			item.variable === variable ? { ...item, value: e.target.value } : item
		);
		setFHistory(updatedFHistory);
	};

	const handleSave = async () => {
		try {
			const patientId = currentUser.id; // Assuming you have the patient's ID
			const familyHistoryData = fHistory?.map((item) => ({
				first_name: item.value, // Assuming first_name, last_name, relationship, etc. are the keys in your family history data
				last_name: item.value,
				relationship: item.value,
				// Map other fields accordingly
			}));
			const response = await updateFamilyMemberHistory(patientId, familyHistoryData);
			if (response.success) {
				toast.success(response.message);
				// Additional success handling
			} else {
				toast.error(response.message);
				// Additional error handling
			}
		} catch (error) {
			console.error("Error saving family history:", error);
			toast.error("Failed to save family history.");
		}
	};

	return (
		<>
			<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">FAMILY HISTORY</div>

			<table className="max-w-fit border-spacing-y-7 border-separate">
				{fHistory?.map((item) => (
					<tr key={item.variable}>
						<td className="w-5">
							<Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
						</td>
						<td className="border-l-[16px] border-transparent">
							<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
						</td>
						<td className="border-l-[5rem] border-transparent">
							{item.variable === "Outcome" ? (
								<select
									value={item.value}
									onChange={(e) => handleInputChange(e, item.variable)}
									className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
								>
									<option value="Deceased">Deceased</option>
									<option value="Recovered">Recovered</option>
									<option value="Chronic">Chronic</option>
									<option value="Improved">Improved</option>
								</select>
							) : item.variable === "Date" ? (
								<input
									type="number"
									min="1900"
									max={new Date().getFullYear()}
									value={item.value}
									onChange={(e) => handleInputChange(e, item.variable)}
									className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
								/>
							) : (
								<input
									value={item.value}
									onChange={(e) => handleInputChange(e, item.variable)}
									className="justify-center items-start py-1.5 pr-14 pl-3 whitespace-nowrap rounded border-black border-solid shadow-sm border-[0.5px] max-md:pr-5"
								/>
							)}
						</td>
					</tr>
				))}
			</table>

			{/* BACK & SAVE BUTTON */}
			<div className="flex justify-between items-center mt-5">
				<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<div>
					<button
						onClick={handleSave}
						className="flex items-center justify-center px-5 py-1 rounded border border-sky-900 border-solid font-semibold border-1.5 text-xs bg-sky-900 text-white"
					>
						SAVE
					</button>
				</div>
			</div>
		</>
	);
}
