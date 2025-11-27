import { useMode } from '../context/ModeContext';

export default function Footer() {
  const { accentColor, mode } = useMode();

  // Determine text color based on the accent color for maximum contrast
  const textColor = mode === 'cafe' ? '#1F2937' : accentColor; 
  
  return (
    <footer 
      className="w-full py-4 text-center text-sm border-t border-gray-200/50 backdrop-blur-sm"
      style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white
        color: textColor
      }}
    >
      <div className="container mx-auto px-4">
        &copy; {new Date().getFullYear()} Calcutta-d-Rasoi | Designed & Developed by 
        <a 
          href="#" // Replace with PixelNode's website link if available
          className="font-bold transition-colors duration-300 ml-1"
          style={{ color: accentColor }}
        >
          PixelNode
        </a>
      </div>
    </footer>
  );
}