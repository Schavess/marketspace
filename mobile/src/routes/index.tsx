import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useTheme, Box } from 'native-base';

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { Loading } from '@components/Loading';

import { useAuth } from '@hooks/useAuth';

export function Routes() {

  const { colors } = useTheme();
  const { user, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <Box flex={1} bg="white">
      <StatusBar
        barStyle="dark-content" // Define o estilo do texto e ícones para claro
        backgroundColor={'white'} // Define a cor de fundo da barra de status
      />
      <SafeAreaView style={{ flex: 1 }}>

        <NavigationContainer theme={theme}>
          {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </SafeAreaView>
    </Box>
  );

}