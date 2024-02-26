import Image from "next/image";
import { useState } from "react";
import FamilyHistory from "./sub_components/viewfamilyHistory";
import { FaM } from "react-icons/fa6";
import BackButton from "./sub_components/BackButton";
export default function SocialHistory() {
    const [currentPage, setCurrentPage] = useState(0);
	const fHistory = [
        {
			name: "DELA CRUZ, JUANA",
			relationship: "MOTHER",
            value: (
                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 1);
                    }}
                >
                </button>
            ),
		},
        {
			name: "DELA CRUZ, JARED",
			relationship: "FATHER",
            value: (
                <button
                    onClick={() => {
                        setCurrentPage(currentPage + 2);
                    }}
                >
                </button>
            ),
		},
    ];
    const sHistory = [
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/7a91cfdd5846dc05e44380ed44e3b06466dab42e135dd9885eea2acdccfe9fee?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Smoking Status",
			value: "Active Smoker",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/65c9a72e3a94e2c92d81578df365997bc45a028f61ee1fba03762a4052e6f394?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Cigarettes Per Day",
			value: "8",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/b841c62f42d2c5d465163f55b524edf4dd643301dbe4fa2bcc0572263ffee5e1?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Alcohol",
			value: "Moderate Drinker",
		},
		{
			src: "https://cdn.builder.io/api/v1/image/assets/TEMP/272bfa12e1a92d2fff81cf645845a86243b21061b37393b3575f26e5a12a9821?apiKey=66e07193974a40e683930e95115a1cfd&",
			variable: "Physical Activities",
			value: "Sedentary",
		},
	];

    const handleVisitClick = () => {
        // Increment the currentPage when the user clicks the div
        setCurrentPage(currentPage + 1);
        };
    
	return (
		<>
        {currentPage === 0 ? (
        <>
            <div className="text-black text-base font-bold leading-5 mt-8 mb-4 max-md:ml-1 max-md:mt-10">
				FAMILY HISTORY
			</div>

            {fHistory.map((item, index) => (
                <button key={index} className="flex gap-2.5 mt-3 mb-3 text-xs text-black" onClick={handleVisitClick}>
                    <div className="flex flex-col flex-1 text-left">
                        <div className="font-semibold whitespace-nowrap">{item.name}</div>
                        <div>{item.relationship}</div>
						<div className="border-b border-gray-300 w-full mt-2"></div>
                    </div>
                </button>
            ))}

			<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">
				SOCIAL HISTORY
			</div>

			<table className="max-w-fit border-spacing-y-7 border-separate">
				{sHistory.map((item) => (
					<tr key={item.variable}>
						<td className="w-5">
							<Image alt="picture" height={0} width={0} loading="lazy" src={item.src} className="w-5" />
						</td>
						<td className="border-l-[16px] border-transparent">
							<div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item.variable}</div>
						</td>
						<td className="border-l-[5rem] border-transparent">
							<div className="text-black text-xs leading-5 ml-auto">{item.value}</div>
						</td>
					</tr>
				))}
			</table>
					<BackButton />
		</>
        ) : (
			""
		)}

		{currentPage === 1 ? (
			<>
				<FamilyHistory />
			</>
		) : (
			""
		)}
        </>
	);
}
