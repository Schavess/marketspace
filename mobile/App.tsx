import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/theme/';

import { Routes } from './src/routes';

import { AuthContextProvider } from '@contexts/AuthContext';
import { UserAdsProvider } from '@contexts/AdsUserProvider';

import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <UserAdsProvider>
          {fontsLoaded ?
            <Routes /> : <></>}
        </UserAdsProvider>
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
