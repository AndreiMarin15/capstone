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
    { date: '2024-03-01', systolic: 140, diastolic: 85 },
    { date: '2024-03-03', systolic: 115, diastolic: 80 },
    { date: '2024-03-04', systolic: 122, diastolic: 75 },
    { date: '2024-03-06', systolic: 118, diastolic: 72 },
    { date: '2024-03-08', systolic: 125, diastolic: 77 }, 
    { date: '2024-03-10', systolic: 130, diastolic: 80 }, 
    { date: '2024-03-12', systolic: 135, diastolic: 74 }, 
    { date: '2024-03-14', systolic: 128, diastolic: 76 }, 
    { date: '2024-03-16', systolic: 132, diastolic: 79 },
    { date: '2024-03-18', systolic: 127, diastolic: 78 },
    { date: '2024-03-20', systolic: 123, diastolic: 73 },
    { date: '2024-03-22', systolic: 119, diastolic: 71 },
    { date: '2024-03-24', systolic: 101, diastolic: 62 },
    { date: '2024-03-26', systolic: 105, diastolic: 65 },
    { date: '2024-03-28', systolic: 110, diastolic: 67 },
    { date: '2024-03-30', systolic: 120, diastolic: 70 },
    // Add more sample data as needed
  ];

  const labels = [];
  const systolicPressureData = [];

  const data = {
    labels: labels.map(dateString => new Date(dateString)),
    datasets: [
      {
        label: 'Systolic Blood Pressure',
        data: sampleData.map(({ date, systolic }) => ({ x: new Date(date), y: systolic })),
        borderColor: '#2AB651',
        borderWidth: 3,
        pointRadius: 6,
        fill: false,
      },
      {
        label: 'Diastolic Blood Pressure',
        data: sampleData.map(({ date, diastolic }) => ({ x: new Date(date), y: diastolic })),
        borderColor: '#4B0082',
        borderWidth: 3,
        pointRadius: 6,
        fill: false,
      },
    ],
  };

  // Function to format date in a common format
  const formatDateCommon = date => format(date, 'yyyy-MM-dd');

  // Table data
  const tableData = sampleData.map(({ date, systolic, diastolic }) => ({
    date,
    systolic,
    diastolic,
    commonFormat: `${systolic}/${diastolic} mm(Hg)`,
  }));

  return (
    <>
      <div className="max-w-fit text-black">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0d5b3fd16181b4dc9f9076e56dab03643403ad4fe1376a451f5d70c8bc0fcd95?apiKey=66e07193974a40e683930e95115a1cfd&" alt="icon" className="w-5 mr-2 mt-6" />
            <div className="text-black text-xl font-bold leading-5 mt-8 mb-1 mr-96 max-md:ml-1 max-md:mt-10">
              Systolic Blood Pressure
            </div>
          </div>
        </div>
        <a href="/path/to/pdf" download="full_vitals_history.pdf" className="text-blue-500 text-xs block mb-2 flex items-center">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f1514e9c761b45ed8abcb6811a56eaaf480fdda4754ab1d1e1240f3cb88e4a2?apiKey=7e8c8e70f3bd479289a042d9c544736c&" alt="icon" className="w-4 mr-2" />
          <span>Full Blood Pressure History (.pdf)</span>
        </a>

        <div className="flex items-center mr-40 mt-5">
          <LineChart data={data} labels={labels} />
        </div>
      </div>
      <div className="max-w mt-8" style={{ width: '1000px', maxHeight: '200px', overflowY: 'auto' }}>
        <div className="overflow-auto">
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2 ">Date</th>
                <th className="px-4 py-2 ">Systolic</th>
                <th className="px-4 py-2 ">Diastolic</th>
                <th className="px-4 py-2 ">Common Format</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map(({ date, systolic, diastolic, commonFormat }) => (
                <tr key={date}>
                  <td className="border border-transparent px-4 py-2 text-center">{formatDateCommon(new Date(date))}</td>
                  <td className="border border-transparent px-4 py-2 text-center">{systolic}</td>
                  <td className="border border-transparent px-4 py-2 text-center">{diastolic}</td>
                  <td className="border border-transparent px-4 py-2 text-center">{commonFormat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
