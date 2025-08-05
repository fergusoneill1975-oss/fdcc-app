
import { useState } from "react";

const fakeMerchants = [
  "Acme Inc.", "BluePay", "CloudMart", "DigiBooks", "EasyCharge",
  "FinX", "GlobePay", "HyperRetail", "InstaPay", "JetPOS",
  "KoalaPay", "LumenPay", "MetroPOS", "NeoMerch", "OmegaPay"
];

const parameterOptions = ["Time of Day", "Transaction Value", "Currency"];
const currencyOptions = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "NZD", "SEK", "SGD"];
const CORE_MARGIN = 4.25;

export default function FlexibleMargins() {
  const [merchant, setMerchant] = useState("");
  const [parameter, setParameter] = useState("");
  const [bands, setBands] = useState(Array(5).fill({ label: "", margin: "" }));
  const [confirmEnabled, setConfirmEnabled] = useState(false);

  const handleBandChange = (index, field, value) => {
    const updated = [...bands];
    updated[index] = { ...updated[index], [field]: value };
    setBands(updated);
    setConfirmEnabled(true);
  };

  const getNewMargin = (margin) => {
    const delta = parseFloat(margin || "0");
    return (CORE_MARGIN + delta).toFixed(2);
  };

  const getIncomeImpact = (margin) => {
    const delta = parseFloat(margin || "0");
    return "€" + (delta * 10000).toFixed(0);
  };

  const renderBandInput = (band, index) => {
    switch (parameter) {
      case "Time of Day":
        return (
          <>
            <input
              type="number"
              min="0"
              max="23"
              placeholder="Start hour"
              value={band.start || ""}
              onChange={(e) => handleBandChange(index, "start", e.target.value)}
              className="w-24 border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              min="1"
              max="24"
              placeholder="End hour"
              value={band.end || ""}
              onChange={(e) => handleBandChange(index, "end", e.target.value)}
              className="w-24 border rounded px-2 py-1"
            />
          </>
        );
      case "Transaction Value":
        return (
          <>
            <input
              type="number"
              placeholder="Min €"
              value={band.min || ""}
              onChange={(e) => handleBandChange(index, "min", e.target.value)}
              className="w-24 border rounded px-2 py-1 mr-2"
            />
            <input
              type="number"
              placeholder="Max €"
              value={band.max || ""}
              onChange={(e) => handleBandChange(index, "max", e.target.value)}
              className="w-24 border rounded px-2 py-1"
            />
          </>
        );
      case "Currency":
        return (
          <select
            value={band.currency || ""}
            onChange={(e) => handleBandChange(index, "currency", e.target.value)}
            className="w-48 border rounded px-2 py-1"
          >
            <option value="">-- Select --</option>
            {currencyOptions.map((cur) => (
              <option key={cur} value={cur}>
                {cur}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Flexible Margins</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Select Merchant</label>
        <select
          value={merchant}
          onChange={(e) => {
            setMerchant(e.target.value);
            setParameter("");
            setBands(Array(5).fill({ label: "", margin: "" }));
            setConfirmEnabled(false);
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Choose a Merchant --</option>
          {fakeMerchants.map((name, i) => (
            <option key={i} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {merchant && (
        <>
          <div className="bg-white border rounded shadow px-4 py-3 mb-6 w-fit">
            <strong>Core Margin:</strong> {CORE_MARGIN.toFixed(2)}%
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">Select Parameter</label>
            <select
              value={parameter}
              onChange={(e) => {
                setParameter(e.target.value);
                setBands(Array(5).fill({ label: "", margin: "" }));
                setConfirmEnabled(false);
              }}
              className="w-full max-w-md p-2 border border-gray-300 rounded-md"
            >
              <option value="">-- Choose Parameter --</option>
              {parameterOptions.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {parameter && (
            <div className="bg-white p-6 rounded-xl shadow max-w-5xl mb-6">
              <h2 className="text-lg font-semibold mb-4">
                Define Flexible Margin Bands
              </h2>

              <table className="w-full table-auto border-collapse mb-4 text-center">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Band</th>
                    <th className="border px-4 py-2">Margin Flexibility (%)</th>
                    <th className="border px-4 py-2">New Margin</th>
                    <th className="border px-4 py-2">Income Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map((band, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{renderBandInput(band, index)}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="number"
                          step="0.01"
                          value={band.margin}
                          onChange={(e) => handleBandChange(index, "margin", e.target.value)}
                          className="w-24 border rounded px-2 py-1"
                        />
                      </td>
                      <td className="border px-4 py-2">{getNewMargin(band.margin)}%</td>
                      <td className="border px-4 py-2">{getIncomeImpact(band.margin)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                disabled={!confirmEnabled}
                onClick={() => alert("Flexible margin configuration confirmed.")}
                className={`mt-2 px-6 py-2 rounded text-white transition ${
                  confirmEnabled ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
