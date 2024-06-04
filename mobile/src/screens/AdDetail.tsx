import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { HStack, VStack, View, Text, Image, Badge, Button as NBButton } from 'native-base';
import { ArrowLeft, Money, WhatsappLogo, QrCode, Barcode, CreditCard, Bank } from 'phosphor-react-native';

import { MyCarousel } from '@components/MyCarousel'

import { useNavigation, useRoute } from '@react-navigation/native';

import { api } from '@services/api';

import { Avatar } from '@assets/Avatar.png'

interface PaymentMethod {
  key: string;
  name: string;
}

interface ProductImage {
  id: string;
  path: string;
}
interface User {
  avatar: string;
  name: string;
  tel: string;
}

interface ItemData {
  accept_trade: boolean;
  created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  payment_methods: PaymentMethod[];
  price: number;
  product_images: ProductImage[];
  updated_at: string;
  user: User;
  user_id: string;
}

const paymentIcons: { [key: string]: JSX.Element } = {
  'Boleto': <Barcode size={16} />,
  'Pix': <QrCode size={16} />,
  'Dinheiro': <Money size={16} />,
  'Cartão de Crédito': <CreditCard size={16} />,
  'Depósito Bancário': <Bank size={16} />,
};

const CARROUSEL_DATA = [
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg', title: 'Photo 1' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-03-768x768.jpg', title: 'Photo 2' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-07-768x768.jpg', title: 'Photo 3' },
  // Adicione mais itens conforme necessário
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg', title: 'Photo 4' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-03-768x768.jpg', title: 'Photo 5' },
  { thumbnail: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-07-768x768.jpg', title: 'Photo 6' },
  // Adicione mais itens conforme necessário
];

export function AdDetail() {

  const navigation = useNavigation();

  const route = useRoute<any>();

  const {
    item_id,
  } = route.params;

  const [itemData, setItemData] = useState<ItemData | null>(null);

  const fetchItemData = async () => {
    const response = await api.get(`/products/${item_id}`);

    setItemData(response.data);
    console.log(response.data);
  }

  console.log(itemData?.user.avatar);

  function HandleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack flex={1} w={'full'} mt={5} alignSelf={'center'} alignItems={'center'} >
        <View w={'90%'} mt={5} >
          <TouchableOpacity onPress={HandleGoBack}>
            <ArrowLeft size={30} />
          </TouchableOpacity>
        </View>
        <SafeAreaView style={{ width: '100%', alignItems: 'center' }}>
          <MyCarousel data={CARROUSEL_DATA} />
        </SafeAreaView>
        <HStack w={'85%'} alignItems={'center'}>
          <Image
            source={itemData?.user.avatar ? { uri: `${api.defaults.baseURL}/images/${itemData?.user.avatar}` } : Avatar}
            alt='Avatar image'
            width={'35px'}
            height={'35px'}
          />
          <Text pl={3} fontSize={'md'} fontFamily={'body'}>{itemData?.user.name}</Text>
        </HStack>
        <HStack w={'85%'} pt={2}>
          <Badge
            backgroundColor={'gray.500'}
            borderRadius={5}
            alignSelf={'flex-start'}
          >
            <Text fontSize={'sm'} fontFamily={'heading'}>{itemData?.is_new ? 'NOVO' : 'USADO'}</Text>
          </Badge>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text flex={1} fontSize={'xl'} fontFamily={'heading'}>Tênis</Text>
          <Text color={'blue_light'} fontSize={'md'} fontFamily={'heading'}>R$</Text>
          <Text pl={2} color={'blue_light'} fontSize={'lg'} fontFamily={'heading'}>{itemData?.price}</Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text flex={1} fontSize={'sm'} fontFamily={'body'} textAlign={'justify'}>
            {itemData?.description}
          </Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text fontSize={'md'} fontFamily={'heading'}>
            Aceita troca?
          </Text>
          <Text ml={2} fontSize={'sm'} fontFamily={'body'} >
            {itemData?.accept_trade ? 'Sim' : 'Não'}
          </Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text fontSize={'md'} fontFamily={'heading'} >
            Meios de pagamento:
          </Text>
        </HStack>
        <VStack w={'85%'}>
          {itemData && itemData.payment_methods && itemData.payment_methods.map(method => {
            const icon = paymentIcons[method.name];
            return (
              <React.Fragment key={method.key}>
                {icon ? (
                  <HStack alignItems={'center'}>
                    {icon}
                    <Text fontSize={'md'} fontFamily={'body'} pl={2}>
                      {method.name}
                    </Text>
                  </HStack>
                ) : (
                  <HStack alignItems={'center'}>
                    <Text fontSize={'md'} fontFamily={'body'} pl={2}>
                      {method.name} - Icone não encontrado
                    </Text>
                  </HStack>
                )}
              </React.Fragment>
            );
          })}
        </VStack>
        <HStack position={'absolute'}
          bottom={0}
          left={0}
          right={0}
          py={7}
          px={5}
          w={'100%'}
          bg={'white'}
          alignItems={'center'}>
          <HStack alignItems={'flex-end'}>
            <Text pl={2} color={'blue_light'} fontSize={'md'} fontFamily={'heading'}>R$</Text>
            <Text color={'blue_light'} fontSize={'xl'} fontFamily={'heading'}>120,00</Text>
          </HStack>
          <HStack flex={1} justifyContent={'flex-end'}>
            <NBButton

              bg={'blue_light'}
              _pressed={{
                bg: 'blue'
              }}
            >
              <HStack alignItems={'flex-end'}>
                <WhatsappLogo color={'white'} size={25} />
                <Text pl={2} color={'white'} fontSize={'md'} fontFamily={'heading'}>Entrar em contato</Text>
              </HStack>
            </NBButton>
          </HStack>

        </HStack>


      </VStack>
    </ScrollView>
  );
}
