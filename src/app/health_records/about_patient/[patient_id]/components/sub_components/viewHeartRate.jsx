import React from "react";
import LineChart from "./lineChart";
import BackButton from "./BackButton";
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement } from "chart.js";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";
import Image from "next/image";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement);

export default function ViewHeartRate({ currentPage, setCurrentPage }) {
	// Sample data
	const sampleData = [
		{ date: "2024-03-01", heartRate: 70 },
		{ date: "2024-03-03", heartRate: 72 },
		{ date: "2024-03-04", heartRate: 75 },
		{ date: "2024-03-06", heartRate: 78 },
		{ date: "2024-03-08", heartRate: 80 },
		{ date: "2024-03-10", heartRate: 82 },
		{ date: "2024-03-12", heartRate: 85 },
		{ date: "2024-03-14", heartRate: 88 },
		{ date: "2024-03-16", heartRate: 90 },
		{ date: "2024-03-18", heartRate: 92 },
		{ date: "2024-03-20", heartRate: 95 },
		{ date: "2024-03-22", heartRate: 97 },
		{ date: "2024-03-24", heartRate: 100 },
		{ date: "2024-03-26", heartRate: 105 },
		{ date: "2024-03-28", heartRate: 110 },
		{ date: "2024-03-30", heartRate: 115 },
		// Add more sample data as needed
	];

	const heartRateTooltipContent = (tooltip) => (
		<div
			className="border border-gray-300 rounded px-4 py-2 max-w-screen-lg mx-auto text-xs font-semibold"
			style={{ position: "absolute", top: tooltip.y, left: tooltip.x, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
		>
			{tooltip.dataPoints.map((point, index) => (
				<div key={index}>
					<p>Date: {format(point.x, "yyyy-MMM-dd")}</p>
					<p>Heart Rate: {point.y}</p>
				</div>
			))}
		</div>
	);

	const labels = [];
	const heartRateData = [];

	const data = {
		labels: labels.map((dateString) => new Date(dateString)),
		datasets: [
			{
				label: "Heart Rate",
				data: sampleData.map(({ date, heartRate }) => ({ x: new Date(date), y: heartRate })),
				borderColor: "#FF5733",
				borderWidth: 3,
				pointRadius: 6,
				fill: false,
			},
		],
	};

	const formatDateCommon = (date) => format(date, "yyyy-MM-dd");

	const tableData = sampleData.map(({ date, heartRate }) => ({
		date,
		heartRate,
	}));

	return (
		<>
			<div className="max-w-fit text-black">
				<div className="flex justify-between">
					<div className="flex items-center">
						<Image
							height={0}
							width={0}
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&"
							alt="icon"
							className="w-5 mr-2 mt-6"
						/>
						<div className="text-black text-xl font-bold leading-5 mt-8 mb-1 mr-96 max-md:ml-1 max-md:mt-10">
							Heart Rate
						</div>
					</div>
				</div>
				<a
					href="/path/to/pdf"
					download="full_vitals_history.pdf"
					className="text-blue-500 text-xs block mb-2 flex items-center"
				>
					<Image
						height={0}
						width={0}
						src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&"
						alt="icon"
						className="w-4 mr-2"
					/>
					<span>Full Heart Rate History (.pdf)</span>
				</a>

				<div className="flex items-center mr-40 mt-5">
					<LineChart data={data} labels={labels} tooltipContent={heartRateTooltipContent} />
				</div>
			</div>
			<div className="max-w mt-8" style={{ width: "1000px", maxHeight: "200px", overflowY: "auto" }}>
				<div className="overflow-auto">
					<table className="min-w-full ">
						<thead>
							<tr>
								<th className="px-4 py-2 ">Date</th>
								<th className="px-4 py-2 ">Heart Rate</th>
							</tr>
						</thead>
						<tbody>
							{tableData.map(({ date, heartRate }) => (
								<tr key={date}>
									<td className="border border-transparent px-4 py-2 text-center">
										{formatDateCommon(new Date(date))}
									</td>
									<td className="border border-transparent px-4 py-2 text-center">{heartRate}</td>
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