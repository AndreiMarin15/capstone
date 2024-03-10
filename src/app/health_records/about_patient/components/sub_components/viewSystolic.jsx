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

  console.log("Data object:", data);

  return <LineChart data={data} labels={labels} />;
  
}
