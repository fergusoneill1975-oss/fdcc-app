export default function PersonalPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h2 className="text-3xl font-semibold mb-10">Personal Services</h2>
      <div className="space-x-8">
        <a
          href="https://www.no1currency.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Order Currency
        </a>
        <a
          href="https://internationalpayments.fexco.com/en-ie/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          International Payments
        </a>
      </div>
    </div>
  );
}