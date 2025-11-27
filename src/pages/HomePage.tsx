import { useState } from 'react';
import { useMode } from '../context/ModeContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { mode, toggleMode, accentColor } = useMode();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleToggle = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      toggleMode();
      setTimeout(() => setIsTransitioning(false), 500);
    }, 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className={`absolute inset-0 transition-all duration-1000 ${
          isTransitioning ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
        }`}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              mode === 'restaurant'
                ? "url('https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=1920')"
                : "url('https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1920')",
            filter: 'brightness(0.4)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}40 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isTransitioning
              ? 'opacity-0 translate-y-10'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-fadeIn">
            {mode === 'restaurant' ? 'Savor the Tradition' : 'The Perfect Adda Spot'}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 animate-fadeIn animation-delay-200">
            {mode === 'restaurant'
              ? 'Experience Authentic Bengali Cuisine'
              : 'Where Every Sip Tells a Story'}
          </p>
        </div>

        <div className="mb-12 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-2xl animate-fadeIn animation-delay-400">
          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              disabled={isTransitioning}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 ${
                mode === 'restaurant'
                  ? 'bg-[#005051] text-white scale-105 shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              RESTAURANT
            </button>
            <button
              onClick={handleToggle}
              disabled={isTransitioning}
              className={`px-8 py-4 rounded-full font-bold text-lg transition-all duration-500 ${
                mode === 'cafe'
                  ? 'bg-[#FCD12A] text-gray-900 scale-105 shadow-lg'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }`}
            >
              CAFÉ
            </button>
          </div>
        </div>

        <div
          className={`flex flex-col md:flex-row gap-6 transition-all duration-700 ${
            isTransitioning
              ? 'opacity-0 translate-y-10'
              : 'opacity-100 translate-y-0'
          }`}
        >
          <button
            onClick={() => onNavigate('menu')}
            className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            style={{
              backgroundColor: accentColor,
              color: mode === 'restaurant' ? '#F5F5DC' : '#1F2937',
            }}
          >
            {mode === 'restaurant' ? 'View Menu' : 'View Café Menu'}
          </button>
          <button
            onClick={() => onNavigate('bookings')}
            className="px-10 py-4 bg-white rounded-full font-bold text-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            style={{ color: accentColor }}
          >
            {mode === 'restaurant' ? 'Book A Table' : 'Visit Us'}
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
