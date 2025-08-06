import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Recommendations from "./Recommendations";

export default function InsightsPage() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    country: "",
    day: "",
    cardCurrency: "",
    merchant: "",
  });
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    Papa.parse("/fdcc_transactions_updated.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const clean = results.data.filter((row) => row["Country"]);
        setData(clean);
        setFilteredData(clean);
      },
    });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...filters, [name]: value };
    setFilters(updated);
    applyFilters(data, updated);
  };

  const applyFilters = (allData, f) => {
    const filtered = allData.filter((row) => {
      return (
        (!f.country || row.Country === f.country) &&
        (!f.day || row.Day === f.day) &&
        (!f.cardCurrency || row["Card Currency"] === f.cardCurrency) &&
        (!f.merchant || row.Merchant === f.merchant)
      );
    });
    setFilteredData(filtered);
  };

  const chartDataBy = (key, valueKey) => {
    const grouped = {};
    filteredData.forEach((row) => {
      const k = row[key];
      const v = parseFloat(row[valueKey]) || 0;
      if (!grouped[k]) grouped[k] = 0;
      grouped[k] += v;
    });
    return Object.entries(grouped).map(([k, v]) => ({
      [key]: k,
      [valueKey]: v,
    }));
  };

  const countries = [...new Set(data.map((d) => d.Country))];
  const days = [...new Set(data.map((d) => d.Day))];
  const currencies = [...new Set(data.map((d) => d["Card Currency"]))];
  const merchants = [...new Set(data.map((d) => d.Merchant))];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Insights</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <select name="country" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Countries</option>
          {countries.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select name="day" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Days</option>
          {days.map((d) => <option key={d}>{d}</option>)}
        </select>

        <select name="cardCurrency" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Card Currencies</option>
          {currencies.map((c) => <option key={c}>{c}</option>)}
        </select>

        <select name="merchant" onChange={handleFilterChange} className="p-2 border rounded">
          <option value="">All Merchants</option>
          {merchants.map((m) => <option key={m}>{m}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-xl font-semibold mb-2">Transaction Volume by Day</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataBy("Day", "Payment Amount")}>
              <XAxis dataKey="Day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Payment Amount" fill="#dc2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Margin Income A by Country</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataBy("Country", "Margin Income A")}>
              <XAxis dataKey="Country" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Margin Income A" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Volume by Card Currency</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataBy("Card Currency", "Payment Amount")}>
              <XAxis dataKey="Card Currency" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Payment Amount" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Top Merchants by Margin A</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartDataBy("Merchant", "Margin Income A")}>
              <XAxis dataKey="Merchant" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Margin Income A" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Generate Insights Button */}
      <div className="text-center">
        <button
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => setShowInsights(true)}
        >
          Generate Insights
        </button>
      </div>

      {/* Insights Output */}
      {showInsights && (
        <div className="mt-6 p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
          <h3 className="text-lg font-bold mb-3">Recommended Margin Adjustments</h3>
          <ul className="list-disc list-inside text-sm space-y-2">
            <li>📌 Increase margin by <strong>+0.25%</strong> for <strong>PaySphere</strong> between <strong>17:00–20:00</strong>.</li>
            <li>📌 Add <strong>+0.15%</strong> margin for <strong>USD cardholders</strong> shopping in <strong>Germany</strong>.</li>
            <li>📌 Target <strong>GBP cards in Spain</strong> with <strong>+0.15%</strong> margin increase.</li>
            <li>📌 Consider raising margin for <strong>NeoCommerce</strong> due to consistently high-value transactions.</li>
          </ul>
        </div>
      )}

      {/* Intelligent Apply Section */}
      <Recommendations />
    </div>
  );
}
