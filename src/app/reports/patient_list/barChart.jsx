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
    indexAxis: "y",
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
        text: "Diagnosis Data",
      },
    },
  };

  const labels = [
    "Type 1 Diabetes",
    "Type 2 Diabetes",
    "Diabetes Mellitus with Neuropathy",
    "Diabetes with Heart Disease",
    "Diabetes",
    "Diabetes with Heart Disease",
    "Diabetes with Liver Problems",
  ];
  const data = [50, 70, 40, 55, 75, 55, 60];

  const datasets = [
    {
      label: "Diagnosis Data",
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
