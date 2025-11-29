import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useInView } from "react-intersection-observer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const OrdersChart = () => {
  const chartRef = useRef(null);
  const { ref, inView } = useInView({ threshold: 0.3 });

  const [initialData, setInitialData] = useState({
    labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
    datasets: [
      {
        label: "Orders",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "#F59E0B",
        borderRadius: 6,
      },
    ],
  });

  const [finalData, setFinalData] = useState(initialData);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/dashboard/orders-by-hour"
      );
      setFinalData({
        labels: res.data.labels,
        datasets: [{ ...initialData.datasets[0], data: res.data.data }],
      });
    } catch (err) {
      console.error("Failed to fetch orders by hour:", err);
    }
  };

  useEffect(() => {
    fetchOrders(); // initial fetch
    const interval = setInterval(fetchOrders, 15000); // every 15 seconds
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
      <h3 className="font-semibold mb-4">Today's Orders by Time</h3>
      <Bar
        ref={chartRef}
        data={initialData}
        options={{
          responsive: true,
          animation: { duration: 1200, easing: "easeInOutQuart" },
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
