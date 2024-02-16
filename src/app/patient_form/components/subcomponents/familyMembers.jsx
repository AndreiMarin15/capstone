import { useState } from "react";
import { usePatientInfo } from "@/app/store";

export default function FamilyMemberForm() {
	const patient = usePatientInfo();
	const [saved, setSaved] = useState(false);
	const [familyMember, setFamilyMember] = useState({
		last_name: "",
		first_name: "",
		age: 0,
		gender: "Male",
		relationship: "",
		medical_condition: "",
		medical_condition_date: "",
		medical_condition_outcome: "",
		medical_procedures: [],
	});
	return (
		<>
			<div className="flex items-stretch justify-between gap-5 mr-4  max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
				<span className="items-stretch flex grow basis-[0%] flex-col self-start">
					<div className="text-black text-sm font-semibold leading-5">Family member first name</div>
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									first_name: e.target.value,
								};
							});
						}}
						value={familyMember.first_name}
						className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>
				</span>
				<span className="items-stretch flex grow basis-[0%] flex-col self-start">
					<div className="text-black text-sm font-semibold leading-5">Family member last name</div>
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									last_name: e.target.value,
								};
							});
						}}
						value={familyMember.last_name}
						className="rounded shadow-sm flex shrink-0 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>
				</span>
			</div>
			<div className="flex items-stretch justify-between gap-3 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
				<span className="items-stretch flex-col self-start">
					<div className="text-black text-sm font-semibold leading-5 whitespace-nowrap">Age</div>
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									age: e.target.value,
								};
							});
						}}
						value={familyMember.age}
						className="rounded shadow-sm flex-shrink-0 w-14 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>
				</span>
				<span className="items-stretch flex-grow basis-[0%] flex-col">
					<div className="text-black text-sm font-semibold leading-5">Gender</div>
					<select
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									gender: e.target.value,
								};
							});
						}}
						value={familyMember.gender}
						className="text-black rounded shadow-sm flex-shrink-0 w-32 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					>
						{" "}
						<option value="">Select</option>
						<option value="Male">Male</option>
						<option value="Female">Female</option>
					</select>{" "}
				</span>
				<div className="flex items-stretch self-stretch flex-grow flex-col">
					<div className="text-black text-sm font-semibold leading-5">Patient Relationship with Family Member</div>
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									relationship: e.target.value,
								};
							});
						}}
						value={familyMember.relationship}
						className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>
				</div>
			</div>
			<div className="flex items-stretch justify-between gap-5 mr-4 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
				<div className="flex items-stretch self-stretch flex-grow flex-col">
					<div className="text-black text-sm font-semibold leading-5">Medical Condition of the Family Member</div>
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									medical_condition: e.target.value,
								};
							});
						}}
						value={familyMember.medical_condition}
						className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>
				</div>
				<div className="flex items-stretch gap-2.5 mt-1. self-start">
					<span className="flex grow basis-[0%] flex-col items-stretch">
						<div className="text-black text-sm font-semibold leading-5">Date when Condition Started</div>

						<div className="flex items-stretch justify-between gap-2.5 mt-2">
							<div className="flex justify-between gap-2.5">
								<input
									onChange={(e) => {
										setFamilyMember((prev) => {
											return {
												...prev,
												medical_condition_date: e.target.value,
											};
										});
									}}
									value={familyMember.medical_condition_date}
									type="date"
									className="text-black text-sm whitespace-nowrap rounded shadow-sm flex-shrink-0 justify-center items-stretch px-2 py-2.5 border-[0.5px] border-solid border-black"
								/>
							</div>
						</div>
					</span>
				</div>
			</div>
			<div className="text-black text-sm font-semibold leading-5 flex items-stretch justify-between gap-5 mr-9 mt-10 max-md:max-w-full max-md:flex-wrap max-md:mr-2.5 max-md:mt-10">
				Medical Condition Outcomes of the Family Member
			</div>
			<select
				onChange={(e) => {
					setFamilyMember((prev) => {
						return {
							...prev,
							medical_condition_outcome: e.target.value,
						};
					});
				}}
				value={familyMember.medical_condition_outcome}
				className="text-black rounded shadow-sm flex-shrink-0 w-60 h-[30px] flex-col mt-2 border-[0.5px] px-2 py-5 border-solid border-black"
			>
				{" "}
				<option value="">Select</option>
				<option value="deceased">Deceased</option>
				<option value="recovered">Recovered</option>
				<option value="chronic">Chronic</option>
				<option value="chronic">Improved</option>
			</select>{" "}
			<div className="flex items-stretch self-stretch mt-8 flex-grow flex-col">
				<div className="text-black text-sm font-semibold leading-5">
					Medical Procedures Performed on the Family Member (if any){" "}
				</div>

				<div className="flex gap-2.5 justify-between mt-2 text-lg text-white whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
					<input
						onChange={(e) => {
							setFamilyMember((prev) => {
								return {
									...prev,
									medical_procedures: [...prev.medical_procedures, e.target.value],
								};
							});
						}}
						value={familyMember.medical_procedures[0]}
						className="rounded shadow-sm h-[30px] flex-grow flex-col mt-2 border-[0.5px] px-2 py-4 border-solid border-black"
					/>

					<button className="justify-center items-center px-2 my-auto bg-gray-400 rounded-full aspect-square h-[25px]">
						+
					</button>
				</div>
			</div>
			<button
				onClick={() => {
					if (saved === false) {
						patient.addFamily(familyMember);
						setSaved(true);

						setFamilyMember({
							last_name: "",
							first_name: "",
							age: "",
							gender: "",
							relationship: "",
							medical_condition: "",
							medical_condition_date: "",
							medical_condition_outcome: "",
							medical_procedures: [""],
						});

						setTimeout(() => {
							setSaved(false);
						}, 500);
					}
				}}
				className={
					"text-white text-xs font-semibold whitespace-nowrap justify-center items-stretch mt-5" +
					(saved ? " bg-lime-600 " : " bg-sky-900 ") +
					"self-stretch mr-2  px-6 py-2 rounded max-md:px-5"
				}
			>
				{saved ? "Saved" : "Save or Add"}
			</button>
		</>
	);
}
