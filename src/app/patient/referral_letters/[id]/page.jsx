"use client";
import * as React from "react";
import Image from "next/image";
import referralLetters from "@/backend//referral_letters/getData";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
export default function ReferralLetter({ params }) {
	const pdfRef = React.useRef();
	const referralLetterId = params.id;
	const [referralDetails, setDetails] = React.useState({
		doctor_name: "",
		medications: "",
		other_remarks: "",
		specialization: "",
		place_of_clinic: "",
		reason_for_referral: "",
	});
	React.useEffect(() => {
		const fetchLetter = async () => {
			const data = await referralLetters.getLetter(referralLetterId);

			console.log(data.referral_data);
			setDetails(data.referral_data);
		};
		fetchLetter();
	}, []);

	const downloadPDF = () => {
		const input = pdfRef.current;
		input.classList.remove("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save(`referral_letter_${referralDetails.doctor_name}.pdf`);

			input.classList.add("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");
		});
	};

	const downloadPDF4 = () => {
		const input = pdfRef.current;

		// Temporarily remove the classes
		input.classList.remove("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");

		const opt = {
			margin: 1,
			filename: `referral_letter_${referralDetails.doctor_name}.pdf`,
			image: { type: "jpeg", quality: 0.98 },
			html2canvas: { scale: 1 },
			jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
		};

		html2pdf().from(input).set(opt).save();

		// Add the classes back
		input.classList.add("rounded", "border", "border-gray-200", "border-solid", "shadow-sm");
	};

	return (
		<div className="flex flex-col h-screen mx-4 self-stretch my-auto max-md:mt-10 max-md:max-w-full">
			<div className="flex gap-5 w-full max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
				<div className="flex-auto my-auto text-xl font-semibold leading-8 text-black">Referral Letters</div>
			</div>
			<div className="flex gap-5 px-5 mt-11 w-full text-xs font-medium leading-5 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
				<div className="flex gap-2.5 text-black">
					<Image
						alt="img"
						height={0}
						width={0}
						loading="lazy"
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?apiKey=66e07193974a40e683930e95115a1cfd&"
						className="shrink-0 aspect-square fill-black w-[15px]"
					/>
					<div className="flex-auto">Referral Letter to Dr. {referralDetails.doctor_name}</div>
				</div>
				<div
					onClick={() => {
						downloadPDF();
					}}
					className="hover:cursor-pointer flex-auto text-blue-500 underline"
				>
					Download as PDF
				</div>
			</div>
			<div
				ref={pdfRef}
				className="flex flex-col px-9 pt-5 pb-20 mt-8 text-xs leading-5 text-black bg-white rounded border border-gray-200 border-solid shadow-sm max-md:px-5 max-md:max-w-full"
			>
				<div className="font-semibold max-md:max-w-full">To: Dr. {referralDetails.doctor_name}</div>
				<div className="mt-3.5 font-semibold max-md:max-w-full">{referralDetails.specialization}</div>
				<div className="mt-20 leading-5 max-md:mt-10 max-md:max-w-full">
					Reason for Referral: <br />
					{referralDetails.reason_for_referral}{" "}
				</div>
				<div className="mt-14 leading-5 max-md:mt-10 max-md:max-w-full">
					Here are the medications I am giving the patient: <br />
					<div>
						{referralDetails.medications.split("\n").map((line, index) => (
							<React.Fragment key={index}>
								{line}
								<br />
							</React.Fragment>
						))}
					</div>
				</div>
				<div className="mt-14 mb-20 max-md:my-10 max-md:max-w-full">
					Other Notes: <br />
					{referralDetails.other_remarks}{" "}
				</div>
			</div>
		</div>
	);
}
