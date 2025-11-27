import { useEffect, useRef } from "react";
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
import { useInView } from "react-intersection-observer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const OrdersChart = () => {
  const chartRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const initialData = {
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
    datasets: [
      {
        label: "Orders",
        data: [0, 0, 0, 0, 0, 0, 0], // start from 0 for animation
        backgroundColor: "#F59E0B",
        borderRadius: 6,
      },
    ],
  };

  const finalData = {
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
    datasets: [
      {
        label: "Orders",
        data: [10, 22, 35, 28, 30, 50, 40], // actual values
        backgroundColor: "#F59E0B",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 1200, easing: "easeInOutQuart" },
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: { grid: { color: "#E5E7EB" }, ticks: { color: "#6B7280" } },
    },
  };

  useEffect(() => {
    if (inView && chartRef.current) {
      chartRef.current.data.datasets[0].data = finalData.datasets[0].data;
      chartRef.current.update(); // triggers animation
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4">Today's Orders by Time</h3>
      <Bar ref={chartRef} data={initialData} options={options} />
    </div>
  );
};
