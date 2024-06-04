import { TouchableOpacity, FlatList } from 'react-native';
import { VStack, Text, HStack, Center } from 'native-base';
import { Item } from '@components/Item';
import { CustomSelect } from '@components/CustomSelect';
import { Plus } from 'phosphor-react-native';
import { useState } from 'react';

import { api } from '@services/api';
import { useNavigation } from '@react-navigation/native';

const options = [
  { label: 'Todos', value: 'todos' },
  { label: 'Novos', value: 'new' },
  { label: 'Usados', value: 'old' },
  { label: 'Ativos', value: 'active' },
  { label: 'Desativados', value: 'inactive' },
];

import { useUserAds } from '@contexts/AdsUserProvider';
import { useAuth } from '@hooks/useAuth';

import { MyProductsDataDTO, MyProductsDTO } from '@dtos/MyProductsDTO';

export function MyAds() {
  const { user } = useAuth();
  const { ads } = useUserAds();
  const navigation = useNavigation<any>();

  const [service, setService] = useState("todos");

  const getFilteredAds = (): any => {
    if (!ads) return [];
    return ads.filter(data => {
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

  const filteredAds: MyProductsDataDTO = getFilteredAds();

  function handleNavigateToCreateAd() {
    navigation.navigate('adcreation');
  }

  return (
    <VStack>
      <Center pt={'65px'}>
        <HStack w={'full'}>
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
            item_id={item.id}
            isMineAd={true}
            product_images={item.product_images}
            userAvatar={`${api.defaults.baseURL}/images/${user.avatar}`}
            is_new={item.is_new}
            is_active={item.is_active}
            name={item.name}
            price={item.price}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{}}
        contentContainerStyle={{
          alignItems: 'center',
          paddingTop: 10,
        }}
      />
    </VStack>
  );
}
