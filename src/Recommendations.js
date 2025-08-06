import React from "react";
import { useNavigate } from "react-router-dom";

export default function Recommendations() {
  const navigate = useNavigate();

  const handleApply = ({ merchant, start, end, change }) => {
    const params = new URLSearchParams({
      merchant,
      start,
      end,
      change
    });
    navigate(`/flexible-margins?${params.toString()}`);
  };

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h3 className="text-lg font-bold mb-4">Recommended Margin Adjustments</h3>
      <ul className="list-disc list-inside text-sm">
        <li className="mb-4">
          <p>
            📌 Increase margin by <strong>+0.25%</strong> for <strong>PaySphere</strong> between <strong>17:00–20:00</strong><br />
            <span className="text-gray-600">🧠 30% of PaySphere’s transactions occur during this peak period, with high values.</span>
          </p>
          <button
            onClick={() => handleApply({
              merchant: "PaySphere",
              start: "17",
              end: "20",
              change: "0.25"
            })}
            className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </li>

        <li className="mb-4">
          <p>
            📌 Increase margin by <strong>+0.20%</strong> for <strong>GlobalMart</strong> between <strong>10:00–14:00</strong><br />
            <span className="text-gray-600">🧠 Consistent high-value activity observed for GlobalMart in UAE late morning.</span>
          </p>
          <button
            onClick={() => handleApply({
              merchant: "GlobalMart",
              start: "10",
              end: "14",
              change: "0.20"
            })}
            className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Apply
          </button>
        </li>
      </ul>
    </div>
  );
}