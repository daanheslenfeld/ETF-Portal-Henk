import { useState } from "react";
import { Search, TrendingUp, TrendingDown, Info, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Mock ETF data
const etfDatabase = [
  {
    id: 1,
    name: "Vanguard S&P 500 UCITS ETF",
    ticker: "VUSA",
    category: "Aandelen VS",
    price: 107.14,
    change: 2.3,
    positive: true,
    ter: 0.07,
    aum: "45.2B",
    description: "Volgt de S&P 500 index, bestaande uit de 500 grootste Amerikaanse bedrijven.",
  },
  {
    id: 2,
    name: "iShares MSCI World UCITS ETF",
    ticker: "IWDA",
    category: "Aandelen Wereld",
    price: 84.71,
    change: 1.8,
    positive: true,
    ter: 0.20,
    aum: "62.8B",
    description: "Brede spreiding over ontwikkelde markten wereldwijd.",
  },
  {
    id: 3,
    name: "Vanguard FTSE All-World UCITS ETF",
    ticker: "VWRL",
    category: "Aandelen Wereld",
    price: 100.00,
    change: -0.5,
    positive: false,
    ter: 0.22,
    aum: "15.3B",
    description: "Volgt zowel ontwikkelde als opkomende markten wereldwijd.",
  },
  {
    id: 4,
    name: "iShares Core MSCI Emerging Markets",
    ticker: "IEMG",
    category: "Aandelen EM",
    price: 35.00,
    change: 3.1,
    positive: true,
    ter: 0.18,
    aum: "78.5B",
    description: "Belegt in grote en middelgrote bedrijven in opkomende markten.",
  },
  {
    id: 5,
    name: "iShares Euro Government Bond UCITS ETF",
    ticker: "IEAG",
    category: "Obligaties",
    price: 19.00,
    change: 0.5,
    positive: true,
    ter: 0.15,
    aum: "3.2B",
    description: "Belegt in staatsobligaties van Eurozone landen.",
  },
  {
    id: 6,
    name: "Vanguard EUR Eurozone Government Bond",
    ticker: "VGEA",
    category: "Obligaties",
    price: 13.00,
    change: -0.3,
    positive: false,
    ter: 0.12,
    aum: "1.8B",
    description: "Volgt de prestaties van staatsobligaties uit de Eurozone.",
  },
  {
    id: 7,
    name: "iShares NASDAQ 100 UCITS ETF",
    ticker: "CNDX",
    category: "Aandelen VS Tech",
    price: 18.45,
    change: 3.7,
    positive: true,
    ter: 0.33,
    aum: "8.2B",
    description: "Volgt de 100 grootste niet-financiële bedrijven op de NASDAQ.",
  },
  {
    id: 8,
    name: "iShares Core EURO STOXX 50 UCITS ETF",
    ticker: "EUE",
    category: "Aandelen Europa",
    price: 49.20,
    change: 1.2,
    positive: true,
    ter: 0.10,
    aum: "12.5B",
    description: "Belegt in de 50 grootste bedrijven in de Eurozone.",
  },
];

export default function ETFSelection() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Aandelen VS", "Aandelen Wereld", "Aandelen EM", "Obligaties", "Aandelen Europa", "Aandelen VS Tech"];

  const filteredETFs = etfDatabase.filter((etf) => {
    const matchesSearch =
      etf.name.toLowerCase().includes(search.toLowerCase()) ||
      etf.ticker.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "All" || etf.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInvest = (etf) => {
    alert(`Investeren in ${etf.name} (${etf.ticker}) - Deze functionaliteit komt binnenkort!`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">ETF Selectie</h1>
        <p className="text-slate-600 mt-1">Ontdek en investeer in verschillende ETF's</p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Zoek op naam of ticker..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat)}
                  className={selectedCategory === cat ? "bg-slate-900" : "bg-slate-100"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ETF List */}
      <div className="grid gap-4">
        {filteredETFs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-slate-600">Geen ETF's gevonden met de huidige filters.</p>
            </CardContent>
          </Card>
        ) : (
          filteredETFs.map((etf) => (
            <Card key={etf.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900">{etf.ticker}</h3>
                        <p className="text-sm text-slate-600">{etf.name}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {etf.category}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-3">{etf.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-slate-500">Prijs</span>
                        <div className="font-semibold">€{etf.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-slate-500">Verandering</span>
                        <div
                          className={`font-semibold flex items-center gap-1 ${
                            etf.positive ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {etf.positive ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          {etf.positive ? "+" : ""}
                          {etf.change}%
                        </div>
                      </div>
                      <div>
                        <span className="text-slate-500">TER</span>
                        <div className="font-semibold">{etf.ter}%</div>
                      </div>
                      <div>
                        <span className="text-slate-500">AUM</span>
                        <div className="font-semibold">€{etf.aum}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2 md:items-end">
                    <Button
                      onClick={() => handleInvest(etf)}
                      className="flex-1 md:flex-none bg-slate-900 hover:bg-slate-800"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Investeer
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 md:flex-none"
                      onClick={() => alert(`Meer informatie over ${etf.ticker} komt binnenkort!`)}
                    >
                      <Info className="mr-2 h-4 w-4" /> Info
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredETFs.length > 0 && (
        <p className="text-sm text-slate-500 text-center">
          {filteredETFs.length} ETF{filteredETFs.length !== 1 ? "'s" : ""} gevonden
        </p>
      )}
    </div>
  );
}
