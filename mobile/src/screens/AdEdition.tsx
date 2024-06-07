import React, { useCallback, useEffect, useState } from 'react';
import { Center, Text, VStack, HStack, Switch, Badge, Box } from 'native-base';
import { ScrollView, TouchableOpacity, View, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { X } from 'phosphor-react-native';

import ImagePickerComponent from '@components/ImagePicker';
import { Input } from '@components/Input';
import { RadioCheckbox } from '@components/CustomRadioCheckBox';

import { ArrowLeft } from 'phosphor-react-native';
import CustomCheckbox from '@components/CustomCheckBox';

import { THEME } from '../theme';
import { api } from '@services/api';

import { ItemData } from '../@types/interfaces';
import { CustomAlert } from '@components/CustomAlert';

type PaymentMethods = {
  boleto: boolean;
  pix: boolean;
  cash: boolean;
  card: boolean;
  deposit: boolean;
};

const initialPaymentMethods: PaymentMethods = {
  boleto: false,
  pix: false,
  cash: false,
  card: false,
  deposit: false,
};

export function AdEdition() {
  const { control, handleSubmit, formState: { errors }, setValue } = useForm();
  const [isNew, setIsNew] = useState('new');
  const [accept_trade, setAccept_trade] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [imageIdToDelete, setImageIdToDelete] = useState<string | null>(null);

  const route = useRoute<any>();
  const { item_id } = route.params;

  const navigation = useNavigation<any>();

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>(initialPaymentMethods);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [itemData, setItemData] = useState<ItemData | null>(null);
  const [imageData, setImageData] = useState<any[]>([]);

  const handlePaymentMethodChange = useCallback((key: keyof PaymentMethods, value: boolean) => {
    setPaymentMethods(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const fetchItemData = async () => {
    const response = await api.get(`/products/${item_id}`);
    const item = response.data;

    setItemData(item);
    setImageData(item.product_images);

    const updatedPaymentMethods = { ...initialPaymentMethods };
    item.payment_methods.forEach((method: { key: keyof PaymentMethods }) => {
      updatedPaymentMethods[method.key] = true;
    });
    setPaymentMethods(updatedPaymentMethods);

    // Set form values
    setValue('name', item.name);
    setValue('description', item.description);
    setValue('price', item.price.toString());
    setValue('accept_trade', item.accept_trade);
    setValue('productCondition', item.is_new);
    setValue('paymentMethods', updatedPaymentMethods);
  };

  function HandleGoBack() {
    navigation.goBack();
  }

  const handleUpdateItem = async (data: any) => {

    const formattedData = {
      name: data.name,
      description: data.description,
      is_new: data.productCondition,
      price: parseFloat(data.price),
      accept_trade: data.accept_trade,
      payment_methods: Object.keys(data.paymentMethods).filter(method => data.paymentMethods[method as keyof PaymentMethods]),
    };

    const response = await api.put(`/products/${item_id}`, formattedData);

    if (response.status === 204) {
      navigation.navigate('home');
      Alert.alert('Produto alterado com sucesso!');
    }
  };

  const handleDeleteImage = (imageId: string) => {
    setImageIdToDelete(imageId);
    setAlertVisible(true);
  };

  const handleConfirm = async () => {
    if (!imageIdToDelete) {
      console.error('No image ID to delete');
      return;
    }

    const ImageToDelete = { images: [imageIdToDelete] };

    try {
      const response = await api.delete(`/products/images`, {
        data: ImageToDelete, // Enviando dados como objeto, não string
        headers: {
          'Content-Type': 'application/json', // Defina o cabeçalho correto
        },
      });

      if (response.status === 204) {
        setAlertVisible(false);
        setImageData(imageData.filter((image: any) => image.id !== imageIdToDelete));
        setImageIdToDelete(null);
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack mt={'50px'}>
        <Center>
          <VStack w={'85%'}>
            <HStack>
              <TouchableOpacity onPress={HandleGoBack}>
                <ArrowLeft size={30} />
              </TouchableOpacity>
              <Center flex={1}>
                <Text fontFamily={'heading'} fontSize={'lg'}>Editar anúncio</Text>
              </Center>
            </HStack>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Imagens</Text>
            <Text pt={2} color={'gray.300'} fontFamily={'body'} fontSize={'sm'}>
              Edite as imagens do produto:
            </Text>
            <View style={{ alignItems: 'center', justifyContent: 'center', maxWidth: '100%', height: 'auto' }}>
              <ImagePickerComponent onImagesSelected={setSelectedImages} />
              <HStack>
                {imageData.map((imageData) => (
                  <Box key={imageData.id}>
                    <TouchableOpacity onPress={() => handleDeleteImage(imageData.id)}>
                      <Box>
                        <Image
                          source={{ uri: imageData.path ? `${api.defaults.baseURL}/images/${imageData.path}` : '' }}
                          alt={'Imagem'}
                          style={{ width: 100, height: 100, marginRight: 2 }}
                        />
                        <Badge
                          backgroundColor={'transparent'}
                          position="absolute"
                          top={0}
                          left={'60%'}
                          _text={{ fontWeight: 'bold' }}
                        >
                          <X color='white' size={25} />
                        </Badge>
                      </Box>
                    </TouchableOpacity>
                  </Box>
                ))}
              </HStack>
            </View>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Sobre o produto:</Text>

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Título do anúncio"
                  keyboardType="name-phone-pad"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              defaultValue=""
            />
            {errors.name && <Text color="red.500">Este campo é obrigatório.</Text>}

            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Descrição do produto"
                  keyboardType="name-phone-pad"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  height={'200px'}
                />
              )}
              name="description"
              defaultValue=""
            />
            {errors.description && <Text color="red.500">Este campo é obrigatório.</Text>}

            <HStack w={'full'}>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioCheckbox onValueChange={value => {
                    onChange(value);
                    setIsNew(value);
                  }} />
                )}
                name="productCondition"
                defaultValue={itemData?.is_new}
              />
            </HStack>

            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Venda</Text>
            <Controller
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder='Preço'
                  keyboardType='numeric'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="price"
              defaultValue=""
            />
            {errors.price && <Text color="red.500">Este campo é obrigatório.</Text>}

            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Aceita troca?</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  alignSelf={'flex-start'}
                  size={'lg'}
                  onToggle={onChange}
                  isChecked={value}
                  onTrackColor="blue_light"
                />
              )}
              name="accept_trade"
              defaultValue={accept_trade}
            />

            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Meios de pagamento aceitos</Text>
            <View>
              {Object.keys(initialPaymentMethods).map((method) => (
                <Controller
                  key={method}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <CustomCheckbox
                      label={method.charAt(0).toUpperCase() + method.slice(1)}
                      value={paymentMethods[method as keyof PaymentMethods]}
                      //itemData?.payment_methods.find(value)?.name
                      onValueChange={value => {
                        onChange(value);
                        handlePaymentMethodChange(method as keyof PaymentMethods, value);
                      }}
                    />
                  )}
                  name={`paymentMethods.${method}`}
                  defaultValue={paymentMethods[method as keyof PaymentMethods]}
                />
              ))}
            </View>

          </VStack>
          <View style={{
            paddingVertical: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor: 'white',
            paddingHorizontal: 20,
          }}>
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
              <Text fontFamily={'heading'}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 56,
                justifyContent: 'center',
                padding: 10,
                marginHorizontal: 5,
                backgroundColor: THEME.colors.gray[100],
                borderRadius: 10,
                alignItems: 'center',
              }}
              onPress={handleSubmit(handleUpdateItem)}>
              <Text fontFamily={'heading'} color={'white'}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </Center>
      </VStack>
      <CustomAlert
        visible={alertVisible}
        title="Deseja realmente excluir esta imagem?"
        message=""
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </ScrollView>
  );
}
