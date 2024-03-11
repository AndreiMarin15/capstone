import React from 'react';
import LineChart from './linechart';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement
} from 'chart.js';
import { format } from 'date-fns';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement);
export default function ViewSystolic({ currentPage, setCurrentPage }) {
  // Sample data
  const sampleData = [
    { date: '2024-02-01', value: 140 },
    { date: '2024-02-04', value: 115 },
    { date: '2024-03-02', value: 122 },
    { date: '2024-03-04', value: 118 },
    // Add more sample data as needednpm install date-fns
  ];

  const labels = [];
  const systolicPressureData = [];

  const data = {
    labels: labels.map(dateString => new Date(dateString)),
    datasets: [
      {
        label: 'Systolic Blood Pressure',
        data: sampleData.map(({ date, value }) => ({ x: new Date(date), y: value })),
        borderColor: '#2AB651',
        borderWidth: 3,
        pointRadius: 5,
        fill: false,
      },
    ],
  };

  return (
    <>
<div class="max-w-fit text-black">
    <div class="flex justify-between">
        <div class="flex items-center">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&" alt="icon" class="w-5 mr-2 mt-6" />
            <div class="text-black text-xl font-bold leading-5 mt-8 mb-1 mr-96 max-md:ml-1 max-md:mt-10">
                Systolic Blood Pressure
            </div>
        </div>
    </div>
    <a href="/path/to/pdf" download="full_vitals_history.pdf" class="text-blue-500 text-xs block mb-2 flex items-center">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&" alt="icon" class="w-4 mr-2" />
        <span>Full Blood Pressure History (.pdf)</span>
    </a>

        <div class="flex items-center mr-40 mt-5">
          <LineChart data={data} labels={labels} />
        </div>
  </div>
    </>
  );
}

