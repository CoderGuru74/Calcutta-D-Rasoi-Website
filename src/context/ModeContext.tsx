import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Mode = 'restaurant' | 'cafe';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  accentColor: string;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('restaurant');
  const [accentColor, setAccentColor] = useState('#005051');

  useEffect(() => {
    setAccentColor(mode === 'restaurant' ? '#005051' : '#FCD12A');
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'restaurant' ? 'cafe' : 'restaurant');
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, accentColor, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
