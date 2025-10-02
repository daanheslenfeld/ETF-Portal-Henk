import React, { useState, useMemo } from 'react';
import { Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { etfDatabase } from '../data/etfData';
import { useApp } from '../context/AppContext';

const NewETFDatabase = () => {
  const { openETFModal } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedSubcategorie, setSelectedSubcategorie] = useState('');
  const [selectedValuta, setSelectedValuta] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(etfDatabase.map(etf => etf.categorie))];
    return uniqueCategories.sort();
  }, []);

  const subcategories = useMemo(() => {
    const uniqueSubcategories = [...new Set(etfDatabase.map(etf => etf.subcategorie))];
    return uniqueSubcategories.sort();
  }, []);

  const currencies = useMemo(() => {
    const uniqueCurrencies = [...new Set(etfDatabase.map(etf => etf.valuta))];
    return uniqueCurrencies.sort();
  }, []);

  const filteredETFs = useMemo(() => {
    return etfDatabase.filter(etf => {
      const matchesSearch = searchTerm === '' ||
        etf.naam.toLowerCase().includes(searchTerm.toLowerCase()) ||
        etf.ticker.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategorie = selectedCategorie === '' || etf.categorie === selectedCategorie;
      const matchesSubcategorie = selectedSubcategorie === '' || etf.subcategorie === selectedSubcategorie;
      const matchesValuta = selectedValuta === '' || etf.valuta === selectedValuta;

      return matchesSearch && matchesCategorie && matchesSubcategorie && matchesValuta;
    });
  }, [searchTerm, selectedCategorie, selectedSubcategorie, selectedValuta]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategorie('');
    setSelectedSubcategorie('');
    setSelectedValuta('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ETF Database
          </h1>
          <p className="text-gray-600">
            Ontdek en vergelijk Exchange Traded Funds
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Zoek op naam of ticker..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Alle Categorie├źn</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedSubcategorie}
                onChange={(e) => setSelectedSubcategorie(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Alle Subcategorie├źn</option>
                {subcategories.map(subcat => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <select
                value={selectedValuta}
                onChange={(e) => setSelectedValuta(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="">Alle Valuta's</option>
                {currencies.map(curr => (
                  <option key={curr} value={curr}>{curr}</option>
                ))}
              </select>
            </div>

            {(selectedCategorie || selectedSubcategorie || selectedValuta || searchTerm) && (
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Reset
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Filter className="w-4 h-4" />
            <span>{filteredETFs.length} resultaten gevonden</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredETFs.map((etf) => (
            <div
              key={etf.ticker}
              onClick={() => openETFModal(etf)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2"></div>
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                    {etf.naam}
                  </h3>
                  <p className="text-sm text-gray-500 font-mono">{etf.ticker}</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Categorie:</span>
                    <span className="text-sm font-medium text-gray-800">{etf.categorie}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subcategorie:</span>
                    <span className="text-sm font-medium text-gray-800">{etf.subcategorie}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Koers:</span>
                    <span className="text-sm font-medium text-gray-800">
                      {etf.valuta === 'EUR' ? '€' : '$'}{etf.koers.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rendement (1 jaar):</span>
                    <div className="flex items-center gap-1">
                      {etf.rendement1jaar >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm font-bold ${etf.rendement1jaar >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {etf.rendement1jaar >= 0 ? '+' : ''}{etf.rendement1jaar.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">TER:</span>
                    <span className="text-sm font-medium text-gray-800">{etf.ter}%</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium">
                    Details bekijken
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredETFs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Geen resultaten gevonden</h3>
              <p className="text-gray-600 mb-4">
                Probeer je zoekcriteria aan te passen
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewETFDatabase;