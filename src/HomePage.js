import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-700 to-red-500 text-white">
      <h1 className="text-4xl font-bold mb-12">Welcome to Fexco</h1>
      <div className="space-x-8">
        <button
          onClick={() => navigate("/personal")}
          className="px-8 py-4 bg-white text-red-700 rounded shadow hover:bg-gray-200 transition"
        >
          Personal
        </button>

        <button
          onClick={() => navigate("/business")}
          className="px-8 py-4 bg-white text-red-700 rounded shadow hover:bg-gray-200 transition"
        >
          Business
        </button>
      </div>
    </div>
  );
}