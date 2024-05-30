import { TouchableOpacity, FlatList } from 'react-native';
import { VStack, Text, HStack, Center } from 'native-base'
import { Item } from '@components/Item';
import { CustomSelect } from '@components/CustomSelect';
import { Plus } from 'phosphor-react-native';
import { useState } from 'react';

import { useNavigation } from '@react-navigation/native';

const options = [
  { label: 'Todos', value: 'todos' },
  { label: 'Novos', value: 'new' },
  { label: 'Usados', value: 'old' },
  { label: 'Ativos', value: 'active' },
  { label: 'Desativados', value: 'inactive' },
];

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


export function MyAds() {

  const navigation = useNavigation<any>();

  const [service, setService] = useState("todos");

  const getFilteredAds = () => {
    return DATA.filter(data => {
      if (service === 'todos') {
        return true;
      } else if (service === 'new') {
        return data.is_new;
      } else if (service === 'old') {
        return !data.is_new;
      } else if (service === 'active') {
        return data.is_active;
      } else if (service === 'inactive') {
        return !data.is_active;
      } else {
        return false;
      }
    });
  };

  const filteredAds = getFilteredAds();

  function handleNavigateToCreateAd() {
    navigation.navigate('adcreation');
  }

  return (
    <>
      <VStack>
        <Center pt={'65px'}>
          <HStack w={'full'} >
            <Text w={'65%'} textAlign={'right'} fontSize={'lg'} fontFamily={'heading'}>Meus anúncios</Text>
            <TouchableOpacity
              style={{
                width: '30%',
                justifyContent: 'center',
                paddingRight: '5%',
                alignItems: 'flex-end',
              }}
              onPress={handleNavigateToCreateAd}
            >
              <Plus size={25} />
            </TouchableOpacity>
          </HStack>
        </Center>

        <Center pt={'25px'}>
          <HStack w={'85%'} justifyContent={'center'} alignItems={'center'}>
            <Text fontSize={'md'} flex={1}>{filteredAds.length} anúncios</Text>
            <CustomSelect service={service} setService={setService} options={options} />
          </HStack>
        </Center>

        <FlatList
          data={filteredAds}
          renderItem={({ item }) => (
            <Item
              imageUrl={item.imageUrl}
              userAvatar={item.userAvatar}
              is_new={item.is_new}
              is_active={item.is_active}
              name={item.name}
              price={item.price}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
          }}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: 10,
          }}
        // ListHeaderComponent={renderHeader}
        />
      </VStack >
    </>
  )
}