import React from "react";

const ProgressBar = ({ currentStep }) => {
	const steps = ["Personal Information", "Family History", "Social History", "Medical History"];

	return (
		<div className="flex items-center pt-10">
			{steps?.map((step, index) => (
				<React.Fragment key={index}>
					<div className={`flex flex-col items-center ${currentStep > index ? "text-blue-500" : "text-gray-500"}`}>
						<div
							className={`w-8 h-8 rounded-full border-2 ${
								currentStep > index ? "border-blue-500 bg-blue-500 text-white" : "border-gray-500"
							} flex items-center justify-center`}
						>
							{index + 1}
						</div>
						<div className="mt-2 text-sm">{step}</div>
					</div>
					{index < steps.length - 1 && (
						// This is the line connecting the circles. You can edit its properties here.
						<div
							className={`flex-grow h-[1px] mx-0 mb-6 ${currentStep > index + 1 ? "bg-blue-500" : "bg-gray-500"}`}
						></div>
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default ProgressBar;
