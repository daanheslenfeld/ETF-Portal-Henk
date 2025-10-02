import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // User state
  const [user, setUser] = useState(null);

  // Portfolio state
  const [portfolio, setPortfolio] = useState({
    etfs: [],
    goal: null,
    horizon: null,
    initialAmount: 0,
    monthlyContribution: 0,
    riskProfile: null,
  });

  // Investment details for purchase flow
  const [investmentDetails, setInvestmentDetails] = useState({
    goal: "",
    horizon: 10,
    amount: 10000,
    monthlyContribution: 500,
    riskProfile: "neutraal",
  });

  // Modal state
  const [selectedETF, setSelectedETF] = useState(null);
  const [showETFModal, setShowETFModal] = useState(false);

  // Filters state
  const [filters, setFilters] = useState({
    categorie: "Alle",
    subcategorie: "Alle",
    valuta: "Alle",
    search: "",
  });

  // Functions
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setPortfolio({
      etfs: [],
      goal: null,
      horizon: null,
      initialAmount: 0,
      monthlyContribution: 0,
      riskProfile: null,
    });
  };

  const addToPortfolio = (etf, weight) => {
    setPortfolio((prev) => ({
      ...prev,
      etfs: [...prev.etfs, { ...etf, weight }],
    }));
  };

  const removeFromPortfolio = (etfId) => {
    setPortfolio((prev) => ({
      ...prev,
      etfs: prev.etfs.filter((e) => e.id !== etfId),
    }));
  };

  const updatePortfolio = (updates) => {
    setPortfolio((prev) => ({ ...prev, ...updates }));
  };

  const openETFModal = (etf) => {
    setSelectedETF(etf);
    setShowETFModal(true);
  };

  const closeETFModal = () => {
    setShowETFModal(false);
    setTimeout(() => setSelectedETF(null), 300);
  };

  const value = {
    user,
    portfolio,
    investmentDetails,
    selectedETF,
    showETFModal,
    filters,
    login,
    logout,
    addToPortfolio,
    removeFromPortfolio,
    updatePortfolio,
    setInvestmentDetails,
    openETFModal,
    closeETFModal,
    setFilters,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
