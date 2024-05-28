import React from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { HStack, VStack, View, Text, Image, Badge, Button as NBButton } from 'native-base';
import { ArrowLeft, Money, WhatsappLogo, QrCode, Barcode, CreditCard, Bank } from 'phosphor-react-native';

import { MyCarousel } from '@components/MyCarousel'

import { useNavigation } from '@react-navigation/native';

import avatar from '@assets/Avatar.png';


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

  function HandleGoBack() {
    navigation.goBack();
  }

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
            source={avatar}
            alt='Avatar image'
            width={'35px'}
            height={'35px'}
          />
          <Text pl={3} fontSize={'md'} fontFamily={'body'}>Nome do Dono do anúncio</Text>
        </HStack>
        <HStack w={'85%'} pt={2}>
          <Badge
            backgroundColor={'gray.500'}
            borderRadius={5}
            alignSelf={'flex-start'}
          >
            <Text fontSize={'sm'} fontFamily={'heading'}>NOVO</Text>
          </Badge>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text flex={1} fontSize={'xl'} fontFamily={'heading'}>Tênis</Text>
          <Text color={'blue_light'} fontSize={'md'} fontFamily={'heading'}>R$</Text>
          <Text pl={2} color={'blue_light'} fontSize={'lg'} fontFamily={'heading'}>120,00</Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text flex={1} fontSize={'sm'} fontFamily={'body'} textAlign={'justify'}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis nibh enim, eu vehicula dolor.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur iaculis nibh enim, eu vehicula dolor.
          </Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text fontSize={'md'} fontFamily={'heading'}>
            Aceita troca?
          </Text>
          <Text ml={2} fontSize={'sm'} fontFamily={'body'} >
            Sim
          </Text>
        </HStack>
        <HStack w={'85%'} pt={2} alignItems={'flex-end'}>
          <Text fontSize={'md'} fontFamily={'heading'} >
            Meios de pagamento:
          </Text>
        </HStack>
        <VStack w={'85%'}>

          <HStack alignItems={'center'}>
            <Barcode size={16} />
            <Text fontSize={'md'} fontFamily={'body'} pl={2}>
              Boleto
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <QrCode size={16} />
            <Text fontSize={'md'} fontFamily={'body'} pl={2}>
              PIX
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Money size={16} />
            <Text fontSize={'md'} fontFamily={'body'} pl={2}>
              Dinheiro
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <CreditCard size={16} />
            <Text fontSize={'md'} fontFamily={'body'} pl={2}>
              Cartão de Crédito
            </Text>
          </HStack>
          <HStack alignItems={'center'}>
            <Bank size={16} />
            <Text fontSize={'md'} fontFamily={'body'} pl={2}>
              Depósito Bancário
            </Text>
          </HStack>
        </VStack>
        <HStack py={7} px={5} flex={1} w={'100%'} bg={'white'} alignItems={'center'}>
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
