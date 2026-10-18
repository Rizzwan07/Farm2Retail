// Soil Intelligence Adapter
// Simulates soil analysis based on location and area inputs
// This is a frontend-only mock — no real ML model or backend

// Known soil types in Indian agricultural regions
const SOIL_TYPES = [
  { id: 'black-cotton', name: 'Black Cotton Soil', regions: ['Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Andhra Pradesh', 'Telangana'], description: 'High clay content, excellent water retention, ideal for cotton, soybean, wheat' },
  { id: 'alluvial', name: 'Alluvial Soil', regions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Assam'], description: 'Fertile, rich in minerals, ideal for rice, wheat, sugarcane, vegetables' },
  { id: 'red-loam', name: 'Red Loam Soil', regions: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Odisha'], description: 'Well-drained, good for groundnut, millets, pulses, vegetables' },
  { id: 'laterite', name: 'Laterite Soil', regions: ['Kerala', 'Karnataka', 'Goa', 'Maharashtra', 'Odisha', 'West Bengal'], description: 'High iron/aluminum, acidic, suitable for cashew, tea, rubber, coconut' },
  { id: 'sandy-loam', name: 'Sandy Loam Soil', regions: ['Rajasthan', 'Gujarat', 'Haryana', 'Punjab'], description: 'Well-drained, low water retention, good for watermelon, muskmelon, groundnut' },
  { id: 'clay', name: 'Clay Soil', regions: ['Various regions'], description: 'Heavy, high water retention, suitable for rice, jute' },
  { id: 'peaty', name: 'Peaty/Marshy Soil', regions: ['Kerala', 'West Bengal', 'Odisha'], description: 'High organic matter, acidic, suitable for rice, jute' },
];

// Crop recommendations by soil type
const CROP_RECOMMENDATIONS = {
  'black-cotton': [
    { crop: 'Cotton', suitability: 95, reason: 'Native crop for black cotton soil' },
    { crop: 'Soybean', suitability: 90, reason: 'Excellent root development in clay' },
    { crop: 'Wheat', suitability: 85, reason: 'Good moisture retention for rabi crop' },
    { crop: 'Chickpea', suitability: 80, reason: 'Tolerates heavy soil well' },
    { crop: 'Sunflower', suitability: 75, reason: 'Deep roots access stored moisture' },
  ],
  'alluvial': [
    { crop: 'Rice', suitability: 95, reason: 'High fertility and water availability' },
    { crop: 'Wheat', suitability: 90, reason: 'Ideal for rabi season in alluvial plains' },
    { crop: 'Sugarcane', suitability: 88, reason: 'High nutrient demand met by alluvial soil' },
    { crop: 'Maize', suitability: 85, reason: 'Good drainage and fertility' },
    { crop: 'Vegetables', suitability: 90, reason: 'Versatile for multiple vegetable crops' },
  ],
  'red-loam': [
    { crop: 'Groundnut', suitability: 92, reason: 'Well-drained soil ideal for pod development' },
    { crop: 'Finger Millet', suitability: 88, reason: 'Thrives in red loam conditions' },
    { crop: 'Pulses', suitability: 85, reason: 'Good for red gram, green gram' },
    { crop: 'Vegetables', suitability: 87, reason: 'Suitable for tomato, brinjal, okra' },
    { crop: 'Mango', suitability: 80, reason: 'Deep rooting in loamy soil' },
  ],
  'laterite': [
    { crop: 'Cashew', suitability: 95, reason: 'Native to laterite regions' },
    { crop: 'Tea', suitability: 90, reason: 'Acidic soil perfect for tea' },
    { crop: 'Rubber', suitability: 88, reason: 'Well-drained laterite suits rubber' },
    { crop: 'Coconut', suitability: 85, reason: 'Coastal laterite ideal for coconut' },
    { crop: 'Pineapple', suitability: 82, reason: 'Acidic, well-drained soil' },
  ],
  'sandy-loam': [
    { crop: 'Watermelon', suitability: 92, reason: 'Sandy soil prevents fruit rot' },
    { crop: 'Muskmelon', suitability: 90, reason: 'Good drainage for melons' },
    { crop: 'Groundnut', suitability: 88, reason: 'Easy pod penetration in sandy soil' },
    { crop: 'Sweet Potato', suitability: 85, reason: 'Tuber development in loose soil' },
    { crop: 'Cucumber', suitability: 80, reason: 'Well-drained conditions' },
  ],
  'clay': [
    { crop: 'Rice', suitability: 95, reason: 'Water retention perfect for paddy' },
    { crop: 'Jute', suitability: 90, reason: 'Clay soil ideal for jute fiber' },
    { crop: 'Wheat', suitability: 75, reason: 'Possible with proper drainage' },
  ],
  'peaty': [
    { crop: 'Rice', suitability: 92, reason: 'High organic matter, waterlogged conditions' },
    { crop: 'Jute', suitability: 88, reason: 'Marshy soil suits jute cultivation' },
  ],
};

// Region to soil type mapping (simplified)
const REGION_SOIL_MAP = {
  'maharashtra': ['black-cotton', 'laterite'],
  'madhya pradesh': ['black-cotton'],
  'gujarat': ['black-cotton', 'sandy-loam'],
  'andhra pradesh': ['black-cotton', 'red-loam'],
  'telangana': ['black-cotton', 'red-loam'],
  'punjab': ['alluvial'],
  'haryana': ['alluvial', 'sandy-loam'],
  'uttar pradesh': ['alluvial'],
  'bihar': ['alluvial'],
  'west bengal': ['alluvial', 'laterite', 'peaty'],
  'assam': ['alluvial'],
  'tamil nadu': ['red-loam'],
  'karnataka': ['red-loam', 'laterite'],
  'odisha': ['red-loam', 'laterite'],
  'kerala': ['laterite', 'peaty'],
  'goa': ['laterite'],
  'rajasthan': ['sandy-loam'],
  'default': ['red-loam', 'alluvial'],
};

// Helper to normalize location string
function normalizeLocation(location) {
  return location.toLowerCase().trim();
}

// Predict soil type based on location
function predictSoilType(location) {
  const normalized = normalizeLocation(location);
  
  // Check for state/region matches
  for (const [region, soilTypes] of Object.entries(REGION_SOIL_MAP)) {
    if (normalized.includes(region)) {
      return soilTypes[0]; // Return primary soil type
    }
  }
  
  // Default fallback
  return 'red-loam';
}

// Get soil details by ID
function getSoilDetails(soilId) {
  return SOIL_TYPES.find(s => s.id === soilId) || SOIL_TYPES[0];
}

// Get crop recommendations for soil type
function getCropRecommendations(soilId) {
  return CROP_RECOMMENDATIONS[soilId] || [];
}

// Simulate async model inference
async function analyzeSoil({ location, area, cropInterest }) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  const soilTypeId = predictSoilType(location);
  const soilDetails = getSoilDetails(soilTypeId);
  const recommendations = getCropRecommendations(soilTypeId);
  
  // Filter by crop interest if provided
  let filteredRecs = recommendations;
  if (cropInterest) {
    const interest = cropInterest.toLowerCase();
    filteredRecs = recommendations.filter(r => 
      r.crop.toLowerCase().includes(interest) ||
      r.reason.toLowerCase().includes(interest)
    );
    // If no matches, return all with a note
    if (filteredRecs.length === 0) {
      filteredRecs = recommendations;
    }
  }
  
  // Calculate area-based insights
  const areaAcres = parseFloat(area) || 1;
  const totalAreaInsight = areaAcres > 10 ? 'Large holding suitable for commercial cultivation' :
                          areaAcres > 5 ? 'Medium holding suitable for diversified farming' :
                          'Small holding suitable for intensive/high-value crops';
  
  return {
    location: location,
    area: areaAcres,
    predictedSoil: {
      id: soilTypeId,
      name: soilDetails.name,
      description: soilDetails.description,
      regions: soilDetails.regions,
    },
    cropRecommendations: filteredRecs.map(r => ({
      crop: r.crop,
      suitabilityScore: r.suitability,
      reason: r.reason,
    })),
    areaInsight: totalAreaInsight,
    timestamp: new Date().toISOString(),
    disclaimer: 'Predictions are based on regional soil maps and general agricultural knowledge. Actual soil conditions may vary. Conduct a proper soil test before making farming decisions.',
  };
}

export { analyzeSoil, SOIL_TYPES, predictSoilType };