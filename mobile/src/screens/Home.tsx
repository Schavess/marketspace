import React, { useState, useCallback } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';

import { VStack, Text, HStack, Image, Input, Button as NBButton } from 'native-base';
import { THEME } from '../theme';
import { Plus, TagSimple, ArrowRight, MagnifyingGlass, Sliders } from 'phosphor-react-native';
import defaulUserPhotoImg from '../assets/Avatar.png';
import { Button } from '@components/Button';
import { Item } from '@components/Item';
import { FilterModalPure } from '@components/FilterModalPure';

const DATA = [
  {
    id: '1',
    imageUrl: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg',
    userAvatar: 'https://avatars.githubusercontent.com/u/39462847?v=4',
    is_new: true,
    name: 'Tênis vermelho 1',
    price: '59,90',
    is_active: true,
  },
  {
    id: '2',
    imageUrl: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg',
    userAvatar: 'https://avatars.githubusercontent.com/u/39462847?v=4',
    is_new: false,
    name: 'Tênis vermelho 2',
    price: '59,90',
    is_active: true,
  },
  {
    id: '3',
    imageUrl: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg',
    userAvatar: 'https://avatars.githubusercontent.com/u/39462847?v=4',
    is_new: false,
    name: 'Tênis vermelho 3',
    price: '59,90',
    is_active: true,
  },
  {
    id: '4',
    imageUrl: 'https://scalcados.com.br/wp-content/uploads/2022/02/tenis-capricho-cano-alto-vermelho-01-768x768.jpg',
    userAvatar: 'https://avatars.githubusercontent.com/u/39462847?v=4',
    is_new: false,
    name: 'Tênis vermelho 4',
    price: '59,90',
    is_active: false,
  },
  // Adicione mais itens conforme necessário
];

export function Home() {

  const { user } = useAuth();

  console.log(user);

  const navigation = useNavigation<any>();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);

  function handleNavigateToMyAdds() {
    navigation.navigate('myAds')
  }
  function handleNavigateToAdCreation() {
    navigation.navigate('adcreation')
  }

  const renderHeader = () => (
    <VStack w={'100%'} >
      <HStack pt={'80px'} justifyContent={'space-between'}>
        <Image
          source={
            user.avatar
              ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` }
              : defaulUserPhotoImg
          }
          alt='Avatar image'
          width={50}
          height={50}
          borderRadius={50}
        />
        <VStack ml={2}>
          <Text fontSize={'md'}>Boas vindas,</Text>
          <Text fontSize={'lg'} fontFamily={'heading'}>{user.name}!</Text>
        </VStack>
        <VStack flex={1} alignItems={'flex-end'}>
          <Button
            title="Criar anúncio"
            color='gray.100'
            textColor='white'
            w={'150px'}
            borderRadius={5}
            icon={<Plus color='white' size={20} />}
            _pressed={{
              bg: THEME.colors.gray[500]
            }}
            onPress={handleNavigateToAdCreation}
          />
        </VStack>
      </HStack>
      <Text w={'85%'} textAlign={'left'} pt={10} pb={5} fontSize={'md'}>Seus produtos anunciados para venda</Text>
      <TouchableOpacity onPress={handleNavigateToMyAdds} style={{ width: "85%", height: 65, justifyContent: 'center', backgroundColor: THEME.colors.blue_flash }}>
        <HStack w={'full'}>
          <TagSimple color={THEME.colors.blue_light} size={30} style={{ transform: [{ rotate: '225deg' }], alignSelf: 'center' }} />
          <VStack px={4}>
            <Text fontSize={'xl'} fontFamily={'heading'}>4</Text>
            <Text>anúncios ativos</Text>
          </VStack>
          <HStack p={4} flex={1} justifyContent={'flex-end'} alignSelf={'center'}>
            <Text color={'blue_light'} fontFamily={'heading'}>Meus anúncios</Text>
            <ArrowRight color={THEME.colors.blue_light} />
          </HStack>
        </HStack>
      </TouchableOpacity>
      <Text w={'85%'} textAlign={'left'} pt={10} pb={5} fontSize={'md'}>Compre produtos variados</Text>
      <HStack backgroundColor={'white'} w={'85%'} alignItems={'center'} justifyContent={'space-between'} overflow={'hidden'} mb={2}>
        <Input
          placeholder="Buscar anúncio"
          keyboardType="default"
          autoCapitalize="none"
          w={'50%'}
          borderColor={'white'}
          placeholderTextColor={'gray.300'}
          fontSize={'md'}
          fontFamily={'body'}
          flex={1}
          _focus={{
            bg: THEME.colors.gray[600],
            borderWidth: 1,
            borderColor: 'blue_light'
          }}
        />
        <NBButton
          bg={'white'}
          _pressed={{
            bg: THEME.colors.gray[500]
          }}
        >
          <MagnifyingGlass color={'black'} size={25} />
        </NBButton>
        <Text color={'gray.500'} fontFamily={'body'} fontSize={'xl'}>|</Text>
        <NBButton
          bg={'white'}
          _pressed={{
            bg: THEME.colors.gray[500],

          }}
          onPress={openModal}
        >
          <Sliders color={'black'} size={25} />
        </NBButton>
      </HStack>
    </VStack >
  );



  return (
    <>

      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            imageUrl={item.imageUrl}
            userAvatar={item.userAvatar}
            is_new={item.is_new}
            name={item.name}
            price={item.price}
            is_active
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
        }}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        ListHeaderComponent={renderHeader}
      />
      <FilterModalPure visible={isModalVisible} onClose={closeModal} />
    </>
  );
}
