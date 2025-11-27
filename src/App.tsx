import { useState } from 'react';
import { ModeProvider } from './context/ModeContext';
import Header from './components/Header';
import Footer from './components/Footer'; // ⬅️ IMPORT NEW FOOTER
import HomePage from './pages/HomePage';
import StoryPage from './pages/StoryPage';
import MenuPage from './pages/MenuPage';
import BookingsPage from './pages/BookingsPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'story':
        return <StoryPage />;
      case 'menu':
        return <MenuPage onNavigate={setCurrentPage} />;
      case 'bookings':
        return <BookingsPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <ModeProvider>
      <div className="flex flex-col min-h-screen">
        <Header onNavigate={setCurrentPage} currentPage={currentPage} />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          {renderPage()}
        </main>
        
        {/* ⬅️ ADD FOOTER HERE */}
        <Footer /> 
      </div>
    </ModeProvider>
  );
}

export default App;