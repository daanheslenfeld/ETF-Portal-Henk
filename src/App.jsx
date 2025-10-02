import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewLanding from "./pages/NewLanding";
import NewAuth from "./pages/NewAuth";
import NewETFDatabase from "./pages/NewETFDatabase";
import NewPurchase from "./pages/NewPurchase";
import NewDashboard from "./pages/NewDashboard";
import ETFModal from "./components/ETFModal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewLanding />} />
        <Route path="/login" element={<NewAuth />} />
        <Route path="/register" element={<NewAuth />} />
        <Route path="/etf-database" element={<NewETFDatabase />} />
        <Route path="/purchase" element={<NewPurchase />} />
        <Route path="/dashboard" element={<NewDashboard />} />
      </Routes>
      <ETFModal />
    </BrowserRouter>
  );
}
