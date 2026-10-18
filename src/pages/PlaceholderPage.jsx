import { useParams } from 'react-router-dom';
import { Construction } from 'lucide-react';

// Map route slugs to display titles
const pageTitles = {
  // Farmer pages
  'my-harvests': 'My Harvests',
  'my-bookings': 'My Bookings',
  'crop-bids': 'Crop Bids',
  'find-farmland': 'Find Farmland',
  'soil-intelligence': 'Soil Intelligence',
  // Retailer pages
  'browse-harvests': 'Browse Harvests',
  'retailer-bookings': 'Retailer Bookings',
  'crop-requirements': 'Crop Requirements',
  'orders': 'Orders',
  // Landowner pages
  'my-properties': 'My Properties',
  'lease-applications': 'Lease Applications',
  'lease-management': 'Lease Management',
};

function PlaceholderPage() {
  const { page } = useParams();
  const title = pageTitles[page] || 'Page';

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-16 h-16 bg-green-primary/10 rounded-2xl flex items-center justify-center mb-6">
        <Construction className="w-8 h-8 text-green-primary" />
      </div>
      <h1 className="text-2xl font-bold text-green-dark mb-2">{title}</h1>
      <p className="text-gray-500 text-center max-w-md">
        This feature is coming soon. The <span className="font-medium text-green-dark">{title}</span> page
        will be built in an upcoming milestone.
      </p>
    </div>
  );
}

export default PlaceholderPage;
