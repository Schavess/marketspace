import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { useAuth } from '@hooks/useAuth';
import { useIsFocused } from '@react-navigation/native';
import { VStack, Text, HStack, Image, Input, Button as NBButton, Center } from 'native-base';
import { THEME } from '../theme';
import { Plus, TagSimple, ArrowRight, MagnifyingGlass, Sliders } from 'phosphor-react-native';
import defaulUserPhotoImg from '../assets/Avatar.png';
import { Button } from '@components/Button';
import { Item } from '@components/Item';
import { FilterModalPure } from '@components/FilterModalPure';
import { ProductDTO } from '@dtos/ProductsDTO';
import { useUserAds } from '@contexts/AdsUserProvider';

type PaymentMethodKey = 'boleto' | 'pix' | 'cash' | 'card' | 'deposit';

type Filters = {
  condition: 'novo' | 'usado' | '';
  acceptsExchange: boolean;
  paymentMethods: Record<PaymentMethodKey, boolean>;
};

export function Home() {
  const { user } = useAuth();
  const { ads, fetchUserAds } = useUserAds();
  const navigation = useNavigation<any>();
  const isFocused = useIsFocused();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = useCallback(() => setIsModalVisible(true), []);
  const closeModal = useCallback(() => setIsModalVisible(false), []);
  const [adsData, setAdsData] = useState<ProductDTO[]>([]);
  const [filteredAdsData, setFilteredAdsData] = useState<ProductDTO[]>([]);
  const [inputSearchData, setInputSearchData] = useState('');
  const [filters, setFilters] = useState<Filters>({
    condition: 'novo',
    acceptsExchange: true,
    paymentMethods: {
      boleto: true,
      card: true,
      cash: true,
      deposit: true,
      pix: true
    }
  });

  const fetchAds = async () => {
    const response = await api.get('/products');
    setAdsData(response.data);
    setFilteredAdsData(response.data); // Initialize filteredAdsData
  };

  function handleNavigateToMyAdds() {
    navigation.navigate('myAds');
  }

  function handleNavigateToAdCreation() {
    navigation.navigate('adcreation');
  }

  const handleSearchInput = useCallback(() => {
    const filteredData = adsData.filter(data =>
      data.name.toLowerCase().includes(inputSearchData.toLowerCase())
    );
    setFilteredAdsData(filteredData);
  }, [inputSearchData, adsData]);

  const applyFilters = useCallback((filters: Filters) => {
    if (!filters) return;
    setFilters(filters);

    const filtered = adsData.filter(item => {
      const conditionMatch = filters.condition ? (filters.condition === 'novo' ? item.is_new : !item.is_new) : true;
      const exchangeMatch = filters.acceptsExchange !== undefined ? item.accept_trade === filters.acceptsExchange : true;
      const itemPaymentMethodKeys = item.payment_methods.map(method => method.key);
      const paymentMethodsMatch = filters.paymentMethods ? Object.keys(filters.paymentMethods).some(
        key => filters.paymentMethods[key as PaymentMethodKey] && itemPaymentMethodKeys.includes(key)
      ) : true;
      return conditionMatch && exchangeMatch && paymentMethodsMatch;
    });

    setFilteredAdsData(filtered);
  }, [adsData]);

  useEffect(() => {
    fetchAds();
    fetchUserAds();
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchAds();
      fetchUserAds();
    }
  }, [isFocused]);

  const renderHeader = useMemo(() => (
    <VStack w={'100%'}>
      <HStack pt={'20px'} justifyContent={'space-between'}>
        <Image
          source={user.avatar ? { uri: `${api.defaults.baseURL}/images/${user.avatar}` } : defaulUserPhotoImg}
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
            _pressed={{ bg: THEME.colors.gray[500] }}
            onPress={handleNavigateToAdCreation}
          />
        </VStack>
      </HStack>
      <Text w={'85%'} textAlign={'left'} pt={10} pb={5} fontSize={'md'}>Seus produtos anunciados para venda</Text>
      <TouchableOpacity onPress={handleNavigateToMyAdds} style={{ width: "85%", height: 65, justifyContent: 'center', backgroundColor: THEME.colors.blue_flash }}>
        <HStack w={'full'}>
          <TagSimple color={THEME.colors.blue_light} size={30} style={{ transform: [{ rotate: '225deg' }], alignSelf: 'center' }} />
          <VStack px={4}>
            <Text fontSize={'xl'} fontFamily={'heading'}>{ads ? ads.length : 0}</Text>
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
          _focus={{ bg: THEME.colors.gray[600], borderWidth: 1, borderColor: 'blue_light' }}
          value={inputSearchData}
          onChangeText={text => setInputSearchData(text)}
          onSubmitEditing={handleSearchInput}
        />
        <NBButton
          bg={'white'}
          _pressed={{ bg: THEME.colors.gray[500] }}
          onPress={handleSearchInput}
        >
          <MagnifyingGlass color={'black'} size={25} />
        </NBButton>
        <Text color={'gray.500'} fontFamily={'body'} fontSize={'xl'}>|</Text>
        <NBButton
          bg={'white'}
          _pressed={{ bg: THEME.colors.gray[500] }}
          onPress={openModal}
        >
          <Sliders color={'black'} size={25} />
        </NBButton>
      </HStack>
    </VStack>
  ), [user, ads, inputSearchData]);

  return (
    <>
      <FlatList
        data={filteredAdsData}
        renderItem={({ item }) => (
          <Item
            product_images={item.product_images}
            userAvatar={`${api.defaults.baseURL}/images/${item.user.avatar}`}
            is_new={item.is_new}
            name={item.name}
            price={item.price}
            is_active
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ alignItems: 'center' }}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <Center flex={1} mt={10}>
            <Text>Nenhum anúncio encontrado.</Text>
          </Center>
        )}
      />

      <FilterModalPure
        visible={isModalVisible}
        onClose={closeModal}
        onApply={applyFilters}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
}  