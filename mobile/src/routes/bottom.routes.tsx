import { Platform, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { THEME } from '../theme';

import HomeSvg from '@assets/HomeIcon.svg';
import GetOutIcon from '@assets/GetOutIcon.svg';
import AdsIcon from '@assets/AdsIcon.svg';
import { Box } from 'native-base';

import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';

import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';
import { CustomAlert } from '@components/CustomAlert';

type AppRoutes = {
  home: undefined;
  myAds: undefined;
  getOut: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function BottomRoutes() {

  const [alertVisible, setAlertVisible] = useState(false);
  const { signOut } = useAuth();
  const { colors } = THEME;

  const handleSignOut = () => {
    setAlertVisible(true);
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  const handleConfirm = () => {
    setAlertVisible(false);
    signOut();
  };

  return (
    <Box bg="gray.700" h={'100%'}>
      <Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.gray[200],
          tabBarInactiveTintColor: colors.gray[400],
          tabBarStyle: {
            backgroundColor: colors.gray[600],
            borderTopWidth: 0,
            height: Platform.OS === "android" ? 'auto' : 96,
            paddingBottom: 30,
            paddingTop: 30
          },

        }}
      >
        <Screen
          name="home"
          component={Home}
          options={{
            tabBarIcon: ({ color, }) => (
              <HomeSvg fill={color} width={30} height={30} />
            )
          }}
        />
        <Screen
          name="myAds"
          component={MyAds}
          options={{
            tabBarIcon: ({ color }) => (
              <AdsIcon fill={color} width={30} height={30} />
            )
          }}
        />
        <Screen
          name="getOut"
          options={{
            tabBarIcon: () => (
              <GetOutIcon fill={colors.red_light} width={30} height={30} />
            ),
            tabBarButton: (props) => (
              <TouchableOpacity {...props} onPress={handleSignOut} />
            ),
          }}
        >
          {() => null}
        </Screen>
      </Navigator>
      <CustomAlert
        visible={alertVisible}
        title="Confirmar Saída"
        message="Você tem certeza que deseja sair?"
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        textConfirm={'Sim, sair.'}
      />
    </Box>
  );
}