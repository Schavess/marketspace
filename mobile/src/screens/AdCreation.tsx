import { Center, Text, VStack, HStack, Switch } from 'native-base';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

  const navigation = useNavigation<any>();

  const [productCondition, setProductCondition] = useState('new');
  const [isSwitched, setIsSwitched] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods>(initialPaymentMethods);

  const handlePaymentMethodChange = useCallback((key: keyof PaymentMethods, value: boolean) => {
    setPaymentMethods(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  function HandleGoBack() {
    navigation.goBack();
  }

  function handlePreAdPage() {
    navigation.navigate('preadvisualization');
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack mt={'50px'} >
        <Center >
          <VStack w={'85%'}>
            <HStack >
              <TouchableOpacity onPress={HandleGoBack}>
                <ArrowLeft size={30} />
              </TouchableOpacity>
              <Center flex={1}>
                <Text fontFamily={'heading'} fontSize={'lg'}>Criar anúncio</Text>
              </Center>
            </HStack>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Imagens</Text>
            <Text
              pt={2}
              color={'gray.300'}
              fontFamily={'body'}
              fontSize={'sm'}
            >
              Escolha imagens para mostrar o quanto seu produto é incrível.
            </Text>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '100%',
              height: 150,
            }}>
              <ImagePickerComponent />
            </View>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Sobre o produto:</Text>
            <Input
              placeholder='Título do anúncio'
            />
            <Input
              placeholder='Descrição do produto'
              height={'200px'}
            />

            <HStack w={'full'}>
              <RadioCheckbox onValueChange={setProductCondition} />
            </HStack>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Venda</Text>
            <Input
              placeholder='Preço'
              keyboardType='numeric'
            />
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Aceita troca?</Text>

            <Switch
              alignSelf={'flex-start'}
              size={'lg'} onToggle={setIsSwitched}
              isChecked={isSwitched}
              onTrackColor="blue_light"
            />

            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Meios de pagamento aceitos</Text>
            <View>
              <CustomCheckbox
                label="Boleto"
                value={paymentMethods.boleto}
                onValueChange={(value) => handlePaymentMethodChange('boleto', value)}
              />
              <CustomCheckbox
                label="Pix"
                value={paymentMethods.pix}
                onValueChange={(value) => handlePaymentMethodChange('pix', value)}
              />
              <CustomCheckbox
                label="Dinheiro"
                value={paymentMethods.dinheiro}
                onValueChange={(value) => handlePaymentMethodChange('dinheiro', value)}
              />
              <CustomCheckbox
                label="Cartão de Crédito"
                value={paymentMethods.cartaoCredito}
                onValueChange={(value) => handlePaymentMethodChange('cartaoCredito', value)}
              />
              <CustomCheckbox
                label="Depósito Bancário"
                value={paymentMethods.depositoBancario}
                onValueChange={(value) => handlePaymentMethodChange('depositoBancario', value)}
              />
            </View>



          </VStack>
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
              onPress={HandleGoBack} >
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
              onPress={handlePreAdPage}>
              <Text fontFamily={'heading'} color={'white'}>Avançar</Text>
            </TouchableOpacity>
          </View>

        </Center>
      </VStack>
    </ScrollView>
  )
}