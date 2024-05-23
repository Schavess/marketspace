import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomRoutes } from './bottom.routes';
import { AddDetail } from '@screens/AdDetail';

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="app" component={BottomRoutes} />
      <Screen name="adDetail" component={AddDetail} />
    </Navigator>

  );
}