// src/storage/storageUserAds.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MyProductsDataDTO } from '@dtos/MyProductsDTO';
import { USER_ADS_STORAGE } from '@storage/storageConfig';

export async function storageUserAdsSave(myproducts: MyProductsDataDTO) {
  await AsyncStorage.setItem(USER_ADS_STORAGE, JSON.stringify(myproducts));
}

export async function storageUserAdsGet() {
  const storage = await AsyncStorage.getItem(USER_ADS_STORAGE);
  return storage ? JSON.parse(storage) as MyProductsDataDTO : null;
}

export async function storageUserAdsRemove() {
  await AsyncStorage.removeItem(USER_ADS_STORAGE);
}
