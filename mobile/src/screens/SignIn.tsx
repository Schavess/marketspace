import { useNavigation } from "@react-navigation/native";

import { VStack, Heading, Text, Center } from 'native-base';
import LogoSVG from '../assets/logo_marketspace.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

export function SignIn() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }


  return (
    <>
      <VStack bg={"gray.600"} borderRadius={20} pb={20} alignItems="center" >
        <Center my={20}>
          <LogoSVG width={100} height={100} />
          <Text fontSize="xxl" fontFamily="heading" >marketspace</Text>
          <Text color="gray.300" fontSize="sm">Seu espaço de compra e venda.</Text>
        </Center>
        <Center w={'300'}>
          <Heading color="gray.400" fontSize="sm" mb={3} fontFamily="body">
            Acesse sua conta
          </Heading>
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            secureTextEntry
          />
          <Button
            title="Entrar"
            textColor='white'
            w={'full'}
          />
        </Center>
      </VStack >
      <VStack pt={10} alignItems="center">
        <Center w={300}>
          <Text fontSize="md">Ainda não têm acesso?</Text>
          <Button
            title="Criar uma conta"
            color='gray.500'
            mt={5}
            onPress={handleNewAccount}
            w={'full'}
          />
        </Center>
      </VStack>
    </>
  );
}