
import { useState } from "react";

const fakeMerchants = [
  "Acme Inc.", "BluePay", "CloudMart", "DigiBooks", "EasyCharge",
  "FinX", "GlobePay", "HyperRetail", "InstaPay", "JetPOS",
  "KoalaPay", "LumenPay", "MetroPOS", "NeoMerch", "OmegaPay"
];

export default function CoreMarginSplit() {
  const [selectedMerchant, setSelectedMerchant] = useState("");
  const [showNewRow, setShowNewRow] = useState(false);
  const [acquirerNew, setAcquirerNew] = useState("");
  const [confirmEnabled, setConfirmEnabled] = useState(false);

  const FDCC = 1.00;
  const total = 4.26;

  const currentSplit = {
    acquirer: 1.25,
    merchant: 2.01,
    fdcc: FDCC,
    total: total
  };

  const merchantNew = () => {
    const acq = parseFloat(acquirerNew || "0");
    const m = total - acq - FDCC;
    return m > 0 ? m.toFixed(2) : "0.00";
  };

  const calculateImpact = () => {
    const newTotal = parseFloat(acquirerNew || "0") + parseFloat(merchantNew()) + FDCC;
    const delta = newTotal - total;
    const estimatedAnnualImpact = delta * 10000;
    return estimatedAnnualImpact.toFixed(2);
  };

  const handleAcquirerChange = (value) => {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed < 0 || parsed + FDCC > total) return;
    setAcquirerNew(value);
    setConfirmEnabled(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <h1 className="text-2xl font-bold text-red-600 mb-6">Core Margin Split</h1>

      <div className="mb-6">
        <label className="block font-medium mb-2">Select Merchant</label>
        <select
          value={selectedMerchant}
          onChange={(e) => {
            setSelectedMerchant(e.target.value);
            setShowNewRow(false);
            setAcquirerNew("");
            setConfirmEnabled(false);
          }}
          className="w-full max-w-md p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Choose a Merchant --</option>
          {fakeMerchants.map((name, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {selectedMerchant && (
        <div className="bg-white rounded-xl shadow p-6 max-w-4xl">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-lg font-semibold">Margin Breakdown for {selectedMerchant}</h2>
            {!showNewRow && (
              <button
                onClick={() => setShowNewRow(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Amend Split
              </button>
            )}
          </div>

          <table className="w-full table-auto border-collapse mb-4 text-center">
            <thead>
              <tr>
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2">Acquirer</th>
                <th className="border px-4 py-2">Merchant</th>
                <th className="border px-4 py-2">FDCC</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2 font-medium">Current</td>
                <td className="border px-4 py-2">{currentSplit.acquirer.toFixed(2)}%</td>
                <td className="border px-4 py-2">{currentSplit.merchant.toFixed(2)}%</td>
                <td className="border px-4 py-2 text-gray-500">1.00%</td>
                <td className="border px-4 py-2">{currentSplit.total.toFixed(2)}%</td>
              </tr>

              {showNewRow && (
                <>
                  <tr>
                    <td className="border px-4 py-2 font-medium">New</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        step="0.01"
                        value={acquirerNew}
                        onChange={(e) => handleAcquirerChange(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                      />
                    </td>
                    <td className="border px-4 py-2">{merchantNew()}%</td>
                    <td className="border px-4 py-2 text-gray-500">1.00%</td>
                    <td className="border px-4 py-2">{total.toFixed(2)}%</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2 font-medium">Annualised Income Impact</td>
                    <td className="border px-4 py-2" colSpan="4">
                      €{calculateImpact()}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>

          {showNewRow && (
            <button
              disabled={!confirmEnabled}
              onClick={() => alert("New margin split confirmed.")}
              className={`mt-2 px-6 py-2 rounded text-white transition ${
                confirmEnabled ? "bg-red-600 hover:bg-red-700" : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          )}
        </div>
      )}
    </div>
  );
}
