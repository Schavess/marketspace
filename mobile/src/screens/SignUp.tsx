import { useNavigation } from "@react-navigation/native";

import { TouchableOpacity } from 'react-native';

import { VStack, Text, Center, ScrollView, Image } from 'native-base';
import LogoSVG from '../assets/logo_marketspace.svg';
import ImageUserPhotoDefault from '../assets/ImageUserPhotoDefault.png';


import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function SignUp() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleBackToLogin() {
    navigation.goBack();
  }


  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <VStack bg={"gray.600"} borderRadius={20} pb={5} alignItems="center" >
        <Center my={10} w={'80%'} >
          <LogoSVG width={50} height={50} />
          <Text fontSize="xl" fontFamily="heading">Boas vindas!</Text>
          <Text color="gray.300" fontSize="sm" textAlign={'center'}>Crie sua conta e use o espaço para comprar itens variados e vender seus produtos.</Text>
        </Center>
        <Center w={'300'}>
          <TouchableOpacity>
            <Image
              source={ImageUserPhotoDefault}
              alt="User Photo"
              mb={5}
            />
          </TouchableOpacity>
          <Input
            placeholder="Nome"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Telefone"
            keyboardType="name-phone-pad"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            secureTextEntry
          />
          <Input
            placeholder="Confirmar senha"
            secureTextEntry
          />
          <Button
            title="Entrar"
            textColor='white'
            w={'full'}
          />
        </Center>
      </VStack >
      <VStack pt={10} pb={15} alignItems="center">
        <Center w={300}>
          <Text fontSize="md">Já têm uma conta?</Text>
          <Button
            title="Ir para o login"
            color='gray.500'
            mt={5}
            onPress={handleBackToLogin}
            w={'full'}
          />
        </Center>
      </VStack>
    </ScrollView>
  );
}