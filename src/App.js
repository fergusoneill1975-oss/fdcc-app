import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import BusinessPage from "./BusinessPage";
import PersonalPage from "./PersonalPage";
import Dashboard from "./Dashboard";
import LoginPage from "./LoginPage";
import MessagingPage from "./MessagingPage";
import CoreMarginSplit from "./CoreMarginSplit";
import FlexibleMargins from "./FlexibleMargins";
import InsightsPage from "./InsightsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/business" element={<BusinessPage />} />
      <Route path="/personal" element={<PersonalPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/messaging" element={<MessagingPage />} />
      <Route path="/core-margin" element={<CoreMarginSplit />} />
      <Route path="/flexible-margins" element={<FlexibleMargins />} />
      <Route path="/insights" element={<InsightsPage />} />
    </Routes>
  );
}


