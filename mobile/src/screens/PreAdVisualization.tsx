import React, { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';

import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { HStack, VStack, View, Text, Image, Badge, Button as NBButton, Center } from 'native-base';
import { Money, QrCode, Barcode, CreditCard, Bank } from 'phosphor-react-native';

import { MyCarousel } from '@components/MyCarousel';
import { Loading } from '@components/Loading';
import { THEME } from '../theme';
import defaulUserPhotoImg from '../assets/Avatar.png';

const paymentIcons: { [key: string]: JSX.Element } = {
  'boleto': <Barcode size={16} />,
  'pix': <QrCode size={16} />,
  'cash': <Money size={16} />,
  'card': <CreditCard size={16} />,
  'deposit': <Bank size={16} />,
};

const paymentMethodsNames: { [key: string]: string } = {
  'boleto': 'Boleto',
  'pix': 'Pix',
  'cash': 'Dinheiro',
  'card': 'Cartão de  Crédtio',
  'deposit': 'Depósito Bancário',
};

const CARROUSEL_DATA = [
  { path: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg', id: 'Photo 1' },
  { path: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-03-768x768.jpg', id: 'Photo 2' },
];


export function PreAdVisualization() {

  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    name,
    description,
    price,
    isNew,
    accept_trade,
    paymentMethods,
    selectedImages
  } = route.params;

  const paymentMethodsSelected = Object.entries(paymentMethods)
    .filter(([key, value]) => value === true)
    .map(([key, value]) => key);

  const [carouselData, setCarouselData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createCarouselData = (filePaths: any) => {
      return filePaths.map((filePath: string, index: number) => {
        return {
          path: filePath,
          id: `Photo ${index + 1}`
        };
      });
    };

    setCarouselData(createCarouselData(selectedImages));
  }, [selectedImages]);

  function HandleGoBack() {
    navigation.goBack();
  }

  async function handlePublishAd() {

    setIsLoading(true);

    const product = {
      name,
      description,
      price: parseFloat(price),
      is_new: isNew == 'new',
      accept_trade,
      payment_methods: Object.entries(paymentMethods)
        .filter(([key, value]) => value === true)
        .map(([key, value]) => key),
    }

    let response = await api.post('/products', product);

    const product_id = response.data.id;

    try {
      const formData = new FormData();
      formData.append('product_id', product_id);

      const images = await Promise.all(
        selectedImages.map(async (image: string) => {
          const fileInfo = await FileSystem.getInfoAsync(image);
          const fileName = fileInfo.uri.split('/').pop();
          const fileType = fileInfo.uri.split('.').pop();

          return {
            uri: fileInfo.uri,
            name: fileName,
            type: `image/${fileType}`,
          };
        })
      );

      images.forEach((image) => {
        formData.append('images', image);
      });

      let response = await api.post('/products/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsLoading(false);

      navigation.navigate('home');

    } catch (error) {
      console.log(error);

    }

  }

  return (

    <VStack flex={1} w={'full'} alignSelf={'center'} alignItems={'center'} >
      <VStack w={'100%'} bg={'blue_light'} h={'120px'} justifyContent={'flex-end'}>
        <Center my={2}>
          <Text color={'gray.700'} fontSize={'md'} fontFamily={'heading'}>Pré Visualização do anúncio</Text>
          <Text color={'gray.700'} fontSize={'md'}>É assim que seu anúncio vai aparecer</Text>
        </Center>
      </VStack>
      <SafeAreaView style={{ width: '100%', alignItems: 'center' }}>
        <MyCarousel data={carouselData ? carouselData : CARROUSEL_DATA} notPublished />
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack w={'100%'} alignItems={'center'} >
          <HStack w={'85%'} alignItems={'center'}>
            <Image
              source={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : { uri: defaulUserPhotoImg }}
              alt='Avatar image'
              width={'35px'}
              height={'35px'}
              borderRadius={'35px'}
            />
            <Text pl={3} fontSize={'md'} fontFamily={'body'}>{user.name}</Text>
          </HStack>
          <HStack w={'85%'} pt={2}>
            <Badge
              backgroundColor={'gray.500'}
              borderRadius={5}
              alignSelf={'flex-start'}
            >
              <Text fontSize={'sm'} fontFamily={'heading'}>{isNew ? 'NOVO' : 'USADO'}</Text>
            </Badge>
          </HStack>
          <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
            <Text flex={1} fontSize={'xl'} fontFamily={'heading'}>{name}</Text>
            <Text color={'blue_light'} fontSize={'md'} fontFamily={'heading'}>R$</Text>
            <Text pl={2} color={'blue_light'} fontSize={'lg'} fontFamily={'heading'}>{price}</Text>
          </HStack>
          <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
            <Text flex={1} fontSize={'sm'} fontFamily={'body'} textAlign={'justify'}>
              {description}
            </Text>
          </HStack>
          <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
            <Text fontSize={'md'} fontFamily={'heading'}>
              Aceita troca?
            </Text>
            <Text ml={2} fontSize={'sm'} fontFamily={'body'} >
              {accept_trade ? 'Sim' : 'Não'}
            </Text>
          </HStack>
          <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
            <Text fontSize={'md'} fontFamily={'heading'} >
              Meios de pagamento:
            </Text>
          </HStack>
          <VStack w={'85%'}>
            {paymentMethodsSelected && paymentMethodsSelected.map(method => {
              const icon = paymentIcons[method];
              const names = paymentMethodsNames[method];
              return (
                <React.Fragment key={method}>
                  {icon ? (
                    <HStack alignItems={'center'}>
                      {icon}
                      <Text fontSize={'md'} fontFamily={'body'} pl={2}>
                        {names}
                      </Text>
                    </HStack>
                  ) : (
                    <HStack alignItems={'center'}>
                      <Text fontSize={'md'} fontFamily={'body'} pl={2}>
                        {method} - Icone não encontrado
                      </Text>
                    </HStack>
                  )}
                </React.Fragment>
              );
            })}
          </VStack>
          <HStack py={7} px={5} flex={1} w={'100%'} bg={'white'} alignItems={'center'}>
            <View style={{
              paddingVertical: 15,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              backgroundColor: 'white',
              paddingHorizontal: 20,
            }} >
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 56,
                  justifyContent: 'center',
                  padding: 10,
                  marginHorizontal: 5,
                  backgroundColor: THEME.colors.gray[500],
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={HandleGoBack}>
                <Text fontFamily={'heading'}>Voltar e editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  height: 56,
                  justifyContent: 'center',
                  padding: 10,
                  marginHorizontal: 5,
                  backgroundColor: THEME.colors.blue_light,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={handlePublishAd}>
                {isLoading ?
                  <>
                    < Loading />
                  </> :
                  <>
                    <Text fontFamily={'heading'} color={'white'}>Publicar</Text>
                  </>}
              </TouchableOpacity>
            </View>

          </HStack>

        </VStack>
      </ScrollView >
    </VStack>
  );
}
