import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const LineChart = ({ data }) => {
  const formatDateLabels = (labels, datasets) => {
    const dataPoints = datasets.flatMap(dataset => dataset.data.map(dataPoint => dataPoint.x.toISOString().split('T')[0]));
    return labels.filter(dateString => dataPoints.includes(dateString));
  };

  const [tooltip, setTooltip] = useState(null);

  const handleClick = (event, activeElements) => {
    if (activeElements && activeElements.length > 0) {
      const firstPoint = activeElements[0];
      const datasetIndex = firstPoint.datasetIndex;
      const index = firstPoint.index;
      const dataset = data.datasets[datasetIndex];
      const dataPoint = dataset.data[index];
      const bpType = dataset.label; // Get the label of the dataset (systolic or diastolic)
      setTooltip({
        opacity: 1,
        dataPoints: [{ x: dataPoint.x, y: dataPoint.y, type: bpType }],
        x: event.native.clientX,
        y: event.native.clientY 
      });
    } else {
      setTooltip(null);
    }
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
        ticks: {
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Blood Pressure',
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false // Disable the default tooltip behavior
      }
    },
    onClick: handleClick,
  };

  const filteredLabels = formatDateLabels(data.labels, data.datasets);

  const modifiedDatasets = data.datasets.map(dataset => ({
    ...dataset,
    data: dataset.data.map(dataPoint => ({
      x: new Date(dataPoint.x),
      y: dataPoint.y,
    })),
    borderDash: [10, 5], // Customize the line design here
  }));

  return (
    <div className="rounded px-4 py-2 max-w-screen-lg mx-auto">
      <Line
        data={{
          labels: filteredLabels,
          datasets: modifiedDatasets,
        }}
        options={options}
        width={1600}
        height={400}
      />
      {tooltip && tooltip.opacity && 
        <div className="border border-gray-300 rounded px-4 py-2 max-w-screen-lg mx-auto text-xs font-semibold" style={{ position: 'absolute', top: tooltip.y, left: tooltip.x, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
          {tooltip.dataPoints.map((point, index) => (
            <div key={index}>
              <p>Type: {point.type}</p>
              <p>Date: {format(point.x, 'yyyy-MMM-dd')}</p>
              <p>{point.y} mm(Hg)</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default LineChart;
