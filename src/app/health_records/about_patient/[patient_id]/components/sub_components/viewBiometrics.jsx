import React, { useState, useEffect } from "react";
import LineChart from "./lineChart";
import BackButton from "./BackButton";
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement } from "chart.js";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement);

export default function ViewBiometrics({ currentPage, setCurrentPage, defaultMetric, chartValues }) {

	const [selectedMetric, setSelectedMetric] = useState(defaultMetric);
	const [data, setData] = useState(null); // Initialize data state

	useEffect(() => {
		setSelectedMetric(defaultMetric); // Update selectedMetric if defaultMetric prop changes
	}, [defaultMetric]);

	useEffect(() => {
		// Ensure selectedMetric is defined before accessing sampleData[selectedMetric]
		if (selectedMetric) {
			setData({
				labels: sampleData[selectedMetric]?.map(({ date }) => new Date(date)),
				datasets: [
					{
						label: selectedMetric === "bmi" ? "BMI" : selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
						data: sampleData[selectedMetric]?.map(({ date, value }) => ({
							x: new Date(date),
							y: value,
						})),
						borderColor: "#0000FF",
						borderWidth: 3,
						pointRadius: 6,
						fill: false,
					},
				],
			});
		}
	}, [selectedMetric]);

	const tooltipContent = (tooltip) => (
		<div
			className="border border-gray-300 rounded px-4 py-2 max-w-screen-lg mx-auto text-xs font-semibold"
			style={{
				position: "absolute",
				top: tooltip.y,
				left: tooltip.x,
				backgroundColor: "rgba(255, 255, 255, 0.8)",
			}}
		>
			{tooltip.dataPoints?.map((point, index) => (
				<div key={index}>
					<p>Date: {format(point.x, "yyyy-MMM-dd")}</p>
					<p>
						{selectedMetric === "bmi"
							? "BMI"
							: selectedMetric === "height"
								? "Height"
								: selectedMetric === "weight"
									? "Weight"
									: ""}
						: {point.y}
						{selectedMetric === "height" ? " cm" : selectedMetric === "weight" ? " kg" : ""}
					</p>
				</div>
			))}
		</div>
	);

	const formatDate = (date) => format(date, "yyyy-MM-dd");

	return (
		<>
			<div className="max-w-fit text-black">
				<div className="flex justify-between">
					<div className="flex items-center">
						<div className="text-black text-xl font-bold leading-5 mt-8 mb-1 mr-96 max-md:ml-1 max-md:mt-10">
							{selectedMetric === "bmi"
								? "BMI"
								: selectedMetric
									? selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)
									: ""}
						</div>
					</div>
				</div>

				<div className="flex items-center mr-40 mt-5">
					<div className="flex mb-5">
						<div className="custom-select">
							<div className="options-container">
								<div
									className={`option ${selectedMetric === "height" ? "selected" : ""}`}
									style={selectedMetric === "height" ? { border: "2px solid #006B55" } : null}
									onClick={() => setSelectedMetric("height")}
								>
									Height
								</div>
								<div
									className={`option ${selectedMetric === "weight" ? "selected" : ""}`}
									style={selectedMetric === "weight" ? { border: "2px solid #006B55" } : null}
									onClick={() => setSelectedMetric("weight")}
								>
									Weight
								</div>
								<div
									className={`option ${selectedMetric === "bmi" ? "selected" : ""}`}
									style={selectedMetric === "bmi" ? { border: "2px solid #006B55" } : null}
									onClick={() => setSelectedMetric("bmi")}
								>
									BMI
								</div>
							</div>
						</div>
					</div>
					{data && <LineChart data={data} tooltipContent={tooltipContent} />}
				</div>
			</div>

			<div className="max-w mt-8" style={{ width: "1000px", maxHeight: "200px", overflowY: "auto" }}>
				<div className="overflow-auto">
					<table className="min-w-full">
						<thead>
							<tr>
								<th className="px-4 py-2">Date</th>
								<th className="px-4 py-2">
									{selectedMetric === "bmi"
										? "BMI"
										: selectedMetric
											? selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)
											: ""}
								</th>
							</tr>
						</thead>
						<tbody>
							{sampleData[selectedMetric]?.map(({ date, value }) => (
								<tr key={date}>
									<td className="border border-transparent px-4 py-2 text-center">{formatDate(new Date(date))}</td>
									<td className="border border-transparent px-4 py-2 text-center">{value}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<BackButton currentPage={currentPage} setCurrentPage={setCurrentPage} />
		</>
	);
}
