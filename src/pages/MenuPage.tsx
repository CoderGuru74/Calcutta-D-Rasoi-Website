import { useState } from 'react';
import { useMode } from '../context/ModeContext';
import { restaurantMenu, cafeMenu, MenuItem } from '../data/menuData';
import OrderModal from '../components/OrderModal';
// Removed: import DrinkSwitchModal from '../components/DrinkSwitchModal';

interface MenuPageProps {
  onNavigate: (page: string) => void;
}

export default function MenuPage({ onNavigate }: MenuPageProps) {
  const { mode, accentColor } = useMode();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  // Removed: const [showDrinkSwitchModal, setShowDrinkSwitchModal] = useState(false); 

  const menuBg = "https://images.pexels.com/photos/3282276/pexels-photo-3282276.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"; 

  const menu = mode === 'restaurant' ? restaurantMenu : cafeMenu;
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'starter', name: 'Starters' },
    { id: 'veg', name: 'Vegetarian' },
    { id: 'non-veg', name: 'Non-Veg' },
    { id: 'dessert', name: 'Desserts' },
    { id: 'drinks', name: 'Drinks' },
  ];

  const filteredMenu =
    selectedCategory === 'all'
      ? menu
      : menu.filter((item) => item.category === selectedCategory);
      
  const handleOrderClick = (item: MenuItem) => {
    // UPDATED LOGIC: Immediately open OrderModal for all items.
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${menuBg}')`,
          filter: 'brightness(0.2)',
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor}15 0%, ${accentColor}25 100%)`,
        }}
      />

      <div className="relative z-10 px-4 py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 animate-fadeIn">
            <h1
              className="text-5xl md:text-7xl font-bold mb-4"
              style={{ color: accentColor }}
            >
              {mode === 'restaurant' ? 'Our Menu' : 'Café Menu'}
            </h1>
            <p className="text-xl text-gray-200">
              {mode === 'restaurant'
                ? 'Authentic Bengali Cuisine'
                : 'Quick Bites & Beverages'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fadeIn animation-delay-200">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'shadow-lg scale-105'
                    : 'bg-white/80 text-gray-700 hover:bg-white'
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category.id ? accentColor : undefined,
                  color:
                    selectedCategory === category.id
                      ? mode === 'restaurant'
                        ? '#F5F5DC'
                        : '#1F2937'
                      : undefined,
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMenu.map((item, index) => (
              <div
                key={item.id}
                className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fadeIn flex justify-between items-center"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold truncate" title={item.name}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                </div>

                <button
                  onClick={() => handleOrderClick(item)} 
                  className="ml-4 flex-shrink-0 px-4 py-2 rounded-md font-bold text-sm transition-all duration-300 hover:opacity-90"
                  style={{
                    backgroundColor: accentColor,
                    color: mode === 'restaurant' ? '#F5F5DC' : '#1F2937', 
                  }}
                >
                  Order
                </button>
              </div>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-300">
                No items found in this category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RENDER MODALS */}
      {selectedItem && (
        <OrderModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
      {/* Removed: DrinkSwitchModal rendering */}
    </div>
  );
}