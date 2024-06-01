import { Center, Text, VStack, HStack, Switch } from 'native-base';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';

import ImagePickerComponent from '@components/ImagePicker'
import { Input } from '@components/Input'
import { RadioCheckbox } from '@components/CustomRadioCheckBox'

import { ArrowLeft } from 'phosphor-react-native';
import { useCallback, useState } from 'react';
import CustomCheckbox from '@components/CustomCheckBox';

import { THEME } from '../theme';

type PaymentMethods = {
  boleto: boolean;
  pix: boolean;
  dinheiro: boolean;
  cartaoCredito: boolean;
  depositoBancario: boolean;
};

const initialPaymentMethods: PaymentMethods = {
  boleto: true,
  pix: true,
  dinheiro: true,
  cartaoCredito: true,
  depositoBancario: true,
};

export function AdCreation() {

  const { control, handleSubmit, formState: { errors } } = useForm();

  const navigation = useNavigation<any>();

  const [isNew, setIsNew] = useState('new');
  const [accept_trade, setAccept_trade] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>(initialPaymentMethods);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handlePaymentMethodChange = useCallback((key: keyof PaymentMethods, value: boolean) => {
    setPaymentMethods(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  function HandleGoBack() {
    navigation.goBack();
  }

  function handlePreAdPage(data: any) {
    navigation.navigate('preadvisualization', { ...data, paymentMethods, accept_trade, isNew, selectedImages });
  }

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
                <Text fontFamily={'heading'} fontSize={'lg'}>Criar anúncio</Text>
              </Center>
            </HStack>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Imagens</Text>
            <Text pt={2} color={'gray.300'} fontFamily={'body'} fontSize={'sm'}>
              Escolha imagens para mostrar o quanto seu produto é incrível.
            </Text>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%',
              height: 150,
            }}>
              <ImagePickerComponent onImagesSelected={setSelectedImages} />
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
                defaultValue={isNew}
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
                  onToggle={value => {
                    onChange(value);
                    setAccept_trade(value);
                  }}
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
                      value={value}
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
              onPress={handleSubmit(handlePreAdPage)}>
              <Text fontFamily={'heading'} color={'white'}>Avançar</Text>
            </TouchableOpacity>
          </View>
        </Center>
      </VStack>
    </ScrollView>
  )
}
