import Image from "next/image";
import * as React from "react";
export default function PredictiveAnalytics() {
	const pAnalytics = [
		{
			variable: "Gender",
			value: "Male"
		},
		{
			variable: "Age",
			value: "74"
		},
        {
			variable: "Current Smoker",
			value: "Yes"
		},
        {
			variable: "Taking Blood Pressure Medicine",
			value: "Yes"
		},
        {
			variable: "Prevalent Smoke",
			value: "Yes"
		},
        {
			variable: "Prevalent Hypertension",
			value: "Yes"
		},
        {
			variable: "Total Cholesterol",
			value: "180 mg/dL"
		},
        {
			variable: "Systolic Blood Pressure",
			value: "100"
		},
        {
			variable: "Diastolic Blood Pressure",
			value: "80"
		},
        {
			variable: "BMI",
			value: "50"
		},
        {
			variable: "Heart Rate",
			value: "75"
		},
        {
			variable: "Glucose",
			value: "6.5 mmol/L"
		},
		
	];
	return (
		<>
			<div className="text-black text-xs font-bold leading-5 mt-8 mb-1 max-md:ml-1 max-md:mt-10">PREDICTIVE ANALYTICS</div>

                <table className="max-w-fit border-spacing-y-7 border-separate text-black">
                    
                    {(() => {
                        const rows = [];
                        for (let i = 0; i < pAnalytics.length; i += 2) {
                            const item1 = pAnalytics[i];
                            const item2 = i + 1 < pAnalytics.length ? pAnalytics[i + 1] : null;

                            rows.push(
                            <tr key={`${item1.variable}-${item2 ? item2.variable : ''}`}>
                        
                                <td className="border-l-[16px] border-transparent">
                                <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item1.variable}</div>
                                </td>

                                <td className="border-l-[5rem] border-transparent text-center">
                                <div className="text-black text-xs leading-5 ml-auto">{item1.value}</div>
                                </td>

                                {item2 && (
                                <td className="border-l-[5rem] border-transparent">
                                    <div className="text-black text-xs font-semibold leading-5 self-center my-auto">{item2.variable}</div>
                                </td>
                                )}

                                {item2 && (
                                <td className="border-l-[5rem] border-transparent text-center">
                                    <div className="text-black text-xs leading-5 ml-auto">{item2.value}</div>
                                </td>
                                )}
                            </tr>
                            );
                        }
                        return rows;
                    })()}
                </table>

                <div className="self-center flex aspect-[3.3333333333333335] flex-col justify-center items-stretch my-auto">
                    <button onClick={() => {window.location.href = "/health_records/about_patient"}} className="text-white text-xs font-semibold leading-5 whitespace-nowrap bg-sky-900 aspect-[3.3333333333333335] justify-center items-stretch px-5 py-1.5 rounded max-md:px-5">
                            Generate
                        </button>
                </div>
		</>
	);
}
