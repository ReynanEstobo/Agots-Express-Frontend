import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useInView } from "react-intersection-observer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const SalesChart = () => {
  const chartRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const initialData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [0, 0, 0, 0, 0, 0, 0], // start from 0 for animation
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#F59E0B",
      },
    ],
  };

  const finalData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [4000, 3800, 5000, 4800, 6500, 8000, 7000],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#F59E0B",
      },
    ],
  };

  const options = {
    responsive: true,
    animation: { duration: 1500, easing: "easeInOutQuart" },
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#6B7280" } },
      y: { grid: { color: "#E5E7EB" }, ticks: { color: "#6B7280" } },
    },
  };

  useEffect(() => {
    if (inView && chartRef.current) {
      // update dataset to trigger animation
      chartRef.current.data.datasets[0].data = finalData.datasets[0].data;
      chartRef.current.update(); // animate
    }
  }, [inView]);

  return (
    <div ref={ref} className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4">Weekly Sales</h3>
      <Line ref={chartRef} data={initialData} options={options} />
    </div>
  );
};
