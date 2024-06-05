import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from "@react-navigation/native";

import { VStack, Heading, Text, Center, useToast } from 'native-base';
import LogoSVG from '../assets/logo_marketspace.svg';
import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import { AppError } from '@utils/AppError';

import { useAuth } from '@hooks/useAuth';
import { useState } from 'react';

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false)

  const toast = useToast();

  const { singIn } = useAuth();
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount() {
    navigation.navigate('signUp');
  }


  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await singIn(email, password);

    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
      setIsLoading(false);
    }
  }


  return (
    <>
      <VStack bg={"gray.600"} borderRadius={20} pb={10} alignItems="center" >
        <Center my={20}>
          <LogoSVG width={100} height={100} />
          <Text fontSize="xxl" fontFamily="heading" >marketspace</Text>
          <Text color="gray.300" fontSize="sm">Seu espaço de compra e venda.</Text>
        </Center>
        <Center w={'300'}>
          <Heading color="gray.400" fontSize="sm" mb={3} fontFamily="body">
            Acesse sua conta
          </Heading>
          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                onSubmitEditing={handleSubmit(handleSignIn)}
              />
            )}
          />

          <Button
            title="Entrar"
            textColor='white'
            w={'full'}
            onPress={handleSubmit(handleSignIn)}
          // isLoading={isLoading}
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