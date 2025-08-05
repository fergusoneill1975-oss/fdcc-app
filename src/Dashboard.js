
import { useNavigate } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, CartesianGrid
} from "recharts";

const transactions = [
  { name: "9AM", volume: 320, target: 400 },
  { name: "10AM", volume: 480, target: 400 },
  { name: "11AM", volume: 300, target: 400 },
  { name: "12PM", volume: 410, target: 400 },
  { name: "1PM", volume: 370, target: 400 },
];

const income = [
  { name: "9AM", income: 2300, expected: 3000 },
  { name: "10AM", income: 2800, expected: 3000 },
  { name: "11AM", income: 2400, expected: 3000 },
  { name: "12PM", income: 3100, expected: 3000 },
  { name: "1PM", income: 2600, expected: 3000 },
];

const heatmapData = [
  { state: "CA", value: 80 },
  { state: "TX", value: 65 },
  { state: "NY", value: 50 },
  { state: "FL", value: 40 },
  { state: "IL", value: 30 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-8 font-sans">
      <h1 className="text-4xl font-semibold mb-10 text-center">FDCC Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
        {["Flexible Margins", "Merchant Details", "Insights", "Messaging", "Core Margin"].map((label, i) => (
          <button
            key={i}
            onClick={() => navigate(`/${label.toLowerCase().replace(/\s/g, "-")}`)}
            className="bg-white/10 backdrop-blur-md hover:bg-white/20 transition text-white font-medium py-3 px-4 rounded-xl shadow-md border border-white/10"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-md shadow-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-white">Live Transactions</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactions}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="volume" stroke="#FF3B30" strokeWidth={2} />
              <Line type="monotone" dataKey="target" stroke="#999" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-md shadow-xl border border-white/10">
          <h2 className="text-lg font-semibold mb-4 text-white">Live Income</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={income}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="income" fill="#FF3B30" />
              <Bar dataKey="expected" fill="#666" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl p-6 bg-white/5 backdrop-blur-md shadow-xl border border-white/10">
        <h2 className="text-lg font-semibold mb-6 text-white">US Performance Heatmap</h2>
        <div className="flex justify-around items-end">
          {heatmapData.map((region, i) => (
            <div key={i} className="text-center">
              <div
                className="w-10 rounded-t-md bg-gradient-to-t from-red-800 to-red-500 mx-auto"
                style={{ height: region.value, opacity: 0.9 }}
              ></div>
              <p className="mt-2 text-sm text-white/70">{region.state}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
