import Image from "next/image";
import { useState } from "react";
import { usePatientInfo } from "@/app/store";
export default function AllergyForm() {
	const patient = usePatientInfo();
	const [saved, setSaved] = useState(false);
	const [allergy, setAllergy] = useState({
		category_of_allergen: "",
		allergen: "",
		reactions: [],
		severity_of_allergy: "",
		date_of_onset: "",
		comments: "",
	});

	const form = [
		{
			label: "Category of Allergen",
			field: (
				<select
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								category_of_allergen: e.target.value,
							};
						});
					}}
					className="rounded shadow-sm h-10 mt-2 border-[0.5px] px-2 py-2 border-solid border-black"
				>
					<option value="">Select Category</option>
					<option value="1">Category 1</option>
					<option value="2">Category 2</option>
					{/* Add more options here */}
				</select>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/6f6c16bf79fcef72c689d9cf0dca5633ff9c15a7fd4a0cfecf641759b0e5e537?",
		},
		{
			label: "Allergen",
			field: (
				<select
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								allergen: e.target.value,
							};
						});
					}}
					className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
				>
					<option value="">Select Allergen</option>
					<option value="1">Allergen 1</option>
					<option value="2">Allergen 2</option>
					{/* Add more options here */}
				</select>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/8d83467a6242c7712b40f0ed0318ecf32eb3765ea8bbaaa517562b75d192879b?",
		},
		{
			label: "Select Reactions",
			field: (
				<select
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								reactions: [...prev.reactions, e.target.value],
							};
						});
					}}
					className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
				>
					<option value="">Select Reactions</option>
					{/* Add more options here */}
				</select>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0f79f841ae91f66e8662f831b661819a926269652b904eff7314e2b43bb39640?apiKey=66e07193974a40e683930e95115a1cfd&width=100",
		},
		{
			label: "Severity of Allergy",
			field: (
				<select
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								severity_of_allergy: e.target.value,
							};
						});
					}}
					className="rounded shadow-sm h-10 mt-3 border-[0.5px] px-2 py-2 border-solid border-black"
				>
					<option value="">Select Severity of Allergy</option>
					{/* Add more options here */}
				</select>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/09f59612784184ecb36b692dc99a1889ca09a88615d7298261028160ecff647b?apiKey=66e07193974a40e683930e95115a1cfd&width=100",
		},
		{
			label: "Date of Onset",
			field: (
				<input
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								date_of_onset: e.target.value,
							};
						});
					}}
					type="date"
					className=" rounded  border-[0.5px]  border-solid border-black"
				/>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/0bb69b9515bc818bc73ff5dde276a12e32e8a33d1ed30b5ec991895330f154db?",
		},
		{
			label: "Comments",
			field: (
				<textarea
					onChange={(e) => {
						setAllergy((prev) => {
							return {
								...prev,
								comments: e.target.value,
							};
						});
					}}
					className="text-black shrink-0 mt-6 p-2 rounded border-black border-solid border-[0.5px] h-[81px]"
				/>
			),
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/35d66426cc909742122370c08977979ec58e47bea43f66c6158506c2d6dea5ca?",
		},
	];

	return (
		<div>
			<table className="max-w-fit border-spacing-y-7 border-separate">
				{form.map((item) => (
					<tr key={item.label}>
						<td className="border-l-[16px] border-transparent">
							<div className="text-black text-xs font-semibold flex">
								<Image
									alt="image"
									height={18}
									width={18}
									loading="lazy"
									src={item.src}
									className="self-start aspect-square w-[18px] mr-3"
								/>
								{item.label}
							</div>
						</td>
						<td className="border-l-[5rem] border-transparent">
							<div>{item.field}</div>
						</td>
					</tr>
				))}
			</table>
			<button
				onClick={() => {
					if (saved === false) {
						patient.addAllergy(allergy);
						setSaved(true);
					}
				}}
				className={
					"text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch" +
					(saved ? " bg-lime-600 " : " bg-sky-900 ") +
					"self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
				}
			>
				{saved ? "Saved" : "Save Allergy"}
			</button>
		</div>
	);
}
