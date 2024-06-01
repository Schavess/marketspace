import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BottomRoutes } from './bottom.routes';
import { AdDetail } from '@screens/AdDetail';
import { MyAdDetail } from '@screens/MyAdDetail';
import { AdEdition } from '@screens/AdEdition';
import { AdCreation } from '@screens/AdCreation';
import { PreAdVisualization } from '@screens/PreAdVisualization';


type AppRoutes = {
  app: undefined;
  addetail: undefined;
  myaddetail: undefined;
  adedition: undefined;
  adcreation: undefined;
  preadvisualization: {
    name: string;
    description: string;
    price: number;
    isNew: string;
    accept_trade: string;
    paymentMethods: string;
    selectedImages: string[];
  };
}
const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="app">
      <Screen name="app" component={BottomRoutes} />
      <Screen name="addetail" component={AdDetail} />
      <Screen name="myaddetail" component={MyAdDetail} />
      <Screen name="adedition" component={AdEdition} />
      <Screen name="adcreation" component={AdCreation} />
      <Screen name="preadvisualization" component={PreAdVisualization} />
    </Navigator>

  );
}