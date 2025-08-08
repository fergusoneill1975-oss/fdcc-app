import { useNavigate } from "react-router-dom";

export default function BusinessPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
      <h2 className="text-3xl font-semibold mb-10">Business Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <a
          href="https://www.fexco.com/payments-and-fx/payment-orchestration-solutions/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-64 text-center px-6 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Customer Payments
        </a>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-64 text-center px-6 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          FX (FDCC)
        </button>
        <a
          href="https://internationalpayments.fexco.com/en-ie/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-64 text-center px-6 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          International Payments
        </a>
        <a
          href="https://www.fexco.com/payments-and-fx/asset-finance/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-64 text-center px-6 py-4 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Finance
        </a>
      </div>
    </div>
  );
}