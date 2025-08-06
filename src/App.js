import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import FlexibleMargins from "./FlexibleMargins";
import InsightsPage from "./InsightsPage";
import MessagingPage from "./MessagingPage";
import CoreMarginSplit from "./CoreMarginSplit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/flexible-margins" element={<FlexibleMargins />} />
      <Route path="/messaging" element={<MessagingPage />} />
      <Route path="/insights" element={<InsightsPage />} />
      <Route path="/core-margin" element={<CoreMarginSplit />} />
    </Routes>
  );
}

export default App;


