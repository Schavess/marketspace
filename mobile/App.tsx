import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NativeBaseProvider } from 'native-base';
import { THEME } from './src/theme/';

import { Routes } from './src/routes';

import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ?
        <Routes /> : <></>}
    </NativeBaseProvider>
  );
}
