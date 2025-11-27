import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useMode } from '../context/ModeContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

// NOTE: Using the standard public path reference for the web (assuming D:\...logo.png is moved to your public folder)
const LOGO_SRC = '/logo.png'; 

export default function Header({ onNavigate, currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode, accentColor } = useMode();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Our Story', id: 'story' },
    { name: 'Menu', id: 'menu' },
    { name: 'Bookings', id: 'bookings' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div
          className={`flex items-center gap-3 cursor-pointer transition-all duration-500 ${
            isScrolled ? 'scale-90' : 'scale-100'
          }`}
          onClick={() => onNavigate('home')}
        >
          
          {/* 🔴 LOGO IMPLEMENTATION (Ensure logo.png is accessible via the / path) */}
          <img
            src={LOGO_SRC} 
            alt="Calcutta d'Rasoi Logo"
            className="w-12 h-12 object-contain transition-all duration-300"
            style={{ 
              // Apply drop shadow for contrast against dynamic background images
              filter: isScrolled ? 'none' : 'drop-shadow(0 0 5px rgba(0,0,0,0.5))', 
            }}
          />
          
          <div>
            <h1
              className="font-bold text-xl transition-colors duration-300"
              style={{ color: isScrolled ? accentColor : '#F5F5DC' }}
            >
              Calcutta d'Rasoi
            </h1>
            <p
              className={`text-xs transition-colors duration-300 ${
                isScrolled ? 'text-gray-600' : 'text-gray-200'
              }`}
            >
              {mode === 'restaurant' ? 'Savor the Tradition' : 'The Perfect Adda Spot'}
            </p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`font-medium transition-all duration-300 hover:scale-110 relative group ${
                currentPage === link.id
                  ? 'font-bold'
                  : ''
              }`}
              style={{
                color: isScrolled ? accentColor : '#F5F5DC',
              }}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                  currentPage === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
                style={{ backgroundColor: accentColor }}
              />
            </button>
          ))}
        </nav>

        <button
          className="md:hidden p-2 transition-transform duration-300 hover:scale-110"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{ color: isScrolled ? accentColor : '#F5F5DC' }}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-sm shadow-lg py-4 animate-fadeIn"
        >
          <nav className="flex flex-col gap-4 px-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left font-medium py-2 px-4 rounded-lg transition-all duration-300 ${
                  currentPage === link.id ? 'font-bold' : ''
                }`}
                style={{
                  color: accentColor,
                  backgroundColor: currentPage === link.id ? `${accentColor}15` : 'transparent',
                }}
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}