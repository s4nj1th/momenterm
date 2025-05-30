import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function PortfolioCard() {
  const portfolioValue = 135000; // sample value
  const gain = 4.6; // %

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Value",
      data: [120000, 125000, 126000, 130000, 135000],
      borderColor: "#DB67E6",
      fill: false,
    }],
  };

  return (
    <div className="bg-[var(--secondary-bg)] p-4 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-2">📈 Portfolio Snapshot</h2>
      <p className="text-lg">Total Value: ₹{portfolioValue.toLocaleString()} <span className="text-green-500">(+{gain}%)</span></p>

      <div className="mt-4 h-48">
        
      </div>
    </div>
  );
}
