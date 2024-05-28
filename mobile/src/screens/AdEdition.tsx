import { Center, Text, VStack, HStack } from 'native-base';
import { TouchableOpacity, View } from 'react-native';
import ImagePickerComponent from '@components/ImagePicker'

import { ArrowLeft } from 'phosphor-react-native';


import { useNavigation } from '@react-navigation/native';

export function AdEdition() {

  const navigation = useNavigation<any>();

  function HandleGoBack() {
    navigation.goBack();
  }

  return (
    <>
      <VStack mt={'100px'} >
        <Center >
          <VStack>
            <HStack w={'85%'}>
              <TouchableOpacity onPress={HandleGoBack}>
                <ArrowLeft size={30} />
              </TouchableOpacity>
              <Center flex={1}>
                <Text fontFamily={'heading'} fontSize={'lg'}>Editar anúncio</Text>
              </Center>
            </HStack>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Imagens</Text>
            <Text pt={2} color={'gray.300'} fontFamily={'body'} fontSize={'sm'}>Escolha imagens para mostrar o quanto seu produto é incrível.</Text>
            <View style={{
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '90%',
              height: 150,
            }}>
              <ImagePickerComponent />
            </View>
            <Text pt={2} color={'gray.300'} fontFamily={'heading'} fontSize={'md'}>Sobre o produto:</Text>
          </VStack>

        </Center>
      </VStack>
    </>
  )
}