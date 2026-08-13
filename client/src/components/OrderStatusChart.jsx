import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function OrderStatusChart({ stats = {} }) {
  const data = {
    labels: [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ],
    datasets: [
      {
        data: [
          stats.pending || 0,
          stats.processing || 0,
          stats.shipped || 0,
          stats.delivered || 0,
          stats.cancelled || 0,
        ],
      },
    ],
  };

  return <Pie data={data} />;
}

export default OrderStatusChart;