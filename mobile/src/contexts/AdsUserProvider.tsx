// src/contexts/UserAdsContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@services/api'; // Certifique-se de ajustar o caminho
import { MyProductsDataDTO } from '../dtos/MyProductsDTO';
import { USER_ADS_STORAGE } from '../storage/storageConfig';

// Defina as propriedades do contexto
interface UserAdsContextProps {
  ads: MyProductsDataDTO | null;
  isLoading: boolean;
  fetchUserAds: () => Promise<void>;
}

// Crie o contexto
export const UserAdsContext = createContext<UserAdsContextProps>({} as UserAdsContextProps);

interface UserAdsProviderProps {
  children: ReactNode;
}

// Crie o provedor do contexto
export const UserAdsProvider = ({ children }: UserAdsProviderProps) => {
  const [ads, setAds] = useState<MyProductsDataDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserAds = async () => {
    try {
      const response = await api.get('users/products');
      const adsData: MyProductsDataDTO = response.data;
      setAds(adsData);
      await AsyncStorage.setItem(USER_ADS_STORAGE, JSON.stringify(adsData));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadAds = async () => {
    try {
      const storedAds = await AsyncStorage.getItem(USER_ADS_STORAGE);
      if (storedAds) {
        setAds(JSON.parse(storedAds));
      } else {
        await fetchUserAds();
      }
    } catch (error) {
      console.error(error);
      await fetchUserAds();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <UserAdsContext.Provider value={{ ads, isLoading, fetchUserAds }}>
      {children}
    </UserAdsContext.Provider>
  );
};

// Hook para usar o contexto
export const useUserAds = () => useContext(UserAdsContext);
