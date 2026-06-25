'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Region = 'IN' | 'INT';

interface AppContextType {
  region: Region;
  setRegion: (r: Region) => void;
  currency: string;
  selectedService: string;
  setSelectedService: (s: string) => void;
}

const AppContext = createContext<AppContextType>({
  region: 'IN',
  setRegion: () => {},
  currency: '₹',
  selectedService: '',
  setSelectedService: () => {},
});

export function RegionProvider({ children }: { children: ReactNode }) {
  const [region, setRegion] = useState<Region>('IN');
  const [selectedService, setSelectedService] = useState('');
  const currency = region === 'IN' ? '₹' : '$';

  return (
    <AppContext.Provider value={{ region, setRegion, currency, selectedService, setSelectedService }}>
      {children}
    </AppContext.Provider>
  );
}

export function useRegion() {
  return useContext(AppContext);
}