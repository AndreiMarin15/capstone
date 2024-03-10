import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const LineChart = ({ data }) => {
  const formatDateLabels = (labels, datasets) => {
    const dataPoints = datasets[0].data.map(dataPoint => dataPoint.x);
    return labels.filter(dateString => dataPoints.includes(dateString))
                 .map(dateString => format(new Date(dateString), 'yyyy-MM-dd'));
  };
  

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'yyyy-MM-dd',
          },
          tooltipFormat: 'yyyy-MM-dd',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Systolic Pressure',
        },
      },
    },
  };
  return (
    <div className="border border-gray-300 rounded px-4 py-2 max-w-screen-lg mx-auto">
      <Line
          data={{
            labels: data.labels,
            datasets: data.datasets.map(dataset => ({
              ...dataset,
              data: dataset.data.map(dataPoint => ({
                x: new Date(dataPoint.x),
                y: dataPoint.y
              }))
            }))
          }}
          options={options}
          width={850}
          height={450}
        />
      <p className="text-center text-lg font-semibold mt-4">Line Chart</p>
    </div>
  );
};

export default LineChart;
