import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: [
    "Age Group 0-10",
    " Age Group 11-25",
    "Age Group 26-40",
    "Age Group 41-60",
    "Age Group 61-90",
  ],
  datasets: [
    {
      label: "# of Votes",
      data: [0 - 10, 11 - 25, 26 - 40, 41 - 60, 61 - 90],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(100, 170, 200, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(100, 170, 200, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function PieChart() {
  return (
    <div className="rounded px-4 py-2 mx-auto relative h-[30vh]">
      <Pie data={data} />
    </div>
  );
}
