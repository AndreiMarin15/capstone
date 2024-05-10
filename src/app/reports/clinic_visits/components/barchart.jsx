import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options = {
    indexAxis: "y", // Represent months along the x-axis
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Total Clinic Visits Over Time",
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const data = [150, 180, 200, 220, 210, 190, 175]; // Total clinic visits for each month

  const datasets = [
    {
      label: "Total Clinic Visits",
      data,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ];

  return (
    <div className="rounded px-4 py-2 max-w-screen-lg mx-auto">
      <Bar options={options} data={{ labels, datasets }} />
    </div>
  );
};

export default BarChart;
