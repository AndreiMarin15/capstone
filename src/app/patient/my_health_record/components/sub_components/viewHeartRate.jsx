import React, { useEffect, useState } from "react";
import LineChart from "./lineChart";
import BackButton from "./BackButton";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";
import { getHeartRate } from "@/backend//patient/vitalsAndBiometrics/vitalsAndBiometrics";
import Image from "next/image";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement);

export default function ViewHeartRate({
  currentPage,
  setCurrentPage,
  patientId,
  chartValues,
  renderingOptions,
}) {
  const heartRateTooltipContent = (tooltip) => (
    <div
      className="border border-gray-300 rounded px-4 py-2 max-w-screen-lg mx-auto text-sm font-semibold"
      style={{
        position: "absolute",
        top: tooltip.y,
        left: tooltip.x,
        backgroundColor: "rgba(255, 255, 255, 0.8)",
      }}
    >
      {tooltip.dataPoints?.map((point, index) => (
        <div key={index}>
          <p>Date: {format(point.x, "yyyy-MMM-dd")}</p>
          <p>Heart Rate: {point.y}</p>
        </div>
      ))}
    </div>
  );

  const labels = [];

  const heartRateData = chartValues.heartRate
    .slice(-renderingOptions)
    .map(({ value, date }) => ({
      x: new Date(date),
      y: value,
    }));

  const data = {
    labels: labels?.map((dateString) => new Date(dateString)),
    datasets: [
      {
        label: "Heart Rate",
        data: heartRateData,
        borderColor: "#FF5733",
        borderWidth: 3,
        pointRadius: 6,
        fill: false,
      },
    ],
  };

  const formatDateCommon = (date) => format(date, "yyyy-MM-dd");

  const tableData = chartValues.heartRate
    .slice(-renderingOptions)
    .map(({ date, value }) => ({
      date,
      heartrate: value,
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
          className="text-blue-500 text-sm block mb-2 flex items-center"
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
          <LineChart
            data={data}
            labels={labels}
            tooltipContent={heartRateTooltipContent}
          />
        </div>
      </div>
      <div
        className="max-w mt-8"
        style={{ width: "1000px", maxHeight: "200px", overflowY: "auto" }}
      >
        <div className="overflow-auto">
          <table className="min-w-full ">
            <thead>
              <tr>
                <th className="px-4 py-2 ">Date</th>
                <th className="px-4 py-2 ">Heart Rate</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.reverse()?.map(({ date, heartrate }) => (
                <tr key={date}>
                  <td className="border border-transparent px-4 py-2 text-center">
                    {formatDateCommon(new Date(date))}
                  </td>
                  <td className="border border-transparent px-4 py-2 text-center">
                    {heartrate}
                  </td>
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
