import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { useTheme, Box } from 'native-base';

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";

export function Routes() {

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const isAuthenticated = true;

  return (
    <Box flex={1} bg="white">
      <NavigationContainer theme={theme}>
        {isAuthenticated ?
          <AppRoutes /> : <AuthRoutes />
        }
      </NavigationContainer>
    </Box>
  );

}