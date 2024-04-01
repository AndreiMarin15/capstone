import React, { useState, useRef } from "react";
import Image from "next/image";
import AddLabTest from "./recordLabTest";
import LabSample from "../../../../../assets/lab-test-sample.png";
import BackButton from "./BackButton";
import Happy from "../../../../../assets/happy.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function ViewCarePlan({ carePlan, currentScreen, setCurrentScreen }) {
	// const [currentScreen3, setCurrentScreen3] = useState(0);
	const pdfRef = useRef();
	const downloadPDF = () => {
		const input = pdfRef.current;

		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save(`Care Plan.pdf`);
		});
	};
	return (
		<>
			<div className="text-black text-base font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10 flex justify-between items-center">
				CARE PLAN #1
				<div className="flex gap-3">
					<button className="flex gap-1.5 justify-between px-10 py-1 rounded border-blue-800 text-blue-800 border-solid text-xs font-semibold border-1.5">
						Edit
					</button>
					<div onClick={downloadPDF} className="text-blue-500 text-xs  flex items-center hover:cursor-pointer">
						<Image
							height={0}
							width={0}
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
							alt="icon"
							className="w-4 mr-2"
						/>
						<span>Download(.pdf)</span>
					</div>
				</div>
			</div>
			<div ref={pdfRef} className="p-5">
				<div className="text-start text-sm mt-10 whitespace-nowrap font-semibold text-black">Care Plan</div>

				{carePlan.map((careplan, index) => (
					<div key={index} className="flex flex-col mt-10 items-start text-xs leading-5 text-black max-w-[601px]">
						<div className="flex gap-3.5 font-semibold whitespace-nowrap">
							<Image
								alt="image"
								height={0}
								width={0}
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/4a525f62acf85c2276bfc82251c6beb10b3d621caba2c7e3f2a4701177ce98c2?"
								className="aspect-square fill-black w-[15px]"
							/>

							<div className="my-auto">{careplan.detail.code.coding[0].display}</div>
						</div>

						<div className="flex gap-5 justify-between ml-7 max-md:ml-2.5">
							<div className="flex gap-5 text-left self-stretch w-full max-md:flex-wrap max-md:max-w-full">
								<div className="pr-8">
									<span className="font-normal">{careplan.detail.description}</span>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex items-start justify-between mt-5">
				<button
					onClick={setCurrentScreen}
					className="flex items-center justify-center px-2 py-1 rounded text-xs border border-sky-900 border-solid font-semibold border-1.5"
				>
					<div className="flex gap-0.5 justify-between items-center">
						<Image
							height={0}
							width={0}
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/0de7471415fd70bdaba9dd1e6f7c2e7075e37988a454dfb91c7aed9b11350077?"
							className="w-3 h-3 aspect-square"
							alt="Back Arrow"
						/>
						<div className="text-xs">BACK</div>
					</div>
				</button>
			</div>
		</>
	);
}
