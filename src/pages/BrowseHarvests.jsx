import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Search, MapPin, Calendar, IndianRupee, Wheat } from 'lucide-react';
import { cropCategories } from '../data/harvests';

function BrowseHarvests() {
  const { harvests } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter harvests by search query and category
  const filteredHarvests = harvests.filter((harvest) => {
    const matchesSearch =
      harvest.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      harvest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      harvest.farmer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || harvest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Browse Harvests</h1>
        <p className="mt-1 text-gray-600">Find fresh produce directly from local farmers.</p>
      </div>

      {/* Search and filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by crop, location or farmer..."
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary"
          />
        </div>
        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary"
        >
          {cropCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredHarvests.length} of {harvests.length} listings
      </p>

      {/* Harvest cards grid */}
      {filteredHarvests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Wheat className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No harvests match your search. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHarvests.map((harvest) => (
            <Link
              key={harvest.id}
              to={`/dashboard/harvest/${harvest.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow no-underline group"
            >
              {/* Crop image or placeholder */}
              <div className="h-40 bg-green-primary/5 flex items-center justify-center overflow-hidden">
                {harvest.image ? (
                  <img
                    src={harvest.image}
                    alt={harvest.crop}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <Wheat className="w-10 h-10 text-green-primary/30" />
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-green-dark">{harvest.crop}</h3>
                  <span className="text-xs bg-green-primary/10 text-green-primary px-2 py-0.5 rounded-full">
                    {harvest.category}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">by {harvest.farmer}</p>
                <div className="space-y-1.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-3.5 h-3.5 text-gray-400" />
                    <span>₹{harvest.pricePerKg}/{harvest.unit} · {harvest.quantity} {harvest.unit} available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{harvest.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>Harvest: {harvest.harvestDate}</span>
                  </div>
                </div>
                <div className="mt-3 text-sm font-medium text-green-primary">
                  View Details →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BrowseHarvests;
