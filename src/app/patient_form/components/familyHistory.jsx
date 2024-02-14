import { usePatientInfo } from "@/app/store";
import { useEffect, useState } from "react";
import FamilyMembersForm from "./subcomponents/familyMembers";
export default function SignUpFamilyHistory() {
	const patientStore = usePatientInfo();
	const [showFamily, setshowFamily] = useState(false);
	return (
		<div className="container mx-auto mt-16 mb-5 flex h-auto pb-10">
			{/* Left Column */}
			<div className="w-1/2 pr-8 flex flex-col">
				<div className="text-black text-base font-semibold leading-6">Family History</div>
				<div className="text-zinc-600 text-base leading-6 mt-2">
					Kindly enter any patient family history that is relevant with the disease. <br />
					<br />
					This includes:
					<br />
					- Diseases related to the heart
					<br />
					- Diseases related to the eyes
					<br />
					- Disease related to the kidney
					<br />- Diseases related to the digestive system
				</div>
			</div>

			{/* Right Column */}
			<div className="w-1/2 pl-8">
				{showFamily && (
					<div>
						<FamilyMembersForm />
					</div>
				)}
				{!showFamily && (
					<div className="flex gap-1.5 self-start mt-10 whitespace-nowrap">
						<button
							onClick={() => {
								setshowFamily(true);
							}}
							className="justify-center items-center px-1.5 text-lg text-white bg-gray-400 rounded-full aspect-square h-[25px]"
						>
							+
						</button>
						<div className="grow text-base text-gray-400">Add Family Member</div>
					</div>
				)}
			</div>
		</div>
	);
}
