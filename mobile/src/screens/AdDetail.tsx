import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { VStack, View } from 'native-base';
import { ArrowLeft } from 'phosphor-react-native';

import { MyCarousel } from '@components/MyCarousel'

import { useNavigation } from '@react-navigation/native';


const CARROUSEL_DATA = [
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg', title: 'Photo 1' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-03-768x768.jpg', title: 'Photo 2' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-07-768x768.jpg', title: 'Photo 3' },
  // Adicione mais itens conforme necessário
];

const ImageUrl = 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg';



export function AdDetail() {

  const navigation = useNavigation();

  function HandleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1} w={'full'} mt={10} alignSelf={'center'} alignItems={'center'} >
      <View w={'85%'} mt={5} >
        <TouchableOpacity onPress={HandleGoBack}>
          <ArrowLeft size={30} />
        </TouchableOpacity>
      </View>
      <SafeAreaView>
        <MyCarousel data={CARROUSEL_DATA} />
      </SafeAreaView>
    </VStack>
  );
}
