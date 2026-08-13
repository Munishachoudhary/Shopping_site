import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);
function RevenueChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Revenue",
        data: data.map((item) => item.revenue),
        backgroundColor: "#0d6efd",
      },
    ],
  };

  return <Bar data={chartData} />;
}
export default RevenueChart;