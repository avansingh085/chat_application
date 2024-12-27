import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const ServerGraph = ({ serverName }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString();
      const randomRequests = Math.floor(Math.random() * 100000);

      setDataPoints((prev) => [...prev.slice(-19), randomRequests]);
      setLabels((prev) => [...prev.slice(-19), currentTime]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: `Requests per second for ${serverName}`,
        data: dataPoints,
        fill: false,
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-bold mb-4">Requests vs Time</h2>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default ServerGraph;
