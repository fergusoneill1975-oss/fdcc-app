import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const merchants = [
  "AlphaPay", "GlobalMart", "PaySphere", "QuickServe", "FinEdge",
  "Transactly", "Cashwave", "NeoCommerce", "EuroLink", "SmartFunds",
  "TradeNova", "NovaPay", "BuyNet", "FlexiPay", "MerchantX"
];

export default function FlexibleMargins() {
  const [searchParams] = useSearchParams();
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [coreMargin] = useState(4.25);
  const [bands, setBands] = useState([]);
  const [confirmEnabled, setConfirmEnabled] = useState(false);
  const [mode, setMode] = useState("time"); // Can be "time", "value", or "currency"

  const recommendedMerchant = searchParams.get("merchant");
  const recommendedStart = searchParams.get("start");
  const recommendedEnd = searchParams.get("end");
  const recommendedChange = searchParams.get("change");

  useEffect(() => {
    if (recommendedMerchant && recommendedStart && recommendedEnd && recommendedChange) {
      setSelectedMerchant(recommendedMerchant);
      setBands([
        {
          start: recommendedStart,
          end: recommendedEnd,
          change: parseFloat(recommendedChange),
        },
      ]);
      setConfirmEnabled(true);
    }
  }, [recommendedMerchant, recommendedStart, recommendedEnd, recommendedChange]);

  const handleChange = (index, value) => {
    const updated = [...bands];
    updated[index].change = parseFloat(value) || 0;
    setBands(updated);
    setConfirmEnabled(true);
  };

  const handleMerchantSelect = (e) => {
    setSelectedMerchant(e.target.value);
    setBands([]);
    setConfirmEnabled(false);
  };

  const handleAddBand = () => {
    setBands([
      ...bands,
      { start: "", end: "", change: 0 }
    ]);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Flexible Margins</h1>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Select Merchant</label>
        <select
          className="p-2 border rounded w-64"
          value={selectedMerchant}
          onChange={handleMerchantSelect}
        >
          <option value="">-- Choose --</option>
          {merchants.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      {selectedMerchant && (
        <div className="mt-4">
          <div className="text-sm text-gray-600 mb-2">Core Margin: <strong>{coreMargin.toFixed(2)}%</strong></div>

          <div className="mb-4">
            <button
              className={`mr-2 px-4 py-2 rounded ${mode === "time" ? "bg-red-600 text-white" : "bg-gray-200"}`}
              onClick={() => setMode("time")}
            >
              Time of Day
            </button>
            <button
              className={`mr-2 px-4 py-2 rounded ${mode === "value" ? "bg-red-600 text-white" : "bg-gray-200"}`}
              onClick={() => setMode("value")}
            >
              Transaction Value
            </button>
            <button
              className={`px-4 py-2 rounded ${mode === "currency" ? "bg-red-600 text-white" : "bg-gray-200"}`}
              onClick={() => setMode("currency")}
            >
              Currency
            </button>
          </div>

          <table className="w-full border mt-4">
            <thead className="bg-gray-200 text-sm">
              <tr>
                <th className="border px-3 py-2">Band</th>
                <th className="border px-3 py-2">Change</th>
                <th className="border px-3 py-2">New Margin</th>
                <th className="border px-3 py-2">Income Impact</th>
              </tr>
            </thead>
            <tbody>
              {bands.map((band, index) => (
                <tr key={index} className="text-sm">
                  <td className="border px-3 py-2">
                    {mode === "time" && `${band.start}:00–${band.end}:00`}
                    {mode === "value" && "€ band"}
                    {mode === "currency" && "Currency band"}
                  </td>
                  <td className="border px-3 py-2">
                    <input
                      type="number"
                      step="0.01"
                      className="w-20 p-1 border rounded"
                      value={band.change}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />%
                  </td>
                  <td className="border px-3 py-2">
                    {(coreMargin + band.change).toFixed(2)}%
                  </td>
                  <td className="border px-3 py-2">
                    €{(band.change / 0.01 * 100).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={handleAddBand}
              className="text-sm bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
            >
              + Add Band
            </button>
          </div>

          <div className="mt-6">
            <button
              disabled={!confirmEnabled}
              onClick={() => alert("Flexible margin configuration confirmed.")}
              className={`px-6 py-2 rounded text-white transition ${
                confirmEnabled
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
