import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Info, DollarSign, PieChart, Globe } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';

const ETFModal = () => {
  const { selectedETF, showETFModal, closeETFModal } = useApp();

  if (!selectedETF || !showETFModal) return null;

  // Mock performance data for chart
  const performanceData = [
    { maand: 'Jan', waarde: 100 },
    { maand: 'Feb', waarde: 102 },
    { maand: 'Mrt', waarde: 105 },
    { maand: 'Apr', waarde: 103 },
    { maand: 'Mei', waarde: 108 },
    { maand: 'Jun', waarde: 112 },
    { maand: 'Jul', waarde: 115 },
    { maand: 'Aug', waarde: 113 },
    { maand: 'Sep', waarde: 118 },
    { maand: 'Okt', waarde: 120 },
    { maand: 'Nov', waarde: 125 },
    { maand: 'Dec', waarde: 128 }
  ];

  const handleAddToPortfolio = () => {
    alert(`${selectedETF.naam} toevoegen aan portfolio (functionaliteit nog te implementeren)`);
  };

  return (
    <AnimatePresence>
      {showETFModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeETFModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedETF.naam}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedETF.ticker} • {selectedETF.isin}
                </p>
              </div>
              <button
                onClick={closeETFModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-900">Koers</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">
                    {selectedETF.valuta} {selectedETF.koers?.toFixed(2) || 'N/A'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <p className="text-sm font-medium text-green-900">TER</p>
                  </div>
                  <p className="text-2xl font-bold text-green-900">
                    {selectedETF.ter ? `${selectedETF.ter}%` : 'N/A'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    <p className="text-sm font-medium text-purple-900">Fondsgrootte</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {selectedETF.fondsgrootte || 'N/A'}
                  </p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-orange-600" />
                    <p className="text-sm font-medium text-orange-900">Domicilie</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {selectedETF.domicilie || 'N/A'}
                  </p>
                </div>
              </div>

              {/* Description */}
              {selectedETF.beschrijving && (
                <div className="bg-gray-50 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-gray-700" />
                    <h3 className="text-lg font-semibold text-gray-900">Beschrijving</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{selectedETF.beschrijving}</p>
                </div>
              )}

              {/* Performance Chart */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                  Performance (12 maanden)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="maand"
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#6b7280"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="waarde"
                      stroke="#6366f1"
                      strokeWidth={3}
                      dot={{ fill: '#6366f1', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Category & Classification */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Classificatie</h3>
                  <div>
                    <p className="text-sm text-gray-500">Categorie</p>
                    <p className="text-base font-semibold text-gray-900">{selectedETF.categorie || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Subcategorie</p>
                    <p className="text-base font-semibold text-gray-900">{selectedETF.subcategorie || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valuta</p>
                    <p className="text-base font-semibold text-gray-900">{selectedETF.valuta || 'N/A'}</p>
                  </div>
                </div>

                {/* Performance & Risk */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance & Risico</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-sm text-gray-500">1 jaar</p>
                      <p className={`text-base font-semibold ${selectedETF.rendement1jaar >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedETF.rendement1jaar ? `${selectedETF.rendement1jaar}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">3 jaar</p>
                      <p className={`text-base font-semibold ${selectedETF.rendement3jaar >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedETF.rendement3jaar ? `${selectedETF.rendement3jaar}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">5 jaar</p>
                      <p className={`text-base font-semibold ${selectedETF.rendement5jaar >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedETF.rendement5jaar ? `${selectedETF.rendement5jaar}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volatiliteit</p>
                    <p className="text-base font-semibold text-gray-900">
                      {selectedETF.volatiliteit ? `${selectedETF.volatiliteit}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Distribution Policy */}
              {selectedETF.uitkeringsbeleid && (
                <div className="bg-white border border-gray-200 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Uitkeringsbeleid</h3>
                  <p className="text-gray-700">{selectedETF.uitkeringsbeleid}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddToPortfolio}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Toevoegen aan Portfolio
                </button>
                <button
                  onClick={closeETFModal}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ETFModal;