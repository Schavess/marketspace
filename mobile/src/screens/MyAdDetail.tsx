import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { HStack, VStack, View, Text, Image, Badge, Button as NBButton, Box, Center } from 'native-base';
import { ArrowLeft, Pencil, Money, QrCode, Barcode, CreditCard, Bank, Power, Trash } from 'phosphor-react-native';

import { MyCarousel } from '@components/MyCarousel'

import { useNavigation, useRoute } from '@react-navigation/native';

import { CustomAlert } from '@components/CustomAlert';

import { ItemData } from '../@types/interfaces';

import { api } from '@services/api';
import { Avatar } from '@assets/Avatar.png';

const paymentIcons: { [key: string]: JSX.Element } = {
  'Boleto': <Barcode size={16} />,
  'Pix': <QrCode size={16} />,
  'Dinheiro': <Money size={16} />,
  'Cartão de Crédito': <CreditCard size={16} />,
  'Depósito Bancário': <Bank size={16} />,
};

const CARROUSEL_DATA = [
  { path: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg', id: 'Photo 1' },
  { path: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-03-768x768.jpg', id: 'Photo 2' },
];

export function MyAdDetail() {

  const [alertVisible, setAlertVisible] = useState(false);
  const navigation = useNavigation<any>();
  const [isAdActive, setAdActive] = useState(true);

  const route = useRoute<any>();
  const {
    item_id,
  } = route.params;

  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [imageData, setImageData] = useState<ImageData | any>(null);

  const fetchItemData = async () => {
    const response = await api.get(`/products/${item_id}`);

    setItemData(response.data);
    setImageData(response.data.product_images);
  }

  async function handleAddIsActive() {
    const response = await api.put(`/products/${item_id}`, {
      "is_active": !isAdActive,
    });

    if (response.status === 204) {
      setAdActive(!isAdActive);
    }
  }

  function handleDelete() {
    setAlertVisible(true);
  }

  const handleConfirm = async () => {
    // Handle the confirm action
    const response = await api.delete(`/products/${item_id}`);
    if (response.status === 204) {
      setAlertVisible(false);
      navigation.navigate('home');
    }
  };

  const handleCancel = () => {
    // Handle the cancel action
    setAlertVisible(false);
  };

  function HandleGoBack() {
    navigation.goBack();
  }
  function HandleGoEdit() {
    navigation.navigate('adedition', { item_id, itemData });
  }

  useEffect(() => {
    fetchItemData();
  }, []);

  return (

    <VStack flex={1} w={'full'} mt={5} alignSelf={'center'} alignItems={'center'} >
      <View w={'90%'} mt={5} >
        <HStack>
          <TouchableOpacity style={{ flex: 1 }} onPress={HandleGoBack}>
            <ArrowLeft size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={HandleGoEdit}>
            <Pencil size={30} />
          </TouchableOpacity>
        </HStack>
      </View>
      <SafeAreaView style={{ width: '100%', alignItems: 'center' }}>
        <MyCarousel data={imageData ? imageData : CARROUSEL_DATA} />
        {!isAdActive && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={2}
            bg="black"
            opacity={0.5}
          >
            <Center flex={1}>
              <Text fontFamily={'heading'} fontSize={'lg'} color={'white'}>ANÚNCIO DESATIVADO</Text>
            </Center>
          </Box>
        )}

      </SafeAreaView>

      <ScrollView contentContainerStyle={{
        flexGrow: 1,
        width: '100%',
      }} showsVerticalScrollIndicator={false}>
        <Center>


          <HStack w={'85%'} alignItems={'center'}>
            <Image
              source={itemData?.user.avatar ? { uri: `${api.defaults.baseURL}/images/${itemData?.user.avatar}` } : Avatar}
              alt='Avatar image'
              width={'35px'}
              height={'35px'}
              borderRadius={'35px'}
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
            <Text flex={1} fontSize={'xl'} fontFamily={'heading'}>{itemData?.name}</Text>
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
          <VStack py={7} px={5} flex={1} w={'100%'} bg={'white'} alignItems={'center'}>

            {isAdActive ?
              <HStack flex={1} justifyContent={'center'}>
                <NBButton
                  w={'100%'}
                  bg={'gray.200'}
                  _pressed={{
                    bg: 'gray.100'
                  }}
                  onPress={handleAddIsActive}
                >
                  <HStack alignItems={'flex-end'}>
                    <Power color={'white'} size={25} />
                    <Text pl={2} color={'white'} fontSize={'md'} fontFamily={'heading'}>Desativar anúncio</Text>
                  </HStack>
                </NBButton>
              </HStack>
              :
              <HStack flex={1} justifyContent={'center'}>
                <NBButton
                  w={'100%'}
                  bg={'blue_light'}
                  _pressed={{
                    bg: 'blue'
                  }}
                  onPress={handleAddIsActive}
                >
                  <HStack alignItems={'flex-end'}>
                    <Power color={'white'} size={25} />
                    <Text pl={2} color={'white'} fontSize={'md'} fontFamily={'heading'}>Reativar anúncio</Text>
                  </HStack>
                </NBButton>
              </HStack>
            }


            <HStack flex={1} justifyContent={'center'}>
              <NBButton
                my={2}
                w={'100%'}
                bg={'gray.500'}
                _pressed={{
                  bg: 'gray.400'
                }}
                onPress={handleDelete}
              >
                <HStack alignItems={'flex-end'}>
                  <Trash color={'black'} size={25} />
                  <Text pl={2} color={'black'} fontSize={'md'} fontFamily={'heading'}>Excluir anúncio</Text>
                </HStack>
              </NBButton>
            </HStack>

          </VStack>
        </Center>
      </ScrollView>
      <CustomAlert
        visible={alertVisible}
        title="Deseja realmente excluir este anúncio?"
        message=""
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </VStack>


  );
}
