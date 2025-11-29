import { useEffect, useRef, useState } from "react";
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
import axios from "axios";

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

  const [initialData, setInitialData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Sales",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#F59E0B",
        backgroundColor: "rgba(245,158,11,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#F59E0B",
      },
    ],
  });

  const [finalData, setFinalData] = useState(initialData);

  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:5000/dashboard/sales-weekly");
      setFinalData({
        labels: res.data.labels,
        datasets: [{ ...initialData.datasets[0], data: res.data.data }],
      });
    } catch (err) {
      console.error("Failed to fetch weekly sales:", err);
    }
  };

  useEffect(() => {
    fetchSales(); // initial fetch
    const interval = setInterval(fetchSales, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inView && chartRef.current) {
      chartRef.current.data = finalData;
      chartRef.current.update();
    }
  }, [inView, finalData]);

  return (
    <div ref={ref} className="bg-white rounded-xl shadow p-6">
      <h3 className="font-semibold mb-4">Weekly Sales</h3>
      <Line
        ref={chartRef}
        data={initialData}
        options={{
          responsive: true,
          animation: { duration: 1500, easing: "easeInOutQuart" },
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: "#6B7280" } },
            y: { grid: { color: "#E5E7EB" }, ticks: { color: "#6B7280" } },
          },
        }}
      />
    </div>
  );
};
