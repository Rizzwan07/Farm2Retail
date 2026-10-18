import { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { Search, Home, DollarSign, Droplet, Leaf, Tag, MapPin as MapPinIcon } from 'lucide-react';

const leaseTypes = ['Fixed Rent', 'Crop Share (50-50)', 'Crop Share (60-40)', 'Flexible'];
const soilTypes = ['Black Cotton Soil', 'Alluvial Soil', 'Red Loam Soil', 'Laterite Soil', 'Sandy Loam', 'Clay Soil'];
const waterAvailabilities = ['Excellent', 'Good', 'Moderate', 'Limited'];

function FindFarmland() {
  const { properties } = useOutletContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeaseType, setSelectedLeaseType] = useState('All');
  const [minAcreage, setMinAcreage] = useState('');
  const [maxAcreage, setMaxAcreage] = useState('');
  const [minRent, setMinRent] = useState('');
  const [maxRent, setMaxRent] = useState('');
  const [selectedSoilType, setSelectedSoilType] = useState('All');
  const [selectedWater, setSelectedWater] = useState('All');

  // Filter available properties
  const availableProperties = properties.filter((p) => p.status === 'Available');
  
  const filteredProperties = availableProperties.filter((prop) => {
    const matchesSearch = !searchQuery || 
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.permittedCrops.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLeaseType = selectedLeaseType === 'All' || prop.leaseType === selectedLeaseType;
    const matchesSoilType = selectedSoilType === 'All' || prop.soilType === selectedSoilType;
    const matchesWater = selectedWater === 'All' || prop.waterAvailability === selectedWater;
    const matchesMinAcreage = !minAcreage || prop.acreage >= Number(minAcreage);
    const matchesMaxAcreage = !maxAcreage || prop.acreage <= Number(maxAcreage);
    const totalRent = prop.acreage * prop.rentPerAcre;
    const matchesMinRent = !minRent || totalRent >= Number(minRent);
    const matchesMaxRent = !maxRent || totalRent <= Number(maxRent);
    
    return matchesSearch && matchesLeaseType && matchesSoilType && matchesWater && 
           matchesMinAcreage && matchesMaxAcreage && matchesMinRent && matchesMaxRent;
  });

  const hasActiveFilters = searchQuery || selectedLeaseType !== 'All' || minAcreage || maxAcreage || minRent || maxRent || selectedSoilType !== 'All' || selectedWater !== 'All';

  function clearFilters() {
    setSearchQuery('');
    setSelectedLeaseType('All');
    setMinAcreage('');
    setMaxAcreage('');
    setMinRent('');
    setMaxRent('');
    setSelectedSoilType('All');
    setSelectedWater('All');
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-green-dark">Find Farmland</h1>
        <p className="mt-1 text-gray-600">Browse available farmland properties for lease.</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, location, or crops..."
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary"
            />
          </div>
          <select value={selectedLeaseType} onChange={(e) => setSelectedLeaseType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary w-full sm:w-48">
            <option value="All">All Lease Types</option>
            {leaseTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={selectedSoilType} onChange={(e) => setSelectedSoilType(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary w-full sm:w-48">
            <option value="All">All Soil Types</option>
            {soilTypes.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={selectedWater} onChange={(e) => setSelectedWater(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary w-full sm:w-48">
            <option value="All">Water Availability</option>
            {waterAvailabilities.map((w) => <option key={w} value={w}>{w}</option>)}
          </select>
        </div>
        
        {/* Advanced Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Acreage</label>
            <input type="number" value={minAcreage} onChange={(e) => setMinAcreage(e.target.value)} placeholder="Min" step="0.1" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Acreage</label>
            <input type="number" value={maxAcreage} onChange={(e) => setMaxAcreage(e.target.value)} placeholder="Max" step="0.1" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Min Total Rent (₹)</label>
            <input type="number" value={minRent} onChange={(e) => setMinRent(e.target.value)} placeholder="Min" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Max Total Rent (₹)</label>
            <input type="number" value={maxRent} onChange={(e) => setMaxRent(e.target.value)} placeholder="Max" min="0" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-primary/30 focus:border-green-primary" />
          </div>
        </div>
        
        {hasActiveFilters && (
          <button onClick={clearFilters} className="mt-3 text-sm text-green-primary hover:text-green-dark font-medium no-underline">Clear all filters</button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredProperties.length} of {availableProperties.length} available properties
      </p>

      {/* Property Cards */}
      {filteredProperties.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No properties match your search.</p>
          <p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProperties.map((prop) => {
            const totalRent = prop.acreage * prop.rentPerAcre;
            const isOwnerProvided = true; // In a real app, this would distinguish verified vs predicted
            return (
              <Link
                key={prop.id}
                to={`/dashboard/property/${prop.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow no-underline group"
              >
                <div className="h-40 bg-green-primary/5 flex items-center justify-center relative overflow-hidden">
                  {prop.images && prop.images.length > 0 ? (
                    <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-green-primary/30">
                      <Home className="w-12 h-12 mb-1" />
                      <span className="text-sm">No Image</span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 text-xs bg-green-primary/10 text-green-primary rounded-full">Available</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-green-dark group-hover:text-green-primary transition-colors">{prop.title}</h3>
                    <span className="text-xs bg-green-primary/10 text-green-primary px-2 py-0.5 rounded-full">{prop.acreage} acres</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">by {prop.landowner}</p>
                  <div className="space-y-1.5 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><MapPinIcon className="w-3.5 h-3.5 text-gray-400" /><span>{prop.location}</span></div>
                    <div className="flex items-center gap-2"><DollarSign className="w-3.5 h-3.5 text-gray-400" /><span>₹{prop.rentPerAcre.toLocaleString('en-IN')}/{prop.rentPeriod} · ₹{totalRent.toLocaleString('en-IN')} total</span></div>
                    <div className="flex items-center gap-2"><Tag className="w-3.5 h-3.5 text-gray-400" /><span>{prop.leaseType}</span></div>
                    <div className="flex items-center gap-2"><Leaf className="w-3.5 h-3.5 text-gray-400" /><span>{prop.soilType}</span></div>
                    <div className="flex items-center gap-2"><Droplet className="w-3.5 h-3.5 text-gray-400" /><span>{prop.waterAvailability}</span></div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-1">Permitted: {prop.permittedCrops}</p>
                    <div className="flex items-center gap-2 text-xs">
                      {isOwnerProvided && (
                        <span className="px-2 py-0.5 bg-green-primary/10 text-green-primary rounded-full">Owner provided</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-medium text-green-primary">View Details →</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default FindFarmland;