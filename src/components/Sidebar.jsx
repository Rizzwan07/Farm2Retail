import { Link, useLocation } from 'react-router-dom';
import {
  Sprout,
  LayoutDashboard,
  Wheat,
  CalendarCheck,
  Gavel,
  MapPin,
  FlaskConical,
  ShoppingBasket,
  ClipboardList,
  ShoppingCart,
  Building2,
  FileText,
  FolderKanban,
  X,
} from 'lucide-react';

// Menu items grouped by role — each item has a unique route slug
const roleMenus = {
  farmer: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'My Harvests', icon: Wheat, to: '/dashboard/my-harvests' },
    { label: 'My Bookings', icon: CalendarCheck, to: '/dashboard/my-bookings' },
    { label: 'Crop Bids', icon: Gavel, to: '/dashboard/crop-bids' },
    { label: 'Find Farmland', icon: MapPin, to: '/dashboard/find-farmland' },
    { label: 'Soil Intelligence', icon: FlaskConical, to: '/dashboard/soil-intelligence' },
  ],
  retailer: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'Browse Harvests', icon: ShoppingBasket, to: '/dashboard/browse-harvests' },
    { label: 'My Bookings', icon: CalendarCheck, to: '/dashboard/retailer-bookings' },
    { label: 'Crop Requirements', icon: ClipboardList, to: '/dashboard/crop-requirements' },
    { label: 'Orders', icon: ShoppingCart, to: '/dashboard/orders' },
  ],
  landowner: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
    { label: 'My Properties', icon: Building2, to: '/dashboard/my-properties' },
    { label: 'Lease Applications', icon: FileText, to: '/dashboard/lease-applications' },
    { label: 'Lease Management', icon: FolderKanban, to: '/dashboard/lease-management' },
  ],
};

const roleLabels = {
  farmer: 'Farmer',
  retailer: 'Retailer',
  landowner: 'Landowner',
};

function Sidebar({ isOpen, onClose, currentRole }) {
  const location = useLocation();
  const items = roleMenus[currentRole] || roleMenus.farmer;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 shrink-0 bg-green-dark text-white
          transform transition-transform duration-200 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-green-primary/30">
          <Link to="/" className="flex items-center gap-2 text-white no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 focus-visible:ring-offset-green-dark rounded-lg">
            <Sprout className="w-6 h-6" />
            <span className="text-lg font-bold">Farm2Retail</span>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded hover:bg-green-primary/20 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 focus-visible:ring-offset-green-dark"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
          <p className="text-xs font-semibold uppercase tracking-wider text-green-light/70 mb-3 px-3">
            {roleLabels[currentRole] || 'Farmer'} Menu
          </p>
          <ul className="space-y-1 list-none p-0 m-0">
            {items.map((item) => {
              const isActive = location.pathname === item.to;
              return (
<li key={item.label}>
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors no-underline
                        relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-6 before:w-0.5 before:bg-transparent before:transition-all
                        ${isActive
                          ? 'bg-green-primary/40 text-white font-medium before:w-0.5 before:bg-green-primary'
                          : 'text-white/80 hover:bg-green-primary/30 hover:text-white'}
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-primary focus-visible:ring-offset-2 focus-visible:ring-offset-green-dark
                      `}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
