import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
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
    responsive: true,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Diagnosis",
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "No. of patients",
        },
      },
    },
  };

  const sample_data = [50, 70, 40, 55, 75, 55, 60];
  const sample_label = [
    ["Type", "2", "Diabetes"],
    ["Type", "1", "Diabetes", "Melitius"],
    ["Type", "2", "Diabetes", "Mellitus", "with", "Neuropathy"],
    ["Type", "2", "Diabetes", "with", "Heart", "Disease"],
    ["Type", "2", "Diabetes"],
    ["Type", "1", "Diabetes", "with", "Heart", "Disease"],
    ["Type", "2", "Diabetes", "with", "Liver", "Problems"],
  ];
  const dataInput = {
    labels: sample_label,
    datasets: [
      {
        label: "Diagnosis Data",
        data: sample_data,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="rounded px-4 py-2 max-w-screen-lg mx-auto">
      <Bar data={dataInput} options={options} />
    </div>
  );
};

export default BarChart;
